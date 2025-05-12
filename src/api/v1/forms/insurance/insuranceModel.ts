import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AMOUNT, CATEGORY_OPTIONS, CLAIMS_BOOLEAN, CLAIMS_IN_LAST_FIVE_YEARS, CLAIMS_IN_LAST_FIVE_YEARS_LI, COVER, COVERAGES, FLOOR, FLOOR_CONSTRUCTION, FORMTYPES, INDEMNITY_PERIOD, LOCATION_TYPE, ROOF_CONSTRUCTION, SUMEXCESS, SUMLIABILITY, TAXAUDITCOVER, THEFT_MONEY_AND_GLASS, THEFT_SECURITY, THEFT_SECURITY_EXTRA, TYPE_OF_BUSINESS, TYPE_OF_GLASS, TYPE_OF_PLATE, WALL_CONSTRUCTION } from "./insuranceStaticData";

extendZodWithOpenApi(z);



const ManualAddress = z.object({
    streetNumber: z
        .string({
            message: "Street Number is required",
        })
        .nonempty({
            message: "Street Number is required",
        }),
    streetName: z
        .string({
            message: "Street Name is required",
        }),
    // .nonempty({
    //   message: "Street Name is required",
    // }),
    streetType: z
        .string({
            message: "Street Type is required",
        }),
    // .nonempty({
    //   message: "Street Type is required",
    // }),
    town: z
        .string({
            message: "Town/Suburb is required",
        })
        .nonempty({
            message: "Town/Suburb is required",
        }),
    state: z
        .string({
            message: "State/Territory is required",
        })
        .nonempty({
            message: "State/Territory is required",
        }),
    postCode: z
        .string({
            message: "Post Code is required",
        })
        .nonempty({
            message: "Post Code is required",
        }),
});


export const CoverageSelectionFormSchema = z.object({
    ABN: z.string().optional(),
    EffectiveDate: z.string(),
    ExpiryDate: z.string(),
    BusinessName: z.string().nonempty({
        message: "Bussiness Name is required",
    }),
    BusinessDescription: z.string().nonempty({
        message: "Business Description is required",
    }),
    ANZSICCode: z.string().nonempty({
        message: "ANZSIC Code is required",
    }),
    streetAddress: z.string().nonempty({
        message: "Street Address is required",
    }),
    isManual: z.boolean().default(false).optional(),

    address: ManualAddress.optional(),
    AnnualTurnover: z
        .string()
        .nonempty({
            message: "Annual Turnover is required",
        })
        .min(1, {
            message: "Annual Turnover must be greater than 0",
        }),
    NumberOfEmployees: z
        .string({
            message: "Number Of Employees is required",
        })
        .min(1, {
            message: "Number of Employees must be greater than 0",
        }),
    YearStarted: z
        .string()
        .min(4, {
            message: "Year Started is required",
        })
        .max(4, {
            message: "Year Started must be 4 digits",
        }),
    LocationType: z.enum(LOCATION_TYPE, {
        message: "Location Type is required",
    }),
    TypeOfBusiness: z.enum(TYPE_OF_BUSINESS, {
        message: "Type Of Business is required",
    }),
    Coverages: z.array(z.enum(COVERAGES), {
        message: "Coverages is required",
    }),

}).strict({
    message: "Invalid Form Content",
})

export const PropertyDetailsFormSchema = z.object({
    YearBuilt: z
        .string()
        .min(4, {
            message: "Year Built is required",
        })
        .max(4, {
            message: "Year Built must be 4 digits",
        })
        .refine(
            (value) => {
                const currentYear = new Date().getFullYear();
                return Number(value) <= currentYear;
            },
            {
                message: `Year Started must be less than or equal to ${new Date().getFullYear()}`,
            }
        ),
    FloorConstruction: z.enum(
        Object.keys(FLOOR_CONSTRUCTION) as [string, ...string[]],
        {
            message: "Floor Construction is required",
        }
    ),
    RoofConstruction: z.enum(
        Object.keys(ROOF_CONSTRUCTION) as [string, ...string[]],
        {
            message: "Roof Construction is required",
        }
    ),
    WallContruction: z.enum(
        Object.keys(WALL_CONSTRUCTION) as [string, ...string[]],
        {
            message: "Wall Construction is required",
        }
    ),
    EPS: z
    .string({
        message: "Sandwich Panel or EPS is required",
    })
    .min(1, {
        message: "Sandwich Panel or EPS is required",
    })
    .refine(
        (value) => {
            return Number(value) <= 100;
        },
        {
            message: "Sandwich Panel or EPS cannot be greater than 100.",
        }
    ),
    NumberOfStories: z
        .string()
        .min(1, {
            message: "Number Of Stories is required",
        })
        .refine(
            (value) => {
                return Number(value) <= 20;
            },
            {
                message: "Number Of Stories cannot be greater than 100.",
            }
        ),

    HeritageListing: z.enum(["yes", "no"], {
        message: "Heritage Listing is required",
    }),

    LowestFloorYouOccupy: z.enum(Object.keys(FLOOR) as [string, ...string[]], {
        message: "Lowest Floor You Occupy is required",
    }),

    InterestedParty: z.string().optional(),
}).strict({
    message: "Invalid Form Content",
});

