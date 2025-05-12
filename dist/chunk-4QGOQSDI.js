"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkX5VRHMWCjs = require('./chunk-X5VRHMWC.js');

// src/api/v1/forms/insurance/insuranceStaticData.ts
var _zod = require('zod');
var LOCATION_TYPE = [
  "Modern Office Block",
  "Normal Property",
  "Secured Shopping Centre"
];
var LOCATION_TYPE_WITH_VALUE = {
  "Modern Office Block": "MODOB",
  "Normal Property": "NORPR",
  "Secured Shopping Centre": "SECSC"
};
var TYPE_OF_BUSINESS = [
  "Business Operations Only",
  "Property Owner Only",
  "Property Owner And Business Operations"
];
var TYPE_OF_BUSINESS_WITH_VALUE = {
  "Business Operations Only": "BOO",
  "Property Owner Only": "POO",
  "Property Owner And Business Operations": "POBO"
};
var COVERAGES = [
  "Business Liability",
  "Business Interruption",
  "Portable Business Content",
  "Business Building and Contents",
  "Equipment Breakdown",
  "Theft, Money and Glass"
];
var FLOOR_CONSTRUCTION = {
  "Concrete": "CONC",
  "Mixed": "MIXD",
  "Stone": "STON",
  "Tile": "TILE",
  "Wood": "WOOD"
};
var ROOF_CONSTRUCTION = {
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
  "Timber": "TIMBA"
};
var WALL_CONSTRUCTION = {
  "Asbestos": "ASBES",
  "Brick": "BRICK",
  "Brick Veneer": "BRIVE",
  "Concrete": "CONCR",
  "Curtain Wall": "CURWA",
  "Fibro": "FIBRO",
  "Masonry": "MASON",
  "Metal": "METAL",
  "Other Sheet Panel Cladding": "OTSPC",
  "Others": "OTHER",
  "Stone": "STONE",
  "Timber": "TIMBE"
};
var CLAIM_TYPES = {
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
  "Storm": "STORM"
};
var FLOOR = {
  "Ground Floor": "GROFL",
  "1st Floor": "1STFL",
  "2nd Floor or Above": "2NDFL"
};
var EXCESS = [
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
  "10000"
];
var COVER = [
  "10000",
  "20000"
];
var TAXAUDIT = [
  "0",
  "10000",
  "20000",
  "30000",
  "40000",
  "50000"
];
var LIABILITY = [
  "5000000",
  "10000000",
  "20000000"
];
var THEFT_SECURITY = {
  "Local Alarm": "localAlarm",
  "Monitored Alarm": "monitoredAlarm",
  "No Alarm": "noAlarm",
  "No Security": "noSecurity"
};
var THEFT_SECURITY_EXTRA = {
  "Deadlocks on all External Doors": "DeadlocksonallExternalDoors",
  "Key Operated Locks on all External Windows": "KeyOpredLocksonallExterWins",
  "Bars/Security Screens on all External Windows?": "Barsecurscreensonallexternwins"
};
var COVERAGESROUTES = {
  "Business Building and Contents": "business-and-contents",
  "Equipment Breakdown": "equipment-breakdown",
  "Theft, Money and Glass": "theft-money-and-glass",
  "Business Liability": "business-liability-coverage",
  "Business Interruption": "business-interruption-coverage",
  "Portable Business Content": "portable-business-contents-coverage"
};
var THEFT_MONEY_AND_GLASS = [
  "Theft",
  "Money",
  "Glass"
];
var TYPE_OF_GLASS = {
  "Internal only": "internal",
  "External only": "external",
  "Internal and External": "internalAndExternal"
};
var TYPE_OF_PLATE = {
  "Plate": "plate",
  "Non-Plate": "nonPlate"
};
var FIVE_YEAR_LIABILITY = {
  "Liability - Advertising Liability": "LIAAL",
  "Liability - Personal Injury": "LIAPI",
  "Liability - Property Damage": "LIAPD"
};
var INDEMNITY_PERIOD = {
  "3 Months": "3M",
  "6 Months": "6M",
  "9 Months": "9M",
  "12 Months": "12M",
  "18 Months": "18M",
  "24 Months": "24M",
  "36 Months": "36M"
};
var CATEGORY_OPTIONS = {
  "Amplifiers, speakers and sound equipment": "ASASE",
  "Cleaning equipment": "CLEQU",
  "Compressors and machinery": "COAMA",
  "Laptops, notepads and tablet": "LNAT",
  "Mobile phones": "MOPHO",
  "Office equipment": "OFEQU",
  "Photography and video equipment": "PAVEQ",
  "Radio equipment": "RAEQU",
  "Surveying equipment": "SUEQU",
  "Tools": "TOOLS"
};
var FORMTYPES = [
  "coverage-selection",
  "property-details",
  "business-and-contents",
  "equipment-breakdown",
  "theft-money-and-glass",
  "business-liability-coverage",
  "business-interruption-coverage",
  "portable-business-contents-coverage",
  "further-and-endorsements-questions",
  "premium-summary",
  "quote-summary"
];
var FORMTYPES_WITH_VALUE = {
  "C0001788": "Business Building and Contents",
  "C0001790": "Equipment Breakdown",
  "C0001789": "Theft, Money and Glass",
  "C0001785": "Business Liability",
  "C0001786": "Business Interruption",
  "C0001787": "Portable Business Content"
};
var PREMIUM_QUESTION = {
  "Declaration Questions": [
    {
      id: "Hadanyinsurdeclinedorcancelled",
      question: "Had any insurance declined or cancelled ?"
    },
    {
      id: "ConvictedCriminalOffence",
      question: "Been convicted of any criminal offence ?"
    },
    {
      id: "BankruptorInsolvencyBusiness",
      question: "Been declared bankrupt or involved in a business which became insolvent or is subject to any form of insolvency administration ?"
    },
    {
      id: "Sufferedlossordamagecovbyinspol",
      question: "Suffered any loss or damage which would have been covered by the proposed insurance policy ?"
    }
  ],
  Exemption: [
    {
      id: "NSWstampDutyExemption",
      question: "Are you claiming NSW stamp duty exemption ?"
    }
  ]
};
var SUMEXCESS = _zod.z.enum(EXCESS, {
  message: "Excess is required"
});
var SUMLIABILITY = _zod.z.enum(LIABILITY, {
  message: "Limit of Liability is required"
});
var TAXAUDITCOVER = _zod.z.enum(TAXAUDIT, {
  message: "Tax Audit Sum Insured is required"
});
var YEARLOSS = _zod.z.enum(_chunkX5VRHMWCjs.generateSixYears.call(void 0, ), {
  message: "Year Of Loss is required"
});
var CLAIMTYPES = _zod.z.enum(Object.keys(CLAIM_TYPES), {
  message: "Claim Type is required"
});
var CLAIMTYPESLI = _zod.z.enum(Object.keys(FIVE_YEAR_LIABILITY), {
  message: "Claim Type is required"
});
var AMOUNT = (value, optional) => {
  if (optional) {
    return _zod.z.string({
      message: `${value} is required`
    }).optional().transform((data, ctx) => {
      const parsed = _chunkX5VRHMWCjs.parseCurrency.call(void 0, data || "");
      if (Number(parsed) >= Number(1e11)) {
        ctx.addIssue({
          code: _zod.z.ZodIssueCode.custom,
          message: `${value} cannot be greater than 100,000,000,000`
        });
      }
      return parsed;
    });
  }
  return _zod.z.string({
    message: `${value} is required`
  }).nonempty({
    message: `${value} is required`
  }).transform((data, ctx) => {
    const parsed = _chunkX5VRHMWCjs.parseCurrency.call(void 0, data);
    if (parsed === "") {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: `${value} is required`
      });
    }
    if (Number(parsed) >= Number(1e11)) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: `${value} cannot be greater than 100,000,000,000`
      });
    }
    return parsed;
  });
};
var CLAIMS_IN_LAST_FIVE_YEARS = _zod.z.object({
  YearOfLoss: YEARLOSS,
  ClaimType: CLAIMTYPES,
  Value: AMOUNT("Value")
});
var CLAIMS_IN_LAST_FIVE_YEARS_LI = _zod.z.object({
  YearOfLoss: YEARLOSS,
  ClaimType: CLAIMTYPESLI,
  Value: AMOUNT("Value")
});
var CLAIMS_BOOLEAN = _zod.z.enum(["yes", "no"], {
  message: "Claim In Last Five Year is required"
});






































