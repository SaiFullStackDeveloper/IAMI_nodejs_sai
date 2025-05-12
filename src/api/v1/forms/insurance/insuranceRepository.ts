import { ClaimTypes, CoverageTypes, InsuranceFormCreateQuoteDataTypes, InsuranceStatusTypes } from "@/common/types/insurance"
import { CATEGORY_OPTIONS, CLAIM_TYPES, FIVE_YEAR_LIABILITY, FLOOR, FLOOR_CONSTRUCTION, FORMTYPES, FORMTYPES_WITH_VALUE, INDEMNITY_PERIOD, LOCATION_TYPE_WITH_VALUE, PREMIUM_QUESTION, ROOF_CONSTRUCTION, THEFT_SECURITY, TYPE_OF_BUSINESS_WITH_VALUE, TYPE_OF_GLASS, TYPE_OF_PLATE, WALL_CONSTRUCTION } from './insuranceStaticData'
import { UserSessionTypes } from "@/common/types/user";
import { redis } from "@/common/config/redis";
import { GetAddressDetails, GetChainHatToken } from "@/common/api/chainhat";
import { GETQuoteToken, SubmitBlockQuote, SubmitCreateQuote, SubmitFullQuote } from "@/common/api/quote";
import { createQuoteDebug, createQuoteResponseDebugModelQuote } from "@/common/models/mongoDB/quote";
import { BlockQuoteTypes, CreateQuoteTypes, QuoteErrorMessage } from "@/common/types/api/quote";
import { convertDateFormat } from "@/common/utils/date";
// import { writeFile } from 'fs/promises'

export const MetaData = async (type: typeof FORMTYPES[number], user: UserSessionTypes, id?: string) => {

    const isExist = id ? await redis.get(`InsuranceForm:${id}:${user.email}`) : await redis.get(`InsuranceForm:${user.email}`)

    if (!isExist) {
        return {}
    }

    const data = JSON.parse(isExist) as typeof InsuranceFormDefaultValues
    const { streetAddress, BusinessDescription, AnnualTurnover, NumberOfEmployees, EffectiveDate, Coverages, ANZSICCode } = data['coverage-selection']

    if (type === 'property-details') {
        return {
            address: streetAddress,
            occupation: BusinessDescription
        }
    }

    if (type === 'business-liability-coverage') {
        return {
            turnover: AnnualTurnover,
            employees: NumberOfEmployees
        }
    }

    if (type === 'business-interruption-coverage') {
        return {
            turnover: AnnualTurnover,
        }
    }

    if (type === 'further-and-endorsements-questions') {

        const coverage = Coverages as CoverageTypes

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const effectiveDate = new Date(EffectiveDate);
        effectiveDate.setHours(0, 0, 0, 0);

        return {
            effectiveDate: currentDate > effectiveDate,
            BusinessAndContents: coverage.includes('Business Building and Contents'),
            TheftMoneyAndGlass: coverage.includes('Theft, Money and Glass'),
            BusinessLiabilityCoverage: coverage.includes('Business Liability'),
            ANZSICCode: Number(ANZSICCode)
        }
    }

    if (type === 'premium-summary') {

        const quote = data['create-quote'] as unknown as CreateQuoteTypes
        const fullQuote = JSON.parse(isExist)['block-quote'] as unknown as CreateQuoteTypes || {}

        if (!quote) {
            return {}
        }

        return {
            AgentFee: quote.AgentFees,
            AgentFeeGST: quote.GSTAgentFee,
            BrokerFee: fullQuote.BrokerFee ? fullQuote.BrokerFee : quote.BrokerFee,
            BrokerFeeGST: fullQuote.GSTBrokerFee ? fullQuote.GSTBrokerFee : quote.GSTBrokerFee,
            BrokerCommission: fullQuote.BrokerCommission ? fullQuote.BrokerCommission : quote.BrokerCommission,
            GSTBrokerCommission: fullQuote.GSTBrokerCommission ? fullQuote.GSTBrokerCommission : quote.GSTBrokerCommission,
            isFullQuote: false,
            isLiability: ["Business Liability",
                "Business Interruption",
                "Portable Business Content"].some(item => (Coverages as string[]).includes(item)),
            isProperty: ["Business Building and Contents",
                "Equipment Breakdown",
                "Theft, Money and Glass"].some(item => (Coverages as string[]).includes(item)),
            DuePremium: fullQuote.DuePremium ? fullQuote.DuePremium : quote.DuePremium,

            BrokerFees: user.role === 'User' ? "10" : "0",
            Liability: user.role === 'User' ? "20" : "20",
            Property: user.role === 'User' ? "20" : "20",

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
    }

    if (type === 'quote-summary') {
        const blockQuote = JSON.parse(isExist)['block-quote'] as BlockQuoteTypes

        if (!blockQuote) {
            return {}
        }

        return {
            Address: blockQuote.PolicyLobList[0].PolicyRiskList[0].FullAddress,
            status: blockQuote.CarrierPolicyStatus,
            effectiveDate: blockQuote.EffectiveDate,
            expiryDate: blockQuote.ExpiryDate,
            AgentFee: blockQuote.AgentFees,
            AgentFeeGST: blockQuote.GSTAgentFee,
            BrokerFee: blockQuote.BrokerFee,
            BrokerFeeGST: blockQuote.GSTBrokerFee,
            InsuredName: blockQuote.BusinessName,
            TransitionType: blockQuote.IsRenewable === 'Y' ? 'Renewal' : 'New Business',
            quoteNo: blockQuote.CarrierQuoteNumber,

            BrokerCommission: blockQuote.BrokerCommission,
            GSTBrokerCommission: blockQuote.GSTBrokerCommission,

            ProposalNo: blockQuote.ProposalNo,

            DuePremium: blockQuote.DuePremium,
            quote: [...blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.map((item) => {
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
                premium: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StandardNetPremium, 0),
                gst: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.GST, 0),
                emergencyServiceLevy: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.EmergencyServiceLevy, 0),
                stampDuty: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StampDuty, 0),
            }
            ]
        }
    }

    return {}

}

