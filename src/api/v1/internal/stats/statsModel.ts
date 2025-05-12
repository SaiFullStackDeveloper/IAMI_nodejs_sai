import { UserRolesSchema } from "@/common/types/user";
import { pageValidation } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);


export const GetUserSchema = z.object({

    query: z.object({
        role: UserRolesSchema.exclude(['SuperAdmin']),
        email: z.string().email({
            message: 'Invalid email address'
        }).optional(),
        page: pageValidation,
    }).strict(
        {
            message: 'Invalid query parameters'
        }
    ),
})