exports.LOCATION_TYPE = LOCATION_TYPE; exports.LOCATION_TYPE_WITH_VALUE = LOCATION_TYPE_WITH_VALUE; exports.TYPE_OF_BUSINESS = TYPE_OF_BUSINESS; exports.TYPE_OF_BUSINESS_WITH_VALUE = TYPE_OF_BUSINESS_WITH_VALUE; exports.COVERAGES = COVERAGES; exports.FLOOR_CONSTRUCTION = FLOOR_CONSTRUCTION; exports.ROOF_CONSTRUCTION = ROOF_CONSTRUCTION; exports.WALL_CONSTRUCTION = WALL_CONSTRUCTION; exports.CLAIM_TYPES = CLAIM_TYPES; exports.FLOOR = FLOOR; exports.EXCESS = EXCESS; exports.COVER = COVER; exports.TAXAUDIT = TAXAUDIT; exports.LIABILITY = LIABILITY; exports.THEFT_SECURITY = THEFT_SECURITY; exports.THEFT_SECURITY_EXTRA = THEFT_SECURITY_EXTRA; exports.COVERAGESROUTES = COVERAGESROUTES; exports.THEFT_MONEY_AND_GLASS = THEFT_MONEY_AND_GLASS; exports.TYPE_OF_GLASS = TYPE_OF_GLASS; exports.TYPE_OF_PLATE = TYPE_OF_PLATE; exports.FIVE_YEAR_LIABILITY = FIVE_YEAR_LIABILITY; exports.INDEMNITY_PERIOD = INDEMNITY_PERIOD; exports.CATEGORY_OPTIONS = CATEGORY_OPTIONS; exports.FORMTYPES = FORMTYPES; exports.FORMTYPES_WITH_VALUE = FORMTYPES_WITH_VALUE; exports.PREMIUM_QUESTION = PREMIUM_QUESTION; exports.SUMEXCESS = SUMEXCESS; exports.SUMLIABILITY = SUMLIABILITY; exports.TAXAUDITCOVER = TAXAUDITCOVER; exports.YEARLOSS = YEARLOSS; exports.CLAIMTYPES = CLAIMTYPES; exports.CLAIMTYPESLI = CLAIMTYPESLI; exports.AMOUNT = AMOUNT; exports.CLAIMS_IN_LAST_FIVE_YEARS = CLAIMS_IN_LAST_FIVE_YEARS; exports.CLAIMS_IN_LAST_FIVE_YEARS_LI = CLAIMS_IN_LAST_FIVE_YEARS_LI; exports.CLAIMS_BOOLEAN = CLAIMS_BOOLEAN;
//# sourceMappingURL=chunk-4QGOQSDI.js.map