const GetOptions = (field: keyof typeof PREMIUM_QUESTION) => {
    return PREMIUM_QUESTION[field].map((q) => ({
        id: q.id,
        question: q.question,
    }));
};


export const InsuranceFormStatusDefault: InsuranceStatusTypes[] = [
    {
        title: "Coverage Selection",
        status: "in-progress",
        query: "coverage-selection",
        disabled: false,
    },
    {
        title: "Business Details",
        status: "pending",
        query: "business-details",
        disabled: true,
    },
    {
        title: "Premium Summary",
        status: "pending",
        query: "premium-summary",
        disabled: true,
    },
    {
        title: "Quote Summary",
        status: "pending",
        query: "quote-summary",
        disabled: true,
    },
];

const DATE = new Date(new Date().setHours(0, 0, 0, 0))
const CoverageSelectionDefault = {
    ABN: "",
    EffectiveDate: DATE,
    ExpiryDate: new Date(DATE).setFullYear(DATE.getFullYear() + 1),
    BusinessName: "",
    BusinessDescription: "",
    ANZSICCode: "",
    streetAddress: "",
    AnnualTurnover: "",
    NumberOfEmployees: "",
    YearStarted: "",
    LocationType: "",
    TypeOfBusiness: "Business Operations Only",
    Coverages: [],
}

const PropertyDetailsDefault = {
    YearBuilt: "",
    EPS: "",
    NumberOfStories: "",
    HeritageListing: "no",
    InterestedParty: "",
}

const BusinessAndContentsDefault = {
    BuildingLimitAndExcess_Insured: "",
    BuildingLimitAndExcess_Excess: "250",
    ContentsLimitAndExcess_Insured: "",
    ContentsLimitAndExcess_Excess: "1000",
    StockLimitAndExcess_Insured: "",
    StockLimitAndExcess_Excess: "1000",
}

const EquipmentBreakdownDefault = {
    DeteriorationOfStock: "",
    NumberOfMachines: "",
    IncreasedCostOfWorking: "",
    OtherElectronicEquipment: "",
    Computers: "",
    PortableElectronicEquipment: "",
}

const BusinessLiabilityCoverageDefault = {
    LimitsOfLiability: "20000000",
    AnnualWages: "",
    Property: "",
    InterestedParty: "",
    Contractor: "",
    TaxAudit : "0",
    Excess : "500"
}

const PortableBusinessContentsCoverageDefault = {
    BlanketCoverContent: "",
    BlanketCoverStock: "",
    PortableSpecifiedItems: [{
        description: ''
    }],
}

export const InsuranceFormDefaultValues = {
    'coverage-selection': CoverageSelectionDefault,
    'property-details': PropertyDetailsDefault,
    'business-and-contents': BusinessAndContentsDefault,
    'equipment-breakdown': EquipmentBreakdownDefault,
    'theft-money-and-glass': {},
    'business-liability-coverage': BusinessLiabilityCoverageDefault,
    'business-interruption-coverage': {
        AnnualGrossProfit: "",
    },
    'portable-business-contents-coverage': PortableBusinessContentsCoverageDefault,
    'further-and-endorsements-questions': {
        DisclaimerAgreedTag: false,
    },
    'premium-summary': {
        DeclarationQuestions: GetOptions("Declaration Questions"),
        Exemption: GetOptions("Exemption"),
        // BrokerFees: "0",
        // Liability: "20",
        // Property: "20",
    },
    'quote-summary': {},
    'create-quote': ""
}

export const Coverages = {
    "Business Building and Contents": "Business and Contents",
    "Equipment Breakdown": "Equipment Breakdown",
    "Theft, Money and Glass": "Theft, Money and Glass",
    "Business Liability": "Business Liability Coverage",
    "Business Interruption": "Business Interruption Coverage",
    "Portable Business Content": "Portable Business Contents Coverage",
}

export const CoveragesFormName = {
    'coverage-selection': 'Coverage Selection',
    'property-details': 'Property Details',
    'business-and-contents': 'Business Building and Contents',
    'equipment-breakdown': 'Equipment Breakdown',
    'theft-money-and-glass': 'Theft, Money and Glass',
    'business-liability-coverage': 'Business Liability',
    'business-interruption-coverage': 'Business Interruption',
    'portable-business-contents-coverage': 'Portable Business Contents Coverage',
    'further-and-endorsements-questions': 'Further and Endorsements Questions',
    'premium-summary': 'Premium Summary',
    'quote-summary': 'Quote Summary',
}

export const ArrangeCoverages = (coverages: string[]) => {
    const desiredOrder = [
        "Business Building and Contents",
        "Equipment Breakdown",
        "Theft, Money and Glass",
        "Business Liability",
        "Business Interruption",
        "Portable Business Content",
    ];

    return desiredOrder.filter((coverage) => coverages.includes(coverage)) as CoverageTypes;
};