export const BusinessAndContentsSchema = z
    .object({
        BuildingLimitAndExcess_Insured: AMOUNT("Sum Insured"),
        BuildingLimitAndExcess_Excess: SUMEXCESS,

        ContentsLimitAndExcess_Insured: AMOUNT("Sum Insured"),
        ContentsLimitAndExcess_Excess: SUMEXCESS,

        StockLimitAndExcess_Insured: AMOUNT("Sum Insured"),
        StockLimitAndExcess_Excess: SUMEXCESS,

        BuildingAndContentClaimHistory: CLAIMS_BOOLEAN,

        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS),
    }).strict({
        message: "Invalid Form Content",
    })
    .superRefine((data, ctx) => {
        const claimHistory = data.BuildingAndContentClaimHistory;
        const claims = data.Claims;
        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    })


export const EquipmentBreakdownSchema = z
    .object({
        BlanketCover: z.enum(COVER, {
            message: "Select a Blanket Cover",
        }),
        DeteriorationOfStock: AMOUNT("Deterioration Of Stock", true),
        IncreasedCostOfWorking: AMOUNT("Increased Cost Of Working", true),
        NumberOfMachines: AMOUNT("Number Of Machines"),

        MachineryBreakdownExcess: SUMEXCESS.optional(),

        Computers: AMOUNT("Computers", true),

        PortableElectronicEquipment: AMOUNT("Portable Electronic Equipment", true),

        OtherElectronicEquipment: AMOUNT("Other Electronic Equipment", true),

        ElectronicEquipmentExcess: SUMEXCESS.optional(),

        EquipmentBreakdownClaimHistory: CLAIMS_BOOLEAN,

        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS),
    }).strict({
        message: "Invalid Form Content",
    })
    .superRefine((data, ctx) => {
        const claimHistory = data.EquipmentBreakdownClaimHistory;
        const claims = data.Claims;
        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    });


const TheftSchema = z.object({
    TheftTobaccoExcluding: AMOUNT("Theft (Tobacco Excluding)"),
    TheftTobacco: AMOUNT("Theft (Tobacco)"),
    TheftExcess: SUMEXCESS,
    TheftSecurity: z.enum(
        Object.keys(THEFT_SECURITY) as [string, ...string[]],
        {
            message: "Theft Security is required",
        }
    ),
    TheftSecurityExtra: z
        .array(
            z.enum(Object.keys(THEFT_SECURITY_EXTRA) as [string, ...string[]], {
                message: "Theft Security is required",
            })
        )
        .optional(),
});

const MoneySchema = z.object({
    MoneyOnPremisesDuringBusinessHours: AMOUNT(
        "Money On Premises During Business Hours",
        true
    ),
    MoneyOnPremisesOutsideBusinessHours: AMOUNT(
        "Money On Premises Outside Business Hours",
        true
    ),
    MoneyOnPremisesInALockedSafe: AMOUNT(
        "Money On Premises In A Locked Safe",
        true
    ),
    MoneyInTransit: AMOUNT("Money In Transit", true),
    MoneyInAPrivateResidence: AMOUNT("Money In A Private Residence", true),
    MoneyExcess: SUMEXCESS.optional(),
});

const GlassSchema = z.object({
    IlluminatedSignsSumInsured: AMOUNT("Illuminated Signs Sum Insured", true),
    Percentage: z
        .string({
            message: "Percentage of Glass Above the Ground Floor is required",
        })
        .min(1, {
            message: "Percentage of Glass Above the Ground Floor is required",
        })
        .refine(
            (value) => {
                return Number(value) <= 100;
            },
            {
                message:
                    "Percentage of Glass Above the Ground Floor cannot be greater than 100.",
            }
        )
        .refine(
            (value) => {
                return Number(value) > 0;
            },
            {
                message: "Percentage of Glass Above the Ground Floor cannot be 0.",
            }
        ),
    MoneyExcess: SUMEXCESS.optional(),
    TypeOfGlass: z.enum(Object.keys(TYPE_OF_GLASS) as [string, ...string[]], {
        message: "Type of glass is required",
    }),
    TypeOfPlate: z.enum(Object.keys(TYPE_OF_PLATE) as [string, ...string[]], {
        message: "Plate or Non-Plate Glass is required",
    }),
});

