import { BusinessAndContentsSchema, BusinessInterruptionCoverageSchema, BusinessLiabilityCoverageSchema, CoverageSelectionFormSchema, EquipmentBreakdownSchema, FurtherAndEndorsementsQuestionsSchema, PortableBusinessContentsCoverageSchema, PremiumSummarySchema, PropertyDetailsFormSchema, TheftMoneyAndGlassSchema } from "@/api/v1/forms/insurance/insuranceModel";
import { CLAIM_TYPES, CLAIMS_IN_LAST_FIVE_YEARS, CLAIMS_IN_LAST_FIVE_YEARS_LI } from "@/api/v1/forms/insurance/insuranceStaticData";
import { z } from "zod";

export interface InsuranceStatusTypes {
    title: string;
    status: "completed" | "in-progress" | "pending";
    query: string;
    disabled: boolean;
    children?: InsuranceStatusTypes[];
}

export type CoverageSelectionFormTypes = z.infer<typeof CoverageSelectionFormSchema>;
export type CoverageTypes = z.infer<typeof CoverageSelectionFormSchema>['Coverages'];

export type PropertyDetailsFormTypes = z.infer<typeof PropertyDetailsFormSchema>
export type BusinessAndContentsFormTypes = z.infer<typeof BusinessAndContentsSchema>;
export type EquipmentBreakdownFormTypes = z.infer<typeof EquipmentBreakdownSchema>;
export type TheftMoneyAndGlassFormTypes = z.infer<typeof TheftMoneyAndGlassSchema>;

export type BusinessLiabilityCoverageFormTypes = z.infer<typeof BusinessLiabilityCoverageSchema>;
export type BusinessInterruptionCoverageFormTypes = z.infer<typeof BusinessInterruptionCoverageSchema>;
export type PortableBusinessContentsCoverageFormTypes = z.infer<typeof PortableBusinessContentsCoverageSchema>;

export type FurtherAndEndorsementsQuestionsFormTypes = z.infer<typeof FurtherAndEndorsementsQuestionsSchema>;
export type PremiumSummaryFormTypes = z.infer<typeof PremiumSummarySchema>;

export type InsuranceFormCreateQuoteDataTypes = {
    'coverage-selection': CoverageSelectionFormTypes
    // Property Covers
    'property-details': PropertyDetailsFormTypes;
    'business-and-contents': BusinessAndContentsFormTypes;
    'equipment-breakdown': EquipmentBreakdownFormTypes;
    'theft-money-and-glass': TheftMoneyAndGlassFormTypes;
    // Policy Covers
    'business-liability-coverage': BusinessLiabilityCoverageFormTypes;
    'business-interruption-coverage': BusinessInterruptionCoverageFormTypes;
    'portable-business-contents-coverage': PortableBusinessContentsCoverageFormTypes;
    // Questions
    'further-and-endorsements-questions': FurtherAndEndorsementsQuestionsFormTypes;
    'premium-summary': PremiumSummaryFormTypes;
}


export type ClaimTypes = z.infer<typeof CLAIMS_IN_LAST_FIVE_YEARS> | z.infer<typeof CLAIMS_IN_LAST_FIVE_YEARS_LI>;