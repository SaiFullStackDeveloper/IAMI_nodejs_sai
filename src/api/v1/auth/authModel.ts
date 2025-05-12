import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import parsePhoneNumberFromString from 'libphonenumber-js';
import { UserRolesSchema, UserTypes } from "@/common/types/user";
import { userModel } from "@/common/models/mongoDB/user";

extendZodWithOpenApi(z);


export const SignUpSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        ),
        name: z.string({ required_error: 'Name is required' }),
        password: z.string({ required_error: 'Password is required' }).min(8, {
            message: "Password must be at least 8 characters"
        }),
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
        role: UserRolesSchema.exclude(['SuperAdmin', 'Admin']),
        address: z.string().min(10).optional(),
        ABN: z.string().optional()
    }).strict()
        .superRefine((data, ctx) => {
            if (data.role === 'Agent' && !data.address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Address is required',
                    path: ['address'],
                });
            }

            if (data.role === 'User' && data.address) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Address is not required',
                    path: ['address'],
                });
            }

            if ((data.role === 'User') && data.ABN) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'ABN is not required',
                    path: ['ABN']
                })

            }

        })
})


export const LoginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        ),
        password: z.string({ required_error: 'Password is required' }).nonempty({
            message: 'Password is required'
        }).min(8, {
            message: "Password must be at least 8 characters"
        })
    }).strict()
})

export const LoginRefreshSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        ),
        token: z.string().min(20)
    }).strict()
})


export const ForgotSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        )
    }).strict()
})

export const ResetSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(
            {
                message: 'Invalid email address'
            }
        ),
        password: z.string({ required_error: 'Password is required' }).min(8, {
            message: "Password must be at least 8 characters"
        }),
        token: z.string().min(20)
    }).strict()
})

//  POST: Employee Registration API, which only the Super Admin is allowed to call

export const EmployeeRegistrationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    address: z.string(),
    password: z.string().min(6),
    ABN: z.string().optional()
  }),
});

export const getAgentsByStatus = async (status: 'approved' | 'pending' | 'all') => {
    const filter: Record<string, any> = { role: 'Agent' };

    if (status === 'approved') {
        filter.isUserVerified = true;
    } else if (status === 'pending') {
        filter.isUserVerified = false;
    }

    return await userModel.find(filter, '-password -__v');
};

export const updateAgentApprovalStatus = async (email: string, isUserVerified: boolean) => {
    return await userModel.updateOne(
        { email, role: 'Agent' },
        { $set: { isUserVerified } }
    );
};

export const updateUserProfile = async (email: string, updateFields: Partial<UserTypes>) => {
    const updated = await userModel.findOneAndUpdate(
        { email },
        { $set: updateFields },
        { new: true, projection: '-password -__v' }
    );

    return updated;
};

export const updateAgentProfile = async (email: string, updateFields: any) => {
    return await userModel.findOneAndUpdate({ email }, updateFields, { new: true, projection: '-password -__v' });
}

export const updateAdminProfile = async (email: string, fieldsToUpdate: any) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $set: fieldsToUpdate },
            { new: true } // Return the updated document
        );

        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user profile');
    }
};


export const updateSuperAdminProfile = async (email: string, updateData: any) => {
    try {
        const updatedSuperAdmin = await userModel.findOneAndUpdate(
            { email: email, role: 'SuperAdmin' },
            { $set: updateData },
            { new: true }
        );
        return updatedSuperAdmin;
    } catch (error) {
        throw new Error('Error updating Super Admin profile');
    }
};