export const TheftMoneyAndGlassSchema = z
    .object({
        Sections: z
            .array(z.enum(THEFT_MONEY_AND_GLASS), {
                message: "Please select at least one coverage.",
            })
            .nonempty({
                message: "Please select at least one coverage.",
            }),

        Theft: TheftSchema.optional(), // Default to optional here

        Money: MoneySchema.optional(), // Default to optional here

        Glass: GlassSchema.optional(), // Default to optional here

        InterestedParty: z.string().optional(),
        TheftMoneyAndGlassClaimHistory: CLAIMS_BOOLEAN,
        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS),
    })
    .strict(
        {
            message: "Invalid Form Content",
        })
    .superRefine((data, ctx) => {
        const claimHistory = data.TheftMoneyAndGlassClaimHistory;
        const claims = data.Claims;

        const sections = data.Sections;
        const money = data.Money;

        const allFieldsEmpty =
            money &&
            Object.values(money).every(
                (value) => value === undefined || value === null || value === ""
            );

        if (sections.includes("Money") && allFieldsEmpty) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Please enter at least one of the Sum Insured value In Money Section.",
                path: ["Sections"],
            });
        }

        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    });

export const BusinessLiabilityCoverageSchema = z
    .object({
        LimitsOfLiability: SUMLIABILITY,
        AnnualWages: AMOUNT("Annual Wages"),
        Property: AMOUNT(
            "Property in Your Physical or Legal Care, Custody or Control"
        ),
        Contractor: AMOUNT("Contractor or Labour Hire Payments"),
        TaxAudit: TAXAUDITCOVER,
        Excess: SUMEXCESS,
        InterestedParty: z.string().optional(),
        BuildingLiabilityClaimHistory: CLAIMS_BOOLEAN,
        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS_LI),
    }).strict({
        message: "Invalid Form Content",
    })
    .superRefine((data, ctx) => {
        const claimHistory = data.BuildingLiabilityClaimHistory;
        const claims = data.Claims;
        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    });


export const BusinessInterruptionCoverageSchema = z
    .object({
        IndemnityPeriod: z.enum(
            Object.keys(INDEMNITY_PERIOD) as [string, ...string[]],
            {
                message: "Indemnity Period is required",
            }
        ),
        AnnualGrossProfit: AMOUNT("Annual Gross Profit"),
        AdditionalIncreaseCostOfWork: AMOUNT("Additional Increase Cost of Work", true),
        ClaimPreparationCost: AMOUNT("Claim Preparation Cost", true),
        Excess: SUMEXCESS,
        BusinessInterruptionClaimHistory: CLAIMS_BOOLEAN,
        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS),
        InterestedParty: z.string().optional(),
    }).strict({
        message: "Invalid Form Content",
    })
    .superRefine((data, ctx) => {
        const claimHistory = data.BusinessInterruptionClaimHistory;
        const claims = data.Claims;
        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    });


export const PortableBusinessContentsCoverageSchema = z
    .object({
        BlanketCoverContent: AMOUNT("Blanket Cover Content"),
        BlanketCoverStock: AMOUNT("Blanket Cover Stock"),

        Excess: SUMEXCESS,
        InterestedParty: z.string().optional(),

        PortableBusinessClaimHistory: CLAIMS_BOOLEAN,
        Claims: z.array(CLAIMS_IN_LAST_FIVE_YEARS),

        PortableSpecifiedItems: z
            .array(
                z.object({
                    category: z
                        .enum(Object.keys(CATEGORY_OPTIONS) as [string, ...string[]], {
                            message: "Category is required",
                        }).optional(),
                    description: z.string().optional(),
                    value: AMOUNT("Value", true),
                })
            )
            .optional(),
    }).strict({
        message: "Invalid Form Content",
    })
    .superRefine((data, ctx) => {
        const claimHistory = data.PortableBusinessClaimHistory;
        const claims = data.Claims;
        if (claimHistory === "yes" && claims.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "At least one claim is required when claim history is yes",
                path: ["Claims"],
            });
        }
    });

