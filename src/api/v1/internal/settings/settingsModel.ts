import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import parsePhoneNumberFromString from 'libphonenumber-js';
import { UserRolesSchema } from "@/common/types/user";

extendZodWithOpenApi(z);


export const CreateUserSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        ),
        name: z.string({ required_error: 'Name is required' }),
        phone: z.string({ required_error: 'Phone number is required' }).transform((arg, ctx) => {
            const phone = parsePhoneNumberFromString(arg, {
                // set this to use a default country when the phone number omits country code
                defaultCountry: 'AU',

                // set to false to require that the whole string is exactly a phone number,
                // otherwise, it will search for a phone number anywhere within the string
                extract: false,
            });

            // when it's good
            if (phone && phone.isValid()) {
                return phone.number;
            }

            // when it's not
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid phone number',
            });
            return z.NEVER;
        }),
        role: UserRolesSchema.exclude(['SuperAdmin', 'User']),
        address: z.string().min(10).optional(),
        ABN: z.string().optional(),
    }).strict()
        .superRefine((data, ctx) => {
            if (data.role === 'Agent' && !data.address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Address is required',
                    path: ['address'],
                });
            }

            if (data.role === 'Admin' && data.ABN) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'ABN is not required',
                    path: ['ABN'],
                })
            }
        })
})