import { generateSixYears, parseCurrency } from "@/common/utils/common";
import { z } from "zod";



export const LOCATION_TYPE = [
    "Modern Office Block",
    "Normal Property",
    "Secured Shopping Centre",
] as const;

export const LOCATION_TYPE_WITH_VALUE = {
    "Modern Office Block": "MODOB",
    "Normal Property": "NORPR",
    "Secured Shopping Centre": "SECSC",
}

export const TYPE_OF_BUSINESS = [
    "Business Operations Only",
    "Property Owner Only",
    "Property Owner And Business Operations",
] as const;

export const TYPE_OF_BUSINESS_WITH_VALUE = {
    "Business Operations Only": "BOO",
    "Property Owner Only": "POO",
    "Property Owner And Business Operations": "POBO",
}


export const COVERAGES = [
    "Business Liability",
    "Business Interruption",
    "Portable Business Content",
    "Business Building and Contents",
    "Equipment Breakdown",
    "Theft, Money and Glass",
] as const;



export const FLOOR_CONSTRUCTION = {
    "Concrete": "CONC",
    "Mixed": "MIXD",
    "Stone": "STON",
    "Tile": "TILE",
    "Wood": "WOOD",
};

export const ROOF_CONSTRUCTION = {
    "Asbestos": "ASBES",
    "Clay Tile": "CLATI",
    "Concrete Slab": "CONSL",
    "Fibro": "FIBRO",
    "Glass": "GLASS",
    "Membrane Roofing": "MEMRO",
    "Metal (Aluminum, Colourbond, Iron)": "METAL",
    "Others": "OTHER",
    "Sandwich Panel / EPS": "SANEP",
    "Slate Tile": "SLATE",
    "Terracotta": "TERRA",
    "Timber": "TIMBA",
};

export const WALL_CONSTRUCTION = {
    'Asbestos': "ASBES",
    'Brick': "BRICK",
    'Brick Veneer': "BRIVE",
    'Concrete': "CONCR",
    'Curtain Wall': "CURWA",
    'Fibro': "FIBRO",
    'Masonry': "MASON",
    'Metal': "METAL",
    'Other Sheet Panel Cladding': "OTSPC",
    'Others': "OTHER",
    'Stone': "STONE",
    'Timber': "TIMBE",
};


export const CLAIM_TYPES = {
    "Fire": "FIRE",
    "Impact": "IMPAC",
    "Earthquake or Tsunami": "EAOTS",
    "Explosion": "EXPLO",
    "Machinery Breakdown & Electronic Equipment": "MBEE",
    "Loss of access": "LOOAC",
    "Power Surge": "POWSU",
    "Cyclone": "CYCLO",
    "Escape of Liquid": "ESCLI",
    "Theft or burglary": "THBU",
    "Portable Business Cover": "POBC",
    "Bushfire": "BUSHF",
    "Accidental loss or damage": "ACLOD",
    "Civil Commotion or Riot": "CICOR",
    "Lightnight or thunderbolt": "LINOT",
    "Vandalism or Malicious Act": "VAMAL",
    "Glass Breakage": "GLABR",
    "Storm": "STORM",
};

export const FLOOR = {
    "Ground Floor": "GROFL",
    "1st Floor": "1STFL",
    "2nd Floor or Above": "2NDFL",
};

export const EXCESS = [
    "250",
    "500",
    "750",
    "1000",
    "1250",
    "1500",
    "1750",
    "2000",
    "2500",
    "5000",
    "10000",
] as const;

export const COVER = [
    "10000",
    "20000"
] as const

export const TAXAUDIT = [
    '0',
    "10000",
    "20000",
    "30000",
    "40000",
    "50000",
] as const

export const LIABILITY = [
    "5000000",
    "10000000",
    "20000000",
] as const

export const THEFT_SECURITY = {
    "Local Alarm": "localAlarm",
    "Monitored Alarm": "monitoredAlarm",
    "No Alarm": "noAlarm",
    "No Security": "noSecurity",
}

export const THEFT_SECURITY_EXTRA = {
    "Deadlocks on all External Doors": "DeadlocksonallExternalDoors",
    "Key Operated Locks on all External Windows": "KeyOpredLocksonallExterWins",
    "Bars/Security Screens on all External Windows?": "Barsecurscreensonallexternwins"
}

export const COVERAGESROUTES = {
    "Business Building and Contents": "business-and-contents",
    "Equipment Breakdown": "equipment-breakdown",
    "Theft, Money and Glass": "theft-money-and-glass",
    "Business Liability": "business-liability-coverage",
    "Business Interruption": "business-interruption-coverage",
    "Portable Business Content": "portable-business-contents-coverage",
}


export const THEFT_MONEY_AND_GLASS = [
    "Theft",
    "Money",
    "Glass",
] as const;


