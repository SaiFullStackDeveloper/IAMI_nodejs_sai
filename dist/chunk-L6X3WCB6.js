"use strict";Object.defineProperty(exports, "__esModule", {value: true});























var _chunk4QGOQSDIjs = require('./chunk-4QGOQSDI.js');

// src/api/v1/forms/insurance/insuranceModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var ManualAddress = _zod.z.object({
  streetNumber: _zod.z.string({
    message: "Street Number is required"
  }).nonempty({
    message: "Street Number is required"
  }),
  streetName: _zod.z.string({
    message: "Street Name is required"
  }),
  // .nonempty({
  //   message: "Street Name is required",
  // }),
  streetType: _zod.z.string({
    message: "Street Type is required"
  }),
  // .nonempty({
  //   message: "Street Type is required",
  // }),
  town: _zod.z.string({
    message: "Town/Suburb is required"
  }).nonempty({
    message: "Town/Suburb is required"
  }),
  state: _zod.z.string({
    message: "State/Territory is required"
  }).nonempty({
    message: "State/Territory is required"
  }),
  postCode: _zod.z.string({
    message: "Post Code is required"
  }).nonempty({
    message: "Post Code is required"
  })
});
var CoverageSelectionFormSchema = _zod.z.object({
  ABN: _zod.z.string().optional(),
  EffectiveDate: _zod.z.string(),
  ExpiryDate: _zod.z.string(),
  BusinessName: _zod.z.string().nonempty({
    message: "Bussiness Name is required"
  }),
  BusinessDescription: _zod.z.string().nonempty({
    message: "Business Description is required"
  }),
  ANZSICCode: _zod.z.string().nonempty({
    message: "ANZSIC Code is required"
  }),
  streetAddress: _zod.z.string().nonempty({
    message: "Street Address is required"
  }),
  isManual: _zod.z.boolean().default(false).optional(),
  address: ManualAddress.optional(),
  AnnualTurnover: _zod.z.string().nonempty({
    message: "Annual Turnover is required"
  }).min(1, {
    message: "Annual Turnover must be greater than 0"
  }),
  NumberOfEmployees: _zod.z.string({
    message: "Number Of Employees is required"
  }).min(1, {
    message: "Number of Employees must be greater than 0"
  }),
  YearStarted: _zod.z.string().min(4, {
    message: "Year Started is required"
  }).max(4, {
    message: "Year Started must be 4 digits"
  }),
  LocationType: _zod.z.enum(_chunk4QGOQSDIjs.LOCATION_TYPE, {
    message: "Location Type is required"
  }),
  TypeOfBusiness: _zod.z.enum(_chunk4QGOQSDIjs.TYPE_OF_BUSINESS, {
    message: "Type Of Business is required"
  }),
  Coverages: _zod.z.array(_zod.z.enum(_chunk4QGOQSDIjs.COVERAGES), {
    message: "Coverages is required"
  })
}).strict({
  message: "Invalid Form Content"
});
var PropertyDetailsFormSchema = _zod.z.object({
  YearBuilt: _zod.z.string().min(4, {
    message: "Year Built is required"
  }).max(4, {
    message: "Year Built must be 4 digits"
  }).refine(
    (value) => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      return Number(value) <= currentYear;
    },
    {
      message: `Year Started must be less than or equal to ${(/* @__PURE__ */ new Date()).getFullYear()}`
    }
  ),
  FloorConstruction: _zod.z.enum(
    Object.keys(_chunk4QGOQSDIjs.FLOOR_CONSTRUCTION),
    {
      message: "Floor Construction is required"
    }
  ),
  RoofConstruction: _zod.z.enum(
    Object.keys(_chunk4QGOQSDIjs.ROOF_CONSTRUCTION),
    {
      message: "Roof Construction is required"
    }
  ),
  WallContruction: _zod.z.enum(
    Object.keys(_chunk4QGOQSDIjs.WALL_CONSTRUCTION),
    {
      message: "Wall Construction is required"
    }
  ),
  EPS: _zod.z.string({
    message: "Sandwich Panel or EPS is required"
  }).min(1, {
    message: "Sandwich Panel or EPS is required"
  }).refine(
    (value) => {
      return Number(value) <= 100;
    },
    {
      message: "Sandwich Panel or EPS cannot be greater than 100."
    }
  ),
  NumberOfStories: _zod.z.string().min(1, {
    message: "Number Of Stories is required"
  }).refine(
    (value) => {
      return Number(value) <= 20;
    },
    {
      message: "Number Of Stories cannot be greater than 100."
    }
  ),
  HeritageListing: _zod.z.enum(["yes", "no"], {
    message: "Heritage Listing is required"
  }),
  LowestFloorYouOccupy: _zod.z.enum(Object.keys(_chunk4QGOQSDIjs.FLOOR), {
    message: "Lowest Floor You Occupy is required"
  }),
  InterestedParty: _zod.z.string().optional()
}).strict({
  message: "Invalid Form Content"
});
var BusinessAndContentsSchema = _zod.z.object({
  BuildingLimitAndExcess_Insured: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Sum Insured"),
  BuildingLimitAndExcess_Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  ContentsLimitAndExcess_Insured: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Sum Insured"),
  ContentsLimitAndExcess_Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  StockLimitAndExcess_Insured: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Sum Insured"),
  StockLimitAndExcess_Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  BuildingAndContentClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS)
}).strict({
  message: "Invalid Form Content"
}).superRefine((data, ctx) => {
  const claimHistory = data.BuildingAndContentClaimHistory;
  const claims = data.Claims;
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var EquipmentBreakdownSchema = _zod.z.object({
  BlanketCover: _zod.z.enum(_chunk4QGOQSDIjs.COVER, {
    message: "Select a Blanket Cover"
  }),
  DeteriorationOfStock: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Deterioration Of Stock", true),
  IncreasedCostOfWorking: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Increased Cost Of Working", true),
  NumberOfMachines: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Number Of Machines"),
  MachineryBreakdownExcess: _chunk4QGOQSDIjs.SUMEXCESS.optional(),
  Computers: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Computers", true),
  PortableElectronicEquipment: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Portable Electronic Equipment", true),
  OtherElectronicEquipment: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Other Electronic Equipment", true),
  ElectronicEquipmentExcess: _chunk4QGOQSDIjs.SUMEXCESS.optional(),
  EquipmentBreakdownClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS)
}).strict({
  message: "Invalid Form Content"
}).superRefine((data, ctx) => {
  const claimHistory = data.EquipmentBreakdownClaimHistory;
  const claims = data.Claims;
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var TheftSchema = _zod.z.object({
  TheftTobaccoExcluding: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Theft (Tobacco Excluding)"),
  TheftTobacco: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Theft (Tobacco)"),
  TheftExcess: _chunk4QGOQSDIjs.SUMEXCESS,
  TheftSecurity: _zod.z.enum(
    Object.keys(_chunk4QGOQSDIjs.THEFT_SECURITY),
    {
      message: "Theft Security is required"
    }
  ),
  TheftSecurityExtra: _zod.z.array(
    _zod.z.enum(Object.keys(_chunk4QGOQSDIjs.THEFT_SECURITY_EXTRA), {
      message: "Theft Security is required"
    })
  ).optional()
});
var MoneySchema = _zod.z.object({
  MoneyOnPremisesDuringBusinessHours: _chunk4QGOQSDIjs.AMOUNT.call(void 0, 
    "Money On Premises During Business Hours",
    true
  ),
  MoneyOnPremisesOutsideBusinessHours: _chunk4QGOQSDIjs.AMOUNT.call(void 0, 
    "Money On Premises Outside Business Hours",
    true
  ),
  MoneyOnPremisesInALockedSafe: _chunk4QGOQSDIjs.AMOUNT.call(void 0, 
    "Money On Premises In A Locked Safe",
    true
  ),
  MoneyInTransit: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Money In Transit", true),
  MoneyInAPrivateResidence: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Money In A Private Residence", true),
  MoneyExcess: _chunk4QGOQSDIjs.SUMEXCESS.optional()
});
var GlassSchema = _zod.z.object({
  IlluminatedSignsSumInsured: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Illuminated Signs Sum Insured", true),
  Percentage: _zod.z.string({
    message: "Percentage of Glass Above the Ground Floor is required"
  }).min(1, {
    message: "Percentage of Glass Above the Ground Floor is required"
  }).refine(
    (value) => {
      return Number(value) <= 100;
    },
    {
      message: "Percentage of Glass Above the Ground Floor cannot be greater than 100."
    }
  ).refine(
    (value) => {
      return Number(value) > 0;
    },
    {
      message: "Percentage of Glass Above the Ground Floor cannot be 0."
    }
  ),
  MoneyExcess: _chunk4QGOQSDIjs.SUMEXCESS.optional(),
  TypeOfGlass: _zod.z.enum(Object.keys(_chunk4QGOQSDIjs.TYPE_OF_GLASS), {
    message: "Type of glass is required"
  }),
  TypeOfPlate: _zod.z.enum(Object.keys(_chunk4QGOQSDIjs.TYPE_OF_PLATE), {
    message: "Plate or Non-Plate Glass is required"
  })
});
var TheftMoneyAndGlassSchema = _zod.z.object({
  Sections: _zod.z.array(_zod.z.enum(_chunk4QGOQSDIjs.THEFT_MONEY_AND_GLASS), {
    message: "Please select at least one coverage."
  }).nonempty({
    message: "Please select at least one coverage."
  }),
  Theft: TheftSchema.optional(),
  // Default to optional here
  Money: MoneySchema.optional(),
  // Default to optional here
  Glass: GlassSchema.optional(),
  // Default to optional here
  InterestedParty: _zod.z.string().optional(),
  TheftMoneyAndGlassClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS)
}).strict(
  {
    message: "Invalid Form Content"
  }
).superRefine((data, ctx) => {
  const claimHistory = data.TheftMoneyAndGlassClaimHistory;
  const claims = data.Claims;
  const sections = data.Sections;
  const money = data.Money;
  const allFieldsEmpty = money && Object.values(money).every(
    (value) => value === void 0 || value === null || value === ""
  );
  if (sections.includes("Money") && allFieldsEmpty) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "Please enter at least one of the Sum Insured value In Money Section.",
      path: ["Sections"]
    });
  }
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var BusinessLiabilityCoverageSchema = _zod.z.object({
  LimitsOfLiability: _chunk4QGOQSDIjs.SUMLIABILITY,
  AnnualWages: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Annual Wages"),
  Property: _chunk4QGOQSDIjs.AMOUNT.call(void 0, 
    "Property in Your Physical or Legal Care, Custody or Control"
  ),
  Contractor: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Contractor or Labour Hire Payments"),
  TaxAudit: _chunk4QGOQSDIjs.TAXAUDITCOVER,
  Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  InterestedParty: _zod.z.string().optional(),
  BuildingLiabilityClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS_LI)
}).strict({
  message: "Invalid Form Content"
}).superRefine((data, ctx) => {
  const claimHistory = data.BuildingLiabilityClaimHistory;
  const claims = data.Claims;
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var BusinessInterruptionCoverageSchema = _zod.z.object({
  IndemnityPeriod: _zod.z.enum(
    Object.keys(_chunk4QGOQSDIjs.INDEMNITY_PERIOD),
    {
      message: "Indemnity Period is required"
    }
  ),
  AnnualGrossProfit: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Annual Gross Profit"),
  AdditionalIncreaseCostOfWork: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Additional Increase Cost of Work", true),
  ClaimPreparationCost: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Claim Preparation Cost", true),
  Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  BusinessInterruptionClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS),
  InterestedParty: _zod.z.string().optional()
}).strict({
  message: "Invalid Form Content"
}).superRefine((data, ctx) => {
  const claimHistory = data.BusinessInterruptionClaimHistory;
  const claims = data.Claims;
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var PortableBusinessContentsCoverageSchema = _zod.z.object({
  BlanketCoverContent: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Blanket Cover Content"),
  BlanketCoverStock: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Blanket Cover Stock"),
  Excess: _chunk4QGOQSDIjs.SUMEXCESS,
  InterestedParty: _zod.z.string().optional(),
  PortableBusinessClaimHistory: _chunk4QGOQSDIjs.CLAIMS_BOOLEAN,
  Claims: _zod.z.array(_chunk4QGOQSDIjs.CLAIMS_IN_LAST_FIVE_YEARS),
  PortableSpecifiedItems: _zod.z.array(
    _zod.z.object({
      category: _zod.z.enum(Object.keys(_chunk4QGOQSDIjs.CATEGORY_OPTIONS), {
        message: "Category is required"
      }).optional(),
      description: _zod.z.string().optional(),
      value: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Value", true)
    })
  ).optional()
}).strict({
  message: "Invalid Form Content"
}).superRefine((data, ctx) => {
  const claimHistory = data.PortableBusinessClaimHistory;
  const claims = data.Claims;
  if (claimHistory === "yes" && claims.length === 0) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "At least one claim is required when claim history is yes",
      path: ["Claims"]
    });
  }
});
var InsuranceFormGetSchema = _zod.z.object({
  query: _zod.z.object({
    FormType: _zod.z.enum(_chunk4QGOQSDIjs.FORMTYPES, {
      message: "Form Type is required"
    }),
    id: _zod.z.string().optional()
  }).strict({
    message: "Invalid Form Content"
  })
});
var InsuranceFormStatusSchema = _zod.z.object({
  query: _zod.z.object({
    id: _zod.z.string().optional()
  }).strict({
    message: "Invalid Form Content"
  })
});
var InsuranceFormPostSchema = _zod.z.object({
  body: _zod.z.union([
    CoverageSelectionFormSchema,
    PropertyDetailsFormSchema,
    BusinessAndContentsSchema,
    EquipmentBreakdownSchema,
    TheftMoneyAndGlassSchema,
    BusinessLiabilityCoverageSchema,
    BusinessInterruptionCoverageSchema,
    PortableBusinessContentsCoverageSchema
  ]),
  query: _zod.z.object({
    FormType: _zod.z.enum(_chunk4QGOQSDIjs.FORMTYPES, {
      message: "Form Type is required"
    }),
    id: _zod.z.string().optional()
  }).strict()
}).superRefine((data, ctx) => {
  const form = data.query.FormType;
  const content = data.body;
  if (form === "premium-summary" || form === "quote-summary") {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "Invalid Form Type"
    });
  }
  if (!_chunk4QGOQSDIjs.FORMTYPES.includes(form)) {
    ctx.addIssue({
      code: _zod.z.ZodIssueCode.custom,
      message: "Form Type is required"
    });
  }
  const all = {
    "coverage-selection": CoverageSelectionFormSchema,
    "property-details": PropertyDetailsFormSchema,
    "business-and-contents": BusinessAndContentsSchema,
    "equipment-breakdown": EquipmentBreakdownSchema,
    "theft-money-and-glass": TheftMoneyAndGlassSchema,
    "business-liability-coverage": BusinessLiabilityCoverageSchema,
    "business-interruption-coverage": BusinessInterruptionCoverageSchema,
    "portable-business-contents-coverage": PortableBusinessContentsCoverageSchema
  };
  if (form) {
    const result = all[form].safeParse(content);
    if (!result.success) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "Invalid Form Content"
      });
    }
  }
});
var FURTHER_QUESTIONS_SCHEMA = _zod.z.object({
  id: _zod.z.number(),
  question: _zod.z.string(),
  answer: _zod.z.enum(["yes", "no"], {
    message: "Answer is required"
  })
});
var FurtherAndEndorsementsQuestionsSchema = _zod.z.object({
  DisclaimerAgreedTag: _zod.z.boolean().optional(),
  BusinessAndContents: _zod.z.array(FURTHER_QUESTIONS_SCHEMA).optional(),
  TheftMoneyAndGlass: _zod.z.array(FURTHER_QUESTIONS_SCHEMA).optional(),
  BusinessLiabilityCoverage: _zod.z.array(FURTHER_QUESTIONS_SCHEMA).optional()
}).strict({
  message: "Invalid Form Content"
});
var InsuranceFormCreateQuote = _zod.z.object({
  body: FurtherAndEndorsementsQuestionsSchema,
  query: _zod.z.object({
    FormType: _zod.z.enum(["further-and-endorsements-questions"], {
      message: "Form Type is required"
    })
  }).strict({
    message: "Invalid Form Content"
  })
});
var PREMIUM_QUESTIONS_SCHEMA = _zod.z.object({
  id: _zod.z.string(),
  question: _zod.z.string(),
  answer: _zod.z.enum(["yes", "no"], {
    message: "Answer is required"
  })
});
var PremiumSummarySchema = _zod.z.object({
  DeclarationQuestions: _zod.z.array(PREMIUM_QUESTIONS_SCHEMA),
  Exemption: _zod.z.array(PREMIUM_QUESTIONS_SCHEMA),
  Liability: _zod.z.string({
    message: "Liability is required"
  }).refine(
    (value) => {
      return Number(value) <= 100;
    },
    {
      message: "Liability cannot be greater than 100."
    }
  ).optional(),
  Property: _zod.z.string({
    message: "Property is required"
  }).refine(
    (value) => {
      return Number(value) <= 100;
    },
    {
      message: "Property cannot be greater than 100."
    }
  ).optional(),
  BrokerFees: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Broker Fees")
});
var InsuranceFormFullQuote = _zod.z.object({
  body: PremiumSummarySchema,
  query: _zod.z.object({
    FormType: _zod.z.enum(["premium-summary"], {
      message: "Form Type is required"
    })
  }).strict({
    message: "Invalid Form Content"
  })
});
var InsuranceFormCloneModel = _zod.z.object({
  query: _zod.z.object({
    id: _zod.z.string({ message: "ID is required" })
  }).strict({ message: "Invalid Form Content" })
});
var InsuranceFormDiscardModel = _zod.z.object({
  query: _zod.z.object({
    id: _zod.z.string({ message: "ID is required" })
  }).strict({ message: "Invalid Form Content" })
});



