export const InsuranceFormStatus = (coverages: CoverageTypes) => {
    const status: InsuranceStatusTypes[] = [
        {
            title: "Property Covers",
            status: "pending",
            query: "property-covers",
            disabled: true,
            children: []
        },
        {
            title: "Policy Covers",
            status: "pending",
            query: "policy-covers",
            disabled: true,
            children: []
        }
    ]


    const propertyCovers = ['Business Building and Contents', 'Equipment Breakdown', 'Theft, Money and Glass']
    const policyCovers = ['Business Liability', 'Business Interruption', 'Portable Business Content']



    coverages.forEach((value) => {

        const title = Coverages[value]


        if ((value === 'Business Building and Contents' || (value === 'Equipment Breakdown' && policyCovers.includes('Business Liability')) || (value === 'Theft, Money and Glass' && policyCovers.includes('Business Liability')))) {
            status[0].children?.push(
                {
                    title: "Property Details",
                    status: "pending",
                    query: "property-details",
                    disabled: false,
                }
            )
        }

        if (propertyCovers.includes(value)) {

            status[0].children?.push({
                title: title,
                status: "pending",
                query: title.toLowerCase().replace(/[\s,]+/g, '-'),
                disabled: false
            })
        }


        if (policyCovers.includes(value)) {
            status[1].children?.push({
                title: title,
                status: "pending",
                query: title.toLowerCase().replace(/[\s,]+/g, '-'),
                disabled: false
            })
        }
    })





    const filteredStatus = status.filter(item => item.children && item.children.length > 0)

    // Remove duplicates based on the title property
    const uniqueFilteredStatus = filteredStatus.map(item => {
        item.children = item.children?.filter((child, index, self) =>
            index === self.findIndex((t) => (
                t.title === child.title
            ))
        )
        return item
    })


    return [
        ...uniqueFilteredStatus,
        {
            title: "Further And Endorsements Questions",
            status: "pending",
            query: "further-and-endorsements-questions",
            disabled: false,
            children: []
        }
    ] as InsuranceStatusTypes[]

}


export const updateInsuranceStatus = (items: InsuranceStatusTypes[], query: string, status: InsuranceStatusTypes['status']): InsuranceStatusTypes[] => {
    let value = items

    for (const item of items) {
        if (item.query === query) {
            item.status = status
        }
        if (item.children) {
            updateInsuranceStatus(item.children, query, status);

            // Check if all children are complete
            if (item.children.length > 0) {
                const allChildrenComplete = item.children.every(child => child.status === "completed");
                if (allChildrenComplete) {
                    item.status = "completed";
                }
            }

        }
    }

    return value;
};

const GiveN_OR_Y = (value: 'no' | 'yes') => {
    return value === 'no' ? "N" : "Y"
}