export const TYPE_OF_GLASS = {
    "Internal only": "internal",
    'External only': "external",
    "Internal and External": "internalAndExternal",
}

export const TYPE_OF_PLATE = {
    "Plate": "plate",
    "Non-Plate": "nonPlate",
}

export const FIVE_YEAR_LIABILITY = {
    "Liability - Advertising Liability": "LIAAL",
    "Liability - Personal Injury": "LIAPI",
    "Liability - Property Damage": "LIAPD",
}

export const INDEMNITY_PERIOD = {
    "3 Months": "3M",
    "6 Months": "6M",
    "9 Months": "9M",
    "12 Months": "12M",
    "18 Months": "18M",
    "24 Months": "24M",
    "36 Months": "36M",
}

export const CATEGORY_OPTIONS = {
    "Amplifiers, speakers and sound equipment": "ASASE",
    "Cleaning equipment": "CLEQU",
    "Compressors and machinery": "COAMA",
    "Laptops, notepads and tablet": "LNAT",
    "Mobile phones": "MOPHO",
    "Office equipment": "OFEQU",
    "Photography and video equipment": "PAVEQ",
    "Radio equipment": "RAEQU",
    "Surveying equipment": "SUEQU",
    "Tools": "TOOLS",
};


export const FORMTYPES = [
    'coverage-selection',
    'property-details',
    'business-and-contents',
    'equipment-breakdown',
    'theft-money-and-glass',
    'business-liability-coverage',
    'business-interruption-coverage',
    'portable-business-contents-coverage',
    'further-and-endorsements-questions',
    'premium-summary',
    'quote-summary',
] as const

export const FORMTYPES_WITH_VALUE = {
    "C0001788": "Business Building and Contents",
    "C0001790": "Equipment Breakdown",
    "C0001789": "Theft, Money and Glass",
    "C0001785": "Business Liability",
    "C0001786": "Business Interruption",
    "C0001787": "Portable Business Content",
}

export const PREMIUM_QUESTION = {
    "Declaration Questions": [
        {
            id: "Hadanyinsurdeclinedorcancelled",
            question: "Had any insurance declined or cancelled ?",
        },
        {
            id: "ConvictedCriminalOffence",
            question: "Been convicted of any criminal offence ?",
        },
        {
            id: "BankruptorInsolvencyBusiness",
            question:
                "Been declared bankrupt or involved in a business which became insolvent or is subject to any form of insolvency administration ?",
        },
        {
            id: "Sufferedlossordamagecovbyinspol",
            question:
                "Suffered any loss or damage which would have been covered by the proposed insurance policy ?",
        },
    ],
    Exemption: [
        {
            id: "NSWstampDutyExemption",
            question: "Are you claiming NSW stamp duty exemption ?",
        },
    ],
};


// Zod Schemas


export const SUMEXCESS = z.enum(EXCESS, {
    message: "Excess is required",
});

export const SUMLIABILITY = z.enum(LIABILITY, {
    message: "Limit of Liability is required",
})

export const TAXAUDITCOVER = z.enum(TAXAUDIT, {
    message: "Tax Audit Sum Insured is required",
})

export const YEARLOSS = z.enum(generateSixYears() as [string, ...string[]], {
    message: "Year Of Loss is required",
})


export const CLAIMTYPES = z.enum(Object.keys(CLAIM_TYPES) as [string, ...string[]], {
    message: "Claim Type is required",
})
export const CLAIMTYPESLI = z.enum(Object.keys(FIVE_YEAR_LIABILITY) as [string, ...string[]], {
    message: "Claim Type is required",
})

export const AMOUNT = (value: string, optional?: boolean) => {

    if (optional) {
        return z.string({
            message: `${value} is required`,
        }).optional().transform((data, ctx) => {

            const parsed = parseCurrency(data || "");

            if (Number(parsed) >= Number(100000000000)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `${value} cannot be greater than 100,000,000,000`,
                })
            }

            return parsed;
        })
    }

    return z.string({
        message: `${value} is required`,
    }).nonempty({
        message: `${value} is required`,
    }).transform((data, ctx) => {

        const parsed = parseCurrency(data);

        if (parsed === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${value} is required`,
            })
        }

        if (Number(parsed) >= Number(100000000000)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${value} cannot be greater than 100,000,000,000`,
            })
        }


        return parsed;
    })

}


export const CLAIMS_IN_LAST_FIVE_YEARS = z.object({
    YearOfLoss: YEARLOSS,
    ClaimType: CLAIMTYPES,
    Value: AMOUNT("Value"),
})

export const CLAIMS_IN_LAST_FIVE_YEARS_LI = z.object({
    YearOfLoss: YEARLOSS,
    ClaimType: CLAIMTYPESLI,
    Value: AMOUNT("Value"),
})


export const CLAIMS_BOOLEAN = z.enum(["yes", "no"], {
    message: "Claim In Last Five Year is required",
})