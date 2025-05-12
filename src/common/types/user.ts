import { z } from "zod";

export const UserRolesSchema = z.enum(['Agent', 'User', 'Admin', 'SuperAdmin']);
export type UserRolesTypes = z.infer<typeof UserRolesSchema>;



export interface UserSignupTypes {
    email: string;
    name: string;
    phone: string;
    password: string;
    role: UserRolesTypes;
    address?: string;
    ABN?: string;
    disabled: boolean;
}

export interface UserTypes extends UserSignupTypes {
    _id: string;
    isEmailVerified: boolean;
    isUserVerified: boolean;
    createdAt: Date;
    userId: string;
}

export interface UserSessionTypes extends Omit<UserTypes, 'password' | 'disabled' | 'isEmailVerified' | 'isUserVerified' | "_id"> {
    accessToken: string
    refreshToken: string
    expiresIn: string
}

