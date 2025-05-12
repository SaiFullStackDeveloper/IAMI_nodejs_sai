import { pageValidation } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const QuotedModel = z.object({

    query: z.object({
        page: pageValidation,
        name: z.string().optional(),
        num: z.string().optional(),
        createdAt: z.string().optional(),
        effectiveAt: z.string().optional(),
    }).strict(
        {
            message: 'Invalid query parameters'
        }
    ),
})