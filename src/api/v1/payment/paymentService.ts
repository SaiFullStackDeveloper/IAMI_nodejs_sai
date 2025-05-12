import { env } from "@/common/config/env";
import { stripe } from "@/common/config/stripe";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { PaymentCreateSchema, PaymentStatusSchema } from "./paymentModel";
import { UserSessionTypes } from "@/common/types/user";
import { redis } from "@/common/config/redis";
import { SubmitIssueQuoteForm } from "./paymentRepository";
import { QuoteErrorMessage } from "@/common/types/api/quote";
import { policiesUpdateFullQuote, periodPayment } from "@/common/models/mongoDB/quote";

const { FRONTEND_DOMAIN } = env

export const PaymentCreateService = async (user: UserSessionTypes, body: z.infer<typeof PaymentCreateSchema>['body']) => {
    try {

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'aud',
                    product_data: {
                        name: 'Business Insurance',
                    },
                    unit_amount: Number(body.amount) * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            customer_email: user.email,
            return_url: `${FRONTEND_DOMAIN}/dashboard/quotation/payment?session_id={CHECKOUT_SESSION_ID}`,
        });

        return ServiceResponse.success("Successfully create payment link", { clientSecret: session.client_secret }, StatusCodes.CREATED);
    }
    catch (error) {
        const errorMessage = `PaymentCreateService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating payment link.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const PaymentStatusService = async (user: UserSessionTypes, query: z.infer<typeof PaymentStatusSchema>['query']) => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const formStatus = await redis.get(`InsuranceFormStatus:${user.email}`);
        const isPaymentCompleted = await redis.get(`InsurancePaymentCompleted:${user.email}:${query.id}`);

        if (isPaymentCompleted) {
            return ServiceResponse.failure(
                "Successfully get payment status",
                JSON.parse(isPaymentCompleted),
                StatusCodes.OK,
            );
        }

        const session = await stripe.checkout.sessions.retrieve(query.id);

        if (!isExist || !formStatus) {
            return ServiceResponse.failure(
                "An error occurred while fetching payment status.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }

        if (session.payment_status === 'unpaid') {
            return ServiceResponse.failure(
                "Payment is not completed.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }

        let currentData = JSON.parse(isExist);

        const block = currentData['block-quote'] as {
            CarrierReferenceNumber: string,
            ProposalNo: string,
            DuePremium: string,
            BusinessName: string,
        };

        const [isSubmit, error] = await SubmitIssueQuoteForm(block);


        if (error) {
            return ServiceResponse.failure(
                error,
                null,
                StatusCodes.BAD_REQUEST)
        }

        if ((isSubmit as QuoteErrorMessage).CloverErrorResponse) {
            return ServiceResponse.failure(
                "An error occurred while creating quote. Please recheck the form",
                null,
                StatusCodes.BAD_REQUEST)
        }

        currentData['quote-summary'] = isSubmit;
        await redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
            EX: 30 * 24 * 60 * 60
        });


        await policiesUpdateFullQuote(currentData['form-id'], isSubmit!);

        await redis.del(`InsuranceForm:${currentData['form-id']}:${user.email}`);
        await redis.del(`InsuranceFormStatus:${currentData['form-id']}:${user.email}`);


        await redis.del(`InsuranceFormStatus:${user.email}`);
        await redis.del(`InsuranceForm:${user.email}`);
        await redis.del(`Block-Quotes:${user.email}`);
        await redis.del("Block-Quotes:All");
        await redis.del(`Policies:${user.email}`);
        await redis.del(`Policies:All`);


        const { PolicyNo, CarrierReferenceNumber } = isSubmit as {
            PolicyNo: string,
            CarrierReferenceNumber: string,
        };


        const res = {
            payment: {
                status: session.status,
                payment_status: session.payment_status,
                customer_email: session.customer_details?.email,
                id: session.payment_intent,
                amount: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
                time: new Date()
            },
            policyNo: PolicyNo,
            refNo: CarrierReferenceNumber,
        }


        await redis.set(`InsurancePaymentCompleted:${user.email}:${query.id}`, JSON.stringify(res), {
            EX: 1 * 60 * 60
        })

        if (["Agent", "User"].includes(user.role)) {
            await redis.del(`PoliciesRecords:${user.email}`);
        } else {
            await redis.del(`PoliciesRecords`);
        }

        return ServiceResponse.success("Successfully get payment status", res, StatusCodes.CREATED);
    }
    catch (error) {
        const errorMessage = `PaymentStatusService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while fetching payment status.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export const PaymentPeriodService = async (user: UserSessionTypes, body: 'Monthly') => {
    try {

        const isExist = await redis.get(`InsuranceForm:${user.email}`);
        const formStatus = await redis.get(`InsuranceFormStatus:${user.email}`);

        if (!isExist || !formStatus) {
            return ServiceResponse.failure(
                "An error occurred while creating monthly payment.",
                null,
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }

        await redis.del(`InsuranceFormStatus:${user.email}`);
        await redis.del(`InsuranceForm:${user.email}`);

        return ServiceResponse.success("Successfully saved your request", null, StatusCodes.CREATED);
    }
    catch (error) {
        const errorMessage = `PaymentPeriodService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating monthly payment.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}