export const InsuranceFormGetSchema = z.object({
    query: z.object({
        FormType: z.enum(FORMTYPES, {
            message: 'Form Type is required',
        }),
        id: z.string().optional()
    }).strict({
        message: "Invalid Form Content",
    }),
})

export const InsuranceFormStatusSchema = z.object({
    query: z.object({
        id: z.string().optional(),
    }).strict({
        message: "Invalid Form Content",
    }),
})

export const InsuranceFormPostSchema = z.object({
    body: z.union([
        CoverageSelectionFormSchema,
        PropertyDetailsFormSchema,
        BusinessAndContentsSchema,
        EquipmentBreakdownSchema,
        TheftMoneyAndGlassSchema,
        BusinessLiabilityCoverageSchema,
        BusinessInterruptionCoverageSchema,
        PortableBusinessContentsCoverageSchema,
    ]),


    query: z.object({
        FormType: z.enum(FORMTYPES, {
            message: 'Form Type is required',
        }),
        id: z.string().optional()
    }).strict(),
})
    .superRefine((data, ctx) => {

        const form = data.query.FormType
        const content = data.body

        if (form === 'premium-summary' || form === 'quote-summary') {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid Form Type',
            })
        }

        if (!FORMTYPES.includes(form)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Form Type is required',
            })
        }

        const all = {
            'coverage-selection': CoverageSelectionFormSchema,
            'property-details': PropertyDetailsFormSchema,
            'business-and-contents': BusinessAndContentsSchema,
            'equipment-breakdown': EquipmentBreakdownSchema,
            'theft-money-and-glass': TheftMoneyAndGlassSchema,
            'business-liability-coverage': BusinessLiabilityCoverageSchema,
            'business-interruption-coverage': BusinessInterruptionCoverageSchema,
            'portable-business-contents-coverage': PortableBusinessContentsCoverageSchema,
        }

        if (form) {
            const result = all[form as keyof typeof all].safeParse(content)
            if (!result.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid Form Content',
                })
            }
        }


    })



const FURTHER_QUESTIONS_SCHEMA = z.object({
    id: z.number(),
    question: z.string(),
    answer: z.enum(["yes", "no"], {
        message: "Answer is required",
    }),
});

export const FurtherAndEndorsementsQuestionsSchema = z
    .object({
        DisclaimerAgreedTag: z.boolean().optional(),
        BusinessAndContents: z.array(FURTHER_QUESTIONS_SCHEMA).optional(),
        TheftMoneyAndGlass: z.array(FURTHER_QUESTIONS_SCHEMA).optional(),
        BusinessLiabilityCoverage: z.array(FURTHER_QUESTIONS_SCHEMA).optional(),
    }).strict({
        message: "Invalid Form Content"
    })



export const InsuranceFormCreateQuote = z.object({

    body: FurtherAndEndorsementsQuestionsSchema,

    query: z.object({
        FormType: z.enum(['further-and-endorsements-questions'], {
            message: 'Form Type is required',
        }),
    }).strict({
        message: "Invalid Form Content"
    }),
})

const PREMIUM_QUESTIONS_SCHEMA = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.enum(["yes", "no"], {
        message: "Answer is required",
    }),
});

export const PremiumSummarySchema = z.object({
    DeclarationQuestions: z.array(PREMIUM_QUESTIONS_SCHEMA),
    Exemption: z.array(PREMIUM_QUESTIONS_SCHEMA),
    Liability: z
        .string({
            message: "Liability is required",
        })
        .refine(
            (value) => {
                return Number(value) <= 100;
            },
            {
                message: "Liability cannot be greater than 100.",
            }
        )
        .optional(),
    Property: z
        .string({
            message: "Property is required",
        })
        .refine(
            (value) => {
                return Number(value) <= 100;
            },
            {
                message: "Property cannot be greater than 100.",
            }
        )
        .optional(),
    BrokerFees: AMOUNT("Broker Fees"),
})

export const InsuranceFormFullQuote = z.object({

    body: PremiumSummarySchema,

    query: z.object({
        FormType: z.enum(['premium-summary'], {
            message: 'Form Type is required',
        }),
    }).strict({
        message: "Invalid Form Content",
    }),
})

export const InsuranceFormCloneModel = z.object({
    query: z.object({
        id: z.string({ message: 'ID is required' }),
    }).strict({ message: "Invalid Form Content" })
})

export const InsuranceFormDiscardModel = z.object({
    query: z.object({
        id: z.string({ message: 'ID is required' }),
    }).strict({ message: "Invalid Form Content" })
})