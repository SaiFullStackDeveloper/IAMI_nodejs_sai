import { redis } from "@/common/config/redis";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { CoverageSelectionFormTypes, InsuranceStatusTypes } from "@/common/types/insurance";
import { UserSessionTypes } from "@/common/types/user";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { InsuranceFormCloneModel, InsuranceFormCreateQuote, InsuranceFormDiscardModel, InsuranceFormFullQuote, InsuranceFormPostSchema, InsuranceFormStatusSchema } from "./insuranceModel";
import { ArrangeCoverages, CoveragesFormName, updateInsuranceStatus, InsuranceFormDefaultValues, InsuranceFormStatusDefault, MetaData, SubmitCreateQuoteForm, SubmitFullQuoteForm, InsuranceFormStatus } from "./insuranceRepository";
import { COVERAGESROUTES, FORMTYPES_WITH_VALUE } from "./insuranceStaticData";
import { CreateQuoteTypes, QuoteErrorMessage } from "@/common/types/api/quote";
import { createQuoteDebug, policies, policiesDelete, policiesGet, policiesUpdateBlockQuote, policiesUpdateCreateQuote, policiesUpdateFullQuote } from "@/common/models/mongoDB/quote";
import { GETQuoteToken, SubmitBlockQuote } from "@/common/api/quote";


const EX = 30 * 24 * 60 * 60

