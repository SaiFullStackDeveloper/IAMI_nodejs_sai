import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);


export const GetSignupVerificationSchema = z.object({
    params: z.object({
        email: z.string().email(),
        token: z.string(),
    }),
});