export const SubmitCreateQuoteForm = async (data: InsuranceFormCreateQuoteDataTypes, user: UserSessionTypes) => {
    try {

        const [token, issue] = await GetChainHatToken()


        if (!token && issue) {
            throw new Error(issue)
        }


        const {
            streetAddress,
            EffectiveDate,
            ExpiryDate,
            ABN,
            AnnualTurnover,
            BusinessName,
            NumberOfEmployees,
            ANZSICCode,
            BusinessDescription,
            YearStarted,
            TypeOfBusiness,
            LocationType,
            Coverages,
            isManual,
            ...remaining
        } = data['coverage-selection']

        const PROPERTY_DETAILS = data['property-details']
        const BUSINESS_AND_CONTENTS = data['business-and-contents']
        const EQUIPMENT_BREAKDOWN = data['equipment-breakdown']
        const { DisclaimerAgreedTag, ...FURTHER_QUESTIONS_AND_ENDORSEMENTS } = data['further-and-endorsements-questions']
        const THEFT_MONEY_AND_GLASS = data['theft-money-and-glass']
        const BUSINESS_LIABILITY_COVERAGE = data['business-liability-coverage']
        const BUSINESS_INTERRUPTION_COVERAGE = data['business-interruption-coverage']
        const { PortableSpecifiedItems, ...PORTABLE_BUSINESS_CONTENTS_COVERAGE } = data['portable-business-contents-coverage'] || {
            PortableSpecifiedItems: []
        }

        const [address, error] = await GetAddressDetails(token?.access_token!, streetAddress)


        if (!address && error) {
            throw new Error(error)
        }

        const ALL_QUESTIONS = [
            ...(FURTHER_QUESTIONS_AND_ENDORSEMENTS['BusinessAndContents'] || []),
            ...(FURTHER_QUESTIONS_AND_ENDORSEMENTS['BusinessLiabilityCoverage'] || []),
            ...(FURTHER_QUESTIONS_AND_ENDORSEMENTS['TheftMoneyAndGlass'] || [])
        ]



        const ALL_QUESTIONS_WITH_CLAIMS = [
            ...(ALL_QUESTIONS || []),
            ...(BUSINESS_AND_CONTENTS ? [{
                id: 43,
                question: "Claims In Last Five Years?",
                answer: BUSINESS_AND_CONTENTS.BuildingAndContentClaimHistory
            }] : []),
            ...(EQUIPMENT_BREAKDOWN ? [{
                id: 45,
                question: "Claims In Last Five Years?",
                answer: EQUIPMENT_BREAKDOWN.EquipmentBreakdownClaimHistory
            }] : []),
            ...(THEFT_MONEY_AND_GLASS ? [{
                id: 44,
                question: "Claims In Last Five Years?",
                answer: THEFT_MONEY_AND_GLASS.TheftMoneyAndGlassClaimHistory
            }] : []),
            ...(BUSINESS_LIABILITY_COVERAGE ? [{
                id: 40,
                question: "Claims In Last Five Years?",
                answer: BUSINESS_LIABILITY_COVERAGE.BuildingLiabilityClaimHistory
            }] : []),
            ...(PORTABLE_BUSINESS_CONTENTS_COVERAGE && PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory ? [{
                id: 42,
                question: "Claims In Last Five Years?",
                answer: PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory
            }] : []),
        ]

        const findQuestionDetailsWithClaims = (id: number) => {
            return ALL_QUESTIONS_WITH_CLAIMS.find(item => item.id === id)?.answer || 'no'
        }



        const ALLFORMQUESTIONS = ALL_QUESTIONS_WITH_CLAIMS.map((i) => {
            return {
                "ProductElementCode": "OCCUPATIONCLAUSEQA",
                "QuestionId": String(i.id),
                "AnswerCode": GiveN_OR_Y(findQuestionDetailsWithClaims(i.id))
            }
        })


        const ClaimList = (value: ClaimTypes[], code: string, type: "LI" | "ALL" = 'ALL') => {
            return value.map((item) => {
                return {
                    "ProductElementCode": "CLAIMS",
                    "ProductCoverageId": code,
                    "ClaimType": type === 'ALL' ? CLAIM_TYPES[item.ClaimType as keyof typeof CLAIM_TYPES] : FIVE_YEAR_LIABILITY[item.ClaimType as keyof typeof FIVE_YEAR_LIABILITY],
                    "ClaimType_Name": item.ClaimType,
                    "DateOfLoss": item.YearOfLoss,
                    "LossAmount": item.Value
                }
            })
        }

        const currentYear = new Date().getFullYear();

        const findQuestionDetails = (id: number) => {
            return ALL_QUESTIONS.find(item => item.id === id)?.answer || 'no'
        }

        const isQuestionExist = (id: number) => {
            return ALL_QUESTIONS.find(item => item.id === id)
        }


        let BUSINESS_AND_CONTENTS_VALUES
        let EQUIPMENT_BREAKDOWN_VALUES
        let THEFT_MONEY_AND_GLASS_VALUES
        let BUSINESS_LIABILITY_COVERAGE_VALUES
        let BUSINESS_INTERRUPTION_COVERAGE_VALUES
        let PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES
        let PROPERTY_DETAILS_VALUES;

        const findElementValue = (field: string) => {
            return address ? address.providerResponse.Elements.find(item => item.Field === field)?.Value || '' : ''
        }

        const ADDRESS = {
            "IsPrimaryAddress": "false",
            "AddressTypeCode": "mailing",
            // "IsManualAddress": String(isManual) || "false", // TODO : Need to check
            "IsManualAddress": "false",
            "AddressLine1": address?.addressInfo[0].addressLine1,
            "AddressLine2": address?.addressInfo[0].addressLine2,
            "City": address?.addressInfo[0].city,
            "PostalCode": address?.addressInfo[0].postalCode,
            "CountryCode": address?.addressInfo[0].countryCode,
            "Territory": `AU-${address?.addressInfo[0].province}`,
            "Latitude": address?.addressInfo[0].latitude,
            "Longitude": address?.addressInfo[0].longitude,
            "GnafPID": address?.providerResponse.GNAF_PID,
            "FullAddress": address?.addressInfo[0].freeFormAddress,
            "StateOrProvinceCode": address?.addressInfo[0].province,
        }

        if (PROPERTY_DETAILS) {
            PROPERTY_DETAILS_VALUES = {
                "RoofMaterial": "",
                "YearBuilt": `${PROPERTY_DETAILS.YearBuilt}-01-01`,
                "FloorConstruction": FLOOR_CONSTRUCTION[PROPERTY_DETAILS.FloorConstruction as keyof typeof FLOOR_CONSTRUCTION],
                "RoofConstruction": ROOF_CONSTRUCTION[PROPERTY_DETAILS.RoofConstruction as keyof typeof ROOF_CONSTRUCTION],
                "WallConstruction": WALL_CONSTRUCTION[PROPERTY_DETAILS.WallContruction as keyof typeof WALL_CONSTRUCTION],
                "SandwichPanelorEPS": PROPERTY_DETAILS.EPS,
                "NumberOfStoriesInTheBuilding": PROPERTY_DETAILS.NumberOfStories,
                "AreAnyOfTheBuildingsHeritageListed": PROPERTY_DETAILS.HeritageListing,
                "LocatedFloor": FLOOR[PROPERTY_DETAILS.LowestFloorYouOccupy as keyof typeof FLOOR],
                "RiskInterestedParty": PROPERTY_DETAILS.InterestedParty,
                "FloorConstruction_Name": PROPERTY_DETAILS.FloorConstruction,
                "WallConstruction_Name": PROPERTY_DETAILS.WallContruction,
                "LowestFloorYouOccupy_Name": PROPERTY_DETAILS.LowestFloorYouOccupy,
                "RoofConstruction_Name": PROPERTY_DETAILS.RoofConstruction,
            }
        }

        if (BUSINESS_AND_CONTENTS) {
            BUSINESS_AND_CONTENTS_VALUES = {
                "ProductElementCode": "C0001788",
                "LineOfBusinessCode": "PRP",
                // // Need To Replace
                // "BNCFurtherQuestion1": "",
                // "BNCFurtherQuestion2": "",
                // "BNCFurtherQuestion3": "",
                // "BNCFurtherQuestion4": "",
                // 
                ...(isQuestionExist(27) && { "CommercialCookingClauseQuestion": GiveN_OR_Y(findQuestionDetails(27)) }),
                ...(isQuestionExist(26) && { "FloodCoverQuestion": GiveN_OR_Y(findQuestionDetails(26)) }),
                "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_AND_CONTENTS.BuildingAndContentClaimHistory),
                PolicyBenefitList: [
                    {
                        "ProductElementCode": "B00868",
                        "SumInsured": BUSINESS_AND_CONTENTS.BuildingLimitAndExcess_Insured,
                        "Excess": BUSINESS_AND_CONTENTS.BuildingLimitAndExcess_Excess
                    },
                    {
                        "ProductElementCode": "B00869",
                        "SumInsured": BUSINESS_AND_CONTENTS.ContentsLimitAndExcess_Insured,
                        "Excess": BUSINESS_AND_CONTENTS.ContentsLimitAndExcess_Excess
                    },
                    {
                        "ProductElementCode": "B00870",
                        "SumInsured": BUSINESS_AND_CONTENTS.StockLimitAndExcess_Insured,
                        "Excess": BUSINESS_AND_CONTENTS.StockLimitAndExcess_Excess
                    }
                ]
            }
        }

        if (EQUIPMENT_BREAKDOWN) {
            EQUIPMENT_BREAKDOWN_VALUES = {
                "ProductElementCode": "C0001790",
                "LineOfBusinessCode": "PRP",
                "ClaimsInLastFiveYears": GiveN_OR_Y(EQUIPMENT_BREAKDOWN.EquipmentBreakdownClaimHistory),
                "PolicyBenefitList": [
                    {
                        "ProductElementCode": "B00874",
                        "BlanketCover": EQUIPMENT_BREAKDOWN.BlanketCover,
                        "Excess": EQUIPMENT_BREAKDOWN.MachineryBreakdownExcess,
                        "DeteriorationOfStock": EQUIPMENT_BREAKDOWN.DeteriorationOfStock,
                        "ICOWIncreasedCostofWorking": EQUIPMENT_BREAKDOWN.IncreasedCostOfWorking,
                        "NumberofMachines": EQUIPMENT_BREAKDOWN.NumberOfMachines
                    },
                    {
                        "ProductElementCode": "B00875",
                        "Excess": EQUIPMENT_BREAKDOWN.ElectronicEquipmentExcess,
                        "ComputerLimit": EQUIPMENT_BREAKDOWN.Computers,
                        "PortableElectronicEquipment": EQUIPMENT_BREAKDOWN.PortableElectronicEquipment,
                        "OtherElectronicEquipment": EQUIPMENT_BREAKDOWN.OtherElectronicEquipment
                    }
                ]
            }
        }

        if (THEFT_MONEY_AND_GLASS) {
            THEFT_MONEY_AND_GLASS_VALUES = {
                "ProductElementCode": "C0001789",
                "LineOfBusinessCode": "PRP",
                // Need To Replace
                // "TMGFurtherQuestion1": "",
                // 
                "ClaimsInLastFiveYears": GiveN_OR_Y(THEFT_MONEY_AND_GLASS.TheftMoneyAndGlassClaimHistory),
                "PolicyBenefitList": [
                    {
                        "ProductElementCode": "B00871",
                        "TheftExcludingTobacco": THEFT_MONEY_AND_GLASS.Theft?.TheftTobaccoExcluding,
                        "TheftTobacco": THEFT_MONEY_AND_GLASS.Theft?.TheftTobacco,
                        "Excess": THEFT_MONEY_AND_GLASS.Theft?.TheftExcess,
                        "SecurityAlarm": THEFT_SECURITY[THEFT_MONEY_AND_GLASS.Theft?.TheftSecurity as keyof typeof THEFT_SECURITY],
                        "DeadlocksonallExternalDoors": String(THEFT_MONEY_AND_GLASS.Theft?.TheftSecurityExtra?.includes('Deadlocks on all External Doors')),
                        "KeyOpredLocksonallExterWins": String(THEFT_MONEY_AND_GLASS.Theft?.TheftSecurityExtra?.includes('Key Operated Locks on all External Windows')),
                        "Barsecurscreensonallexternwins": String(THEFT_MONEY_AND_GLASS.Theft?.TheftSecurityExtra?.includes('Bars/security screens on all external windows?'))
                    },
                    {
                        "ProductElementCode": "B00872",
                        "MoneyInPremisesDuringBuSInessSI": THEFT_MONEY_AND_GLASS.Money?.MoneyOnPremisesDuringBusinessHours,
                        "Moneyonpremoutsidebusinesshrs": THEFT_MONEY_AND_GLASS.Money?.MoneyOnPremisesOutsideBusinessHours,
                        "Moneyonpremlockedsafe": THEFT_MONEY_AND_GLASS.Money?.MoneyOnPremisesInALockedSafe,
                        "MoneyInTranSItSI": THEFT_MONEY_AND_GLASS.Money?.MoneyInTransit,
                        "Moneyinapvtresidence": THEFT_MONEY_AND_GLASS.Money?.MoneyInAPrivateResidence,
                        "Excess": THEFT_MONEY_AND_GLASS.Money?.MoneyExcess
                    },
                    {
                        "ProductElementCode": "B00873",
                        "GlassSumInsured": "Replacement Value",
                        "SumInsured": THEFT_MONEY_AND_GLASS.Glass?.IlluminatedSignsSumInsured,
                        "TypeofGlass": TYPE_OF_GLASS[THEFT_MONEY_AND_GLASS.Glass?.TypeOfGlass as keyof typeof TYPE_OF_GLASS],
                        "PercentageGlassAbvGrndFlr": THEFT_MONEY_AND_GLASS.Glass?.Percentage,
                        "PlateTypeGlass": TYPE_OF_PLATE[THEFT_MONEY_AND_GLASS.Glass?.TypeOfPlate as keyof typeof TYPE_OF_PLATE],
                        "Excess": THEFT_MONEY_AND_GLASS.Glass?.MoneyExcess,
                        "GlassInterestedParty": THEFT_MONEY_AND_GLASS.InterestedParty
                    }
                ]
            }
        }

        if (BUSINESS_LIABILITY_COVERAGE) {
            BUSINESS_LIABILITY_COVERAGE_VALUES = {
                "ProductElementCode": "C0001785",
                "LineOfBusinessCode": "GELI",
                "DirectorHistory": "DH3",
                "CreditScore": "CS1",
                "Import": "N",

                // Need To Replace
                // "BLCovFurtherQuestion1": "N",
                // "BLCovFurtherQuestion2": "N",
                // "BLCovFurtherQuestion3": "N",
                // "BLCovFurtherQuestion4": "N",
                // 
                "BLInterestedParty": BUSINESS_LIABILITY_COVERAGE.InterestedParty,

                "AnnualWages": BUSINESS_LIABILITY_COVERAGE.AnnualWages,
                "Turnover": AnnualTurnover,
                "NumberofEmployees": Number(NumberOfEmployees),
                "PropertyUnderYourCareorCustody": BUSINESS_LIABILITY_COVERAGE.Property,
                "ConctororLabourHirePaynts": BUSINESS_LIABILITY_COVERAGE.Contractor,
                "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_LIABILITY_COVERAGE.BuildingLiabilityClaimHistory),
                "PolicyBenefitList": [
                    {
                        "ProductElementCode": "B00863",
                        "LimitOfLiability": BUSINESS_LIABILITY_COVERAGE.LimitsOfLiability,
                        "TaxAuditSI": BUSINESS_LIABILITY_COVERAGE.TaxAudit,
                        "Excess": BUSINESS_LIABILITY_COVERAGE.Excess,
                    }
                ]
            }
        }

        if (BUSINESS_INTERRUPTION_COVERAGE) {
            BUSINESS_INTERRUPTION_COVERAGE_VALUES = {
                "ProductElementCode": "C0001786",
                "LineOfBusinessCode": "PRP",
                "IndemnityPeriod": INDEMNITY_PERIOD[BUSINESS_INTERRUPTION_COVERAGE.IndemnityPeriod as keyof typeof INDEMNITY_PERIOD],
                "IndemnityPeriod_Name": BUSINESS_INTERRUPTION_COVERAGE.IndemnityPeriod,
                "GrossProfit": BUSINESS_INTERRUPTION_COVERAGE.AnnualGrossProfit,
                "AdditionIncreaseCostOfWorking": BUSINESS_INTERRUPTION_COVERAGE.AdditionalIncreaseCostOfWork,
                "ClaimPreparationCost": BUSINESS_INTERRUPTION_COVERAGE.ClaimPreparationCost,
                "BIInterestedParty": BUSINESS_INTERRUPTION_COVERAGE.InterestedParty,
                "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_INTERRUPTION_COVERAGE.BusinessInterruptionClaimHistory),
                "PolicyBenefitList": [
                    {
                        "ProductElementCode": "B00864",
                        "Excess": BUSINESS_INTERRUPTION_COVERAGE.Excess,
                        "Turnover": AnnualTurnover,
                    }
                ]
            }
        }



        if (PORTABLE_BUSINESS_CONTENTS_COVERAGE && PortableSpecifiedItems) {
            PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES = {
                "ProductElementCode": "C0001787",
                "LineOfBusinessCode": "PRP",
                "PBCInterestedParty": PORTABLE_BUSINESS_CONTENTS_COVERAGE.InterestedParty,
                "ClaimsInLastFiveYears": GiveN_OR_Y(PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory),
                "PolicyBenefitList": [
                    {
                        "ProductElementCode": "B00865",
                        "BlanketCoverContent": PORTABLE_BUSINESS_CONTENTS_COVERAGE.BlanketCoverContent,
                    },
                    {
                        "ProductElementCode": "B00866",
                        "BlanketCoverStock": PORTABLE_BUSINESS_CONTENTS_COVERAGE.BlanketCoverStock,
                        "Excess": PORTABLE_BUSINESS_CONTENTS_COVERAGE.Excess
                    },
                    {
                        "ProductElementCode": "B00867",
                        "ReplacementValueOfTotalContents": (PortableSpecifiedItems && PortableSpecifiedItems.length !== 0 && typeof PortableSpecifiedItems[0].category !== 'undefined' && typeof PortableSpecifiedItems[0].description !== 'undefined') ? String(PortableSpecifiedItems.reduce((total, item) => total + Number(item.value), 0)) : "0",
                        "Excess": PORTABLE_BUSINESS_CONTENTS_COVERAGE.Excess,
                    }
                ],
                "PolicyEntityList": (PortableSpecifiedItems && PortableSpecifiedItems.length !== 0 && typeof PortableSpecifiedItems[0].category !== 'undefined' && typeof PortableSpecifiedItems[0].description !== 'undefined') ? PortableSpecifiedItems.map((value) => {
                    return {
                        "ProductElementCode": "PROPERTYBUSINESSCONTENTSPECIFIEDITEMS",
                        "Category": CATEGORY_OPTIONS[value.category as keyof typeof CATEGORY_OPTIONS],
                        "Category_Name": value.category,
                        "ItemsDescription": value.description,
                        "ReplacementValue": value.value
                    }
                }) : []
            }
        }

        const response = {
            "ProductCode": "BPIP01",
            "ProductVersion": "1.0",
            "CarrierReferenceNumber": "",
            "CarrierQuoteNumber": "",
            "CarrierPolicyNo": "",
            "AgencyCode": "",
            "PolicyStage": "",
            "CarrierPolicyStatus": "",
            "TrackingNumber": "",
            "LineOfBusinessCode": "VAR",
            "CarrierProductCode": "OBP1",
            "PolicyTerm": "365",

            // Coverage Selection
            "EffectiveDate": convertDateFormat(EffectiveDate),
            "ExpiryDate": convertDateFormat(ExpiryDate),
            DisclaimerAgreedTag: String(DisclaimerAgreedTag),
            "ABN": ABN,
            "Turnover": AnnualTurnover,
            "BusinessName": BusinessName,
            "NumberofEmployees": Number(NumberOfEmployees),
            "JobDescription": BusinessDescription,
            "YearBusinessStarted": YearStarted,
            "ANZSICCode": ANZSICCode,
            "YearsInBusiness": currentYear - Number(YearStarted),

            PolicyCustomerList: [
                {
                    // Coverage Selection
                    "CustomerName": BusinessName,
                    "JobDescription": BusinessDescription,
                    "ANZSICCode": ANZSICCode,

                    // Address
                    "CustomerType": "organization",
                    "StreetName": address?.addressInfo[0].street,
                    ...ADDRESS
                }
            ],

            PolicyLobList: [
                {
                    "ProductCode": "BPIP01",
                    "PolicyRiskList": [
                        {
                            "ProductElementCode": "R00005",
                            "Flood_FL_rate_SME_Cts": findElementValue('Flood_FL_rate_SME_Cts'),
                            "Flood_FL_rate_SME_Bld": findElementValue('Flood_FL_rate_SME_Bld'),
                            "Bushfire_risk_score": findElementValue('bushfire_risk_score'),
                            "Cyclone_risk_score": findElementValue('cyclone_risk_score'),
                            "Storm_risk_score_SME_Bld": findElementValue('storm_risk_score_SME_Bld'),
                            "Storm_risk_score_SME_Cts": findElementValue('storm_risk_score_SME_Cts'),
                            "Bld_elevation": findElementValue('bld_elevation'),
                            "Flood_FL_ARI_GL": findElementValue('flood_FL_ARI_GL'),
                            "SecurityFeatures": "",
                            "RuralMetro": "",
                            "TerrorLevyTier": "B",


                            "NoOfLevel": "2", // TODO : Need to check

                            // Coverages
                            "TypeOfBusiness_Name": TypeOfBusiness,
                            "LocationType_Name": LocationType,
                            "JobDescription": BusinessDescription,
                            "LocationType": LOCATION_TYPE_WITH_VALUE[LocationType],
                            "TypeOfBusiness": TYPE_OF_BUSINESS_WITH_VALUE[TypeOfBusiness],

                            // Address
                            ...ADDRESS,

                            // Property Details
                            ...(PROPERTY_DETAILS && PROPERTY_DETAILS_VALUES),

                            // Theft, Money and Glass
                            "IsTheftCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes('Theft') : false),
                            "IsMoneyCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes('Money') : false),
                            "IsGlassCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes('Glass') : false),

                            'PolicyCoverageList': [
                                ...(Coverages.includes('Business Building and Contents') ? [BUSINESS_AND_CONTENTS_VALUES] : []),
                                ...(Coverages.includes('Equipment Breakdown') ? [EQUIPMENT_BREAKDOWN_VALUES] : []),
                                ...(Coverages.includes('Theft, Money and Glass') ? [THEFT_MONEY_AND_GLASS_VALUES] : []),
                                ...(Coverages.includes('Business Liability') ? [BUSINESS_LIABILITY_COVERAGE_VALUES] : []),
                                ...(Coverages.includes('Business Interruption') ? [BUSINESS_INTERRUPTION_COVERAGE_VALUES] : []),
                                ...(Coverages.includes('Portable Business Content') ? [PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES] : []),
                            ],
                            PolicyEntityList: [
                                ...(isQuestionExist(27) ? [{
                                    "ProductElementCode": "BLENDORSEMENT",
                                    "EndorsementType": "PreBind",
                                    "EndorsementNo": "ENDO_012",
                                    "EndorsementName": "Commercial Cooking Clause",
                                    "ProductCoverageId": "C0001788",
                                    "ValueType": "amount",
                                    "IsMandatory": "",
                                    "GrossPremium": "",
                                    "SequenceNumber": "1",
                                    "PolicyRiskId": "R00005",
                                    "PolicyEntityList": [
                                        {
                                            "ProductElementCode": "BLQUESTIONANSWER",
                                            "QuestionCode": "ENDO_012_Q1",
                                            "QuestionAnswer": "Does the business employ a professional cleaner to clean the exhaust or extraction system ducting annually?",
                                            "AnswerCode": findQuestionDetails(27)
                                        }
                                    ]
                                }] : []),
                                ...(isQuestionExist(26) ? [{
                                    "ProductElementCode": "BLENDORSEMENT",
                                    "EndorsementType": "PreBind",
                                    "EndorsementNo": "ENDO_008",
                                    "EndorsementName": "Flood Cover",
                                    "ProductCoverageId": "C0001788",
                                    "IsMandatory": "",
                                    "GrossPremium": "",
                                    "ValueType": "amount",
                                    "SequenceNumber": "2",
                                    "PolicyRiskId": "R00005",
                                    "PolicyEntityList": [
                                        {
                                            "ProductElementCode": "BLQUESTIONANSWER",
                                            "QuestionCode": "ENDO_008_Q1",
                                            "QuestionAnswer": "Do you require flood cover?",
                                            "AnswerCode": findQuestionDetails(26)
                                        }
                                    ]
                                }] : []),
                                // ...ALLFORMQUESTIONS.filter(q => {
                                //     return q.QuestionId !== String(41) || (ALLFORMQUESTIONS.find(question => question.QuestionId === '39') && ALLFORMQUESTIONS.find(question => question.QuestionId === '39')?.AnswerCode === 'N')
                                // })

                                ...ALLFORMQUESTIONS.filter(q => q.QuestionId !== '41' || (ALLFORMQUESTIONS.find(question => question.QuestionId === '39')?.AnswerCode === 'Y'))

                            ]
                        }
                    ],
                    PolicyEntityList: [
                        ...(Coverages.includes('Business Building and Contents') ? ClaimList(BUSINESS_AND_CONTENTS.Claims, 'C0001788') : []),
                        ...(Coverages.includes('Equipment Breakdown') ? ClaimList(EQUIPMENT_BREAKDOWN.Claims, 'C0001790') : []),
                        ...(Coverages.includes('Theft, Money and Glass') ? ClaimList(THEFT_MONEY_AND_GLASS.Claims, 'C0001789') : []),
                        ...(Coverages.includes('Business Liability') ? ClaimList(BUSINESS_LIABILITY_COVERAGE.Claims, 'C0001785', "LI") : []),
                        ...(Coverages.includes('Business Interruption') ? ClaimList(BUSINESS_INTERRUPTION_COVERAGE.Claims, 'C0001786') : []),
                        ...(Coverages.includes('Portable Business Content') ? ClaimList(PORTABLE_BUSINESS_CONTENTS_COVERAGE.Claims, 'C0001787') : []),
                    ]
                }
            ],
            "PolicyPaymentInfoList": [
                {
                    "BillingType": "ABI",
                    "PaymentPlan": "PPC001",
                    "IsInstallment": "N"
                }
            ]
        }

        // await writeFile('insurance-form-create-quote.json', JSON.stringify(response, null, 2))

        const [access] = await GETQuoteToken()
        const responseValue = await SubmitCreateQuote(access?.access_token!, response)

        await createQuoteResponseDebugModelQuote({
            meta: {
                email: user.email,
                role: user.role,
                createdAt: new Date()
            },
            ...response
        })

        if ((responseValue[0] as QuoteErrorMessage).CloverErrorResponse) {
            await createQuoteDebug({
                meta: {
                    email: user.email,
                    role: user.role,
                    createdAt: new Date(),
                    errorResponse: responseValue[0]
                }, ...response
            })
        }


        return responseValue



    } catch (error) {
        return [null, (error as Error).message]
    }

}

export const SubmitFullQuoteForm = async (data: InsuranceFormCreateQuoteDataTypes['premium-summary'], createQuote: Object) => {

    try {

        const {
            DeclarationQuestions,
            Exemption,
            Liability,
            Property,
            BrokerFees
        } = data

        const { BrokerFee, ...rest } = createQuote as { BrokerFee: string }

        const response = {
            "LibCommission": Liability || 0,
            "PropCommission": Property || 0,
            "Hadanyinsurdeclinedorcancelled": GiveN_OR_Y(DeclarationQuestions[0].answer),
            "ConvictedCriminalOffence": GiveN_OR_Y(DeclarationQuestions[1].answer),
            "BankruptorInsolvencyBusiness": GiveN_OR_Y(DeclarationQuestions[2].answer),
            "Sufferedlossordamagecovbyinspol": GiveN_OR_Y(DeclarationQuestions[3].answer),
            "NSWstampDutyExemption": GiveN_OR_Y(Exemption[0].answer),
            "BrokerFee": BrokerFees,
            ...rest

        }

        const [access] = await GETQuoteToken()

        const responseValue = await SubmitFullQuote(access?.access_token!, response)
        return responseValue

    } catch (error) {
        return [null, (error as Error).message]
    }

}