export const InsuranceStatusService = async (user: UserSessionTypes, query: z.infer<typeof InsuranceFormStatusSchema>['query']) => {
    try {

        let isStatusExist;

        isStatusExist = query.id ? await redis.get(`InsuranceFormStatus:${query.id}:${user.email}`) : await redis.get(`InsuranceFormStatus:${user.email}`);

        if (query.id && !isStatusExist) {
            const data = await policiesGet(query.id, user.email);

            if (!data) {
                return ServiceResponse.failure(
                    "No Data Found",
                    null,
                    StatusCodes.NOT_FOUND)
            }

            if (data) {
                isStatusExist = data.status;
                await redis.set(`InsuranceFormStatus:${query.id}:${user.email}`, JSON.stringify(isStatusExist), {
                    EX: EX
                })
                await redis.set(`InsuranceForm:${query.id}:${user.email}`, JSON.stringify(data.data), {
                    EX: EX
                })
            }
        }
        const status = isStatusExist ? typeof isStatusExist === 'string' ? JSON.parse(isStatusExist) as InsuranceStatusTypes[] : isStatusExist as InsuranceStatusTypes[] : InsuranceFormStatusDefault;

        const routes = (data: InsuranceStatusTypes[]): string[] => {
            return data.reduce((queries, item) => {
                if (!item.disabled || item.title === 'Premium Summary' || item.title === 'Quote Summary') {
                    queries.push(item.query);
                }
                if (item.children) {
                    queries.push(...routes(item.children));
                }
                return queries;
            }, [] as string[]);
        };

        return ServiceResponse.success("Insurance Status", {
            status,
            routes: routes(status)
        }, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceStatusService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while Fetching Insurance Form Status",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormGetService = async (user: UserSessionTypes, query: z.infer<typeof InsuranceFormPostSchema>['query']) => {
    try {


        const formType = query.FormType;

        const isExist = query.id ? await redis.get(`InsuranceForm:${query.id}:${user.email}`) : await redis.get(`InsuranceForm:${user.email}`);

        const meta = await MetaData(formType, user, query.id)

        const data = (isExist && JSON.parse(isExist)[formType]) ? JSON.parse(isExist)[formType] : InsuranceFormDefaultValues[formType];

        return ServiceResponse.success("Insurance Status", { ...data, meta }, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormGetService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while fetching Form Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormSaveService = async (user: UserSessionTypes, body: z.infer<typeof InsuranceFormPostSchema>['body'], query: z.infer<typeof InsuranceFormPostSchema>['query']) => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const formStatus = await redis.get(`InsuranceFormStatus:${user.email}`);

        const formType = query.FormType;
        const data = body;
        let currentData = isExist ? JSON.parse(isExist) : {};
        let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault)



        if (!isExist && formType !== 'coverage-selection') {
            return ServiceResponse.failure(
                "Complete the coverage selection form first",
                null,
                StatusCodes.BAD_REQUEST)
        }

        if (formType === 'coverage-selection') {
            const coverage = (data as CoverageSelectionFormTypes).Coverages;
            const statusUpdate = InsuranceFormStatus(ArrangeCoverages(coverage))
            status[1].children = statusUpdate
            if (currentData) {
                const allFields = coverage.map((item) => {
                    return COVERAGESROUTES[item]
                })


                if (currentData['premium-summary'] || status[2]) {
                    status[2].disabled = true;
                    status[2].status = 'pending';
                    delete currentData['premium-summary']
                }

                if (currentData['quote-summary'] || status[3]) {
                    status[3].disabled = true;
                    status[3].status = 'pending';
                    delete currentData['quote-summary']
                }

                Object.keys(currentData).forEach((key) => {

                    if (key === 'property-details' && !allFields.includes('business-and-contents')) {
                        delete currentData['property-details'];
                    }

                    if (!allFields.includes(key) && key !== 'coverage-selection' && key !== 'property-details' && key !== 'form-id') {
                        delete currentData[key];
                    } else {
                        updateInsuranceStatus(status, key, 'completed')
                    }
                });
            }
        }


        if (Object.values(COVERAGESROUTES).includes(formType)) {
            if (currentData['further-and-endorsements-questions']) {
                status[1].children = status[1].children.map((item: { query: string; status: string; disabled: boolean; }) => {
                    if (item.query === 'further-and-endorsements-questions') {
                        item.status = 'pending';
                    }
                    return item;
                })
                delete currentData['further-and-endorsements-questions']
            }
            if (currentData['premium-summary']) {
                status[2].disabled = true;
                status[2].status = 'pending';

                delete currentData['premium-summary']
            }
            if (currentData['quote-summary']) {
                status[3].disabled = true;
                status[3].status = 'pending';
                delete currentData['quote-summary']
            }
        }
        const value = structuredClone(updateInsuranceStatus(status, formType, 'completed'))
        await redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
            EX: EX
        });

        currentData[formType] = data;
        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: EX
        });

        return ServiceResponse.success(`${CoveragesFormName[formType]} Saved Successfully`, null, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormSaveService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while adding ${CoveragesFormName[query.FormType]} Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormResetService = async (user: UserSessionTypes) => {
    try {

        await redis.del(`InsuranceForm:${user.email}`);
        await redis.del(`InsuranceFormStatus:${user.email}`);

        return ServiceResponse.success("Insurance Form Reset Successfully", null, StatusCodes.OK);

    } catch (error) {
        const errorMessage = `InsuranceFormSave: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while reseting the form Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormCreateQuoteService = async (user: UserSessionTypes, body: z.infer<typeof InsuranceFormCreateQuote>['body'], query: z.infer<typeof InsuranceFormCreateQuote>['query']) => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const formStatus = await redis.get(`InsuranceFormStatus:${user.email}`);

        const formType = query.FormType;
        const data = body;
        let currentData = isExist ? JSON.parse(isExist) : {};
        let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault)


        if (!isExist) {
            return ServiceResponse.failure(
                "Complete the coverage selection form first",
                null,
                StatusCodes.BAD_REQUEST)
        }

        currentData[formType] = data;
        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: EX
        });


        const [isSubmit, error] = await SubmitCreateQuoteForm(currentData, user)

        if (error) {
            return ServiceResponse.failure(
                error,
                null,
                StatusCodes.BAD_REQUEST)
        }

        if ((isSubmit as QuoteErrorMessage).CloverErrorResponse) {
            return ServiceResponse.failure(
                (isSubmit as QuoteErrorMessage).ErrorMessage || "An error occurred while creating quote. Please recheck the form",
                { issue: (isSubmit as QuoteErrorMessage).CloverErrorResponse.reasons || [] },
                StatusCodes.BAD_REQUEST)
        }

        await createQuoteDebug({
            meta: {
                email: user.email,
                createdAt: new Date(),
                role: user.role,
            }, ...isSubmit as Object
        })

        currentData['create-quote'] = isSubmit;
        delete currentData['premium-summary']
        delete currentData['block-quote']


        let value = structuredClone(updateInsuranceStatus(status, formType, 'completed'))
        value[2].status = 'pending';
        value[2].disabled = false;
        value[3].disabled = true;
        await redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
            EX: EX
        });

        if (currentData['form-id']) {
            await policiesUpdateCreateQuote(currentData['form-id'], {
                data: currentData,
                status: value
            })
        } else {
            const id = await policies({
                meta: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    createdAt: new Date(),
                },
                data: currentData,
                status: value
            });
            currentData['form-id'] = id;
        }

        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: EX
        });

        await redis.del(`Quotes:${user.email}`)
        await redis.del("Quotes:All")

        return ServiceResponse.success(`Further And Endorsements Questions Saved Successfully`, null, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormCreateQuoteService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while adding Further And Endorsements Questions Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormBlockQuoteService = async (user: UserSessionTypes, body: z.infer<typeof InsuranceFormFullQuote>['body'], query: z.infer<typeof InsuranceFormFullQuote>['query']) => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const formStatus = await redis.get(`InsuranceFormStatus:${user.email}`);

        const formType = query.FormType;
        const data = body;
        let currentData = isExist ? JSON.parse(isExist) : {};
        let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault)


        if (!isExist) {
            return ServiceResponse.failure(
                "Complete the coverage selection form first",
                null,
                StatusCodes.BAD_REQUEST)
        }

        currentData[formType] = data;
        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: EX
        });

        const [access] = await GETQuoteToken()
        const [isSubmit, error] = await SubmitBlockQuote(access?.access_token!, currentData['create-quote'].ProposalNo)

        console.log('block', isSubmit, error)

        if (error) {
            return ServiceResponse.failure(
                error,
                null,
                StatusCodes.BAD_REQUEST)
        }

        if ((isSubmit as QuoteErrorMessage).CloverErrorResponse) {
            return ServiceResponse.failure(
                (isSubmit as QuoteErrorMessage).ErrorMessage || "An error occurred while creating quote. Please recheck the form",
                { issue: (isSubmit as QuoteErrorMessage).CloverErrorResponse.reasons || [] },
                StatusCodes.BAD_REQUEST)
        }




        currentData['block-quote'] = isSubmit;
        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: EX
        });



        let value = structuredClone(updateInsuranceStatus(status, formType, 'completed'))
        value[3].disabled = false;
        value[2].disabled = true;
        await redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
            EX: EX
        });

        value[2].disabled = false
        await policiesUpdateBlockQuote(currentData['form-id'], currentData['premium-summary'], isSubmit!, value)

        await redis.del(`InsuranceForm:${currentData['form-id']}:${user.email}`);
        await redis.del(`InsuranceFormStatus:${currentData['form-id']}:${user.email}`);
        await redis.del(`Quotes:${user.email}`)
        await redis.del(`Quotes:All`)
        await redis.del(`Block-Quotes:${user.email}`);
        await redis.del("Block-Quotes:All")

        return ServiceResponse.success(`Premium Summary Saved Successfully`, null, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormBlockQuoteService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while fetching Block Quote Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const InsuranceFormFullQuoteService = async (user: UserSessionTypes, body: z.infer<typeof InsuranceFormFullQuote>['body']) => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const data = body;
        let currentData = isExist ? JSON.parse(isExist) : {};

        if (!isExist) {
            return ServiceResponse.failure(
                "Complete the coverage selection form first",
                null,
                StatusCodes.BAD_REQUEST)
        }

        const [isSubmit, error] = await SubmitFullQuoteForm(data, currentData['create-quote'])
        console.log('isSubmit', isSubmit, error)
        if (error) {
            return ServiceResponse.failure(
                error,
                null,
                StatusCodes.BAD_REQUEST)
        }

        if ((isSubmit as QuoteErrorMessage).CloverErrorResponse) {
            return ServiceResponse.failure(
                (isSubmit as QuoteErrorMessage).ErrorMessage || "An error occurred while creating quote. Please recheck the form",
                { issue: (isSubmit as QuoteErrorMessage).CloverErrorResponse.reasons || [] },
                StatusCodes.BAD_REQUEST)
        }


        const quote = isSubmit as CreateQuoteTypes
        const { Coverages } = currentData['coverage-selection'];

        let result = {}
        if (!quote) {
            result = {}
        }

        result = {
            AgentFee: quote.AgentFees,
            AgentFeeGST: quote.GSTAgentFee,
            BrokerFee: quote.BrokerFee,
            BrokerFeeGST: quote.GSTBrokerFee,
            isFullQuote: true,

            BrokerCommission: quote.BrokerCommission,
            GSTBrokerCommission: quote.GSTBrokerCommission,

            isLiability: ["Business Liability",
                "Business Interruption",
                "Portable Business Content"].some(item => (Coverages as string[]).includes(item)),
            isProperty: ["Business Building and Contents",
                "Equipment Breakdown",
                "Theft, Money and Glass"].some(item => (Coverages as string[]).includes(item)),
            DuePremium: quote.DuePremium,
            quote: [...quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.map((item) => {
                return {
                    title: FORMTYPES_WITH_VALUE[item.ProductElementCode as keyof typeof FORMTYPES_WITH_VALUE],
                    premium: item.StandardNetPremium,
                    gst: item.GST,
                    emergencyServiceLevy: item.EmergencyServiceLevy,
                    stampDuty: item.StampDuty,
                }
            }),
            {
                title: 'Subtotal',
                premium: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StandardNetPremium, 0),
                gst: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.GST, 0),
                emergencyServiceLevy: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.EmergencyServiceLevy, 0),
                stampDuty: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StampDuty, 0),
            }
            ]
        }

        return ServiceResponse.success(`Full Quote Generated Successfully`, result, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormFullQuoteService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while fetching Full Quote Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}


export const InsuranceFormClone = async (user: UserSessionTypes, query: z.infer<typeof InsuranceFormCloneModel>['query']) => {
    try {

        const id = query.id;

        const data = await policiesGet(id, user.email);

        if (!data) {
            return ServiceResponse.failure(
                "No Data Found",
                null,
                StatusCodes.NOT_FOUND)
        }

        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(data.data), {
            EX: EX
        });

        await redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(data.status), {
            EX: EX
        });

        return ServiceResponse.success("Insurance Form Cloned Successfully", null, StatusCodes.CREATED);
    }
    catch (error) {
        const errorMessage = `InsuranceFormClone: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while fetching Form Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}


export const InsuranceFormDiscard = async (user: UserSessionTypes, query: z.infer<typeof InsuranceFormDiscardModel>['query']) => {
    try {

        const id = query.id;

        await policiesDelete(id, user.email);
        await redis.del(`Quotes:${user.email}`)
        await redis.del(`Quotes:All`)
        await redis.del(`InsuranceForm:${id}:${user.email}`);
        await redis.del(`InsuranceFormStatus:${id}:${user.email}`);

        return ServiceResponse.success("Insurance Form Discard Successfully", null, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `InsuranceFormClone: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            `An error occurred while fetching Form Data`,
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}