exports.CoverageSelectionFormSchema = CoverageSelectionFormSchema; exports.PropertyDetailsFormSchema = PropertyDetailsFormSchema; exports.BusinessAndContentsSchema = BusinessAndContentsSchema; exports.EquipmentBreakdownSchema = EquipmentBreakdownSchema; exports.TheftMoneyAndGlassSchema = TheftMoneyAndGlassSchema; exports.BusinessLiabilityCoverageSchema = BusinessLiabilityCoverageSchema; exports.BusinessInterruptionCoverageSchema = BusinessInterruptionCoverageSchema; exports.PortableBusinessContentsCoverageSchema = PortableBusinessContentsCoverageSchema; exports.InsuranceFormGetSchema = InsuranceFormGetSchema; exports.InsuranceFormStatusSchema = InsuranceFormStatusSchema; exports.InsuranceFormPostSchema = InsuranceFormPostSchema; exports.FurtherAndEndorsementsQuestionsSchema = FurtherAndEndorsementsQuestionsSchema; exports.InsuranceFormCreateQuote = InsuranceFormCreateQuote; exports.PremiumSummarySchema = PremiumSummarySchema; exports.InsuranceFormFullQuote = InsuranceFormFullQuote; exports.InsuranceFormCloneModel = InsuranceFormCloneModel; exports.InsuranceFormDiscardModel = InsuranceFormDiscardModel;
//# sourceMappingURL=chunk-L6X3WCB6.js.map