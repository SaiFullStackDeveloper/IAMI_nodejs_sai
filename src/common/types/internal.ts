import { CoverageSelectionFormSchema } from "@/api/v1/internal/commission/commissionModel";
import { ActiveUserSchema } from "@/api/v1/internal/stats/statsModel";
import { z } from "zod";

export type ActiveUserTypes = z.infer<typeof ActiveUserSchema>;
export type CommissionTypes = z.infer<typeof CoverageSelectionFormSchema>;