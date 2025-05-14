import { AccessToken, ForgotToken, RefreshToken, SignUpToken } from "@/common/config/jwt";
import { emailQueue } from "@/common/config/queue";
import { findUser, isUserExist, updateUserPassword, createUser, getAllUsers } from "@/common/models/mongoDB/user";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { UserSignupTypes } from "@/common/types/user";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { expireIn } from "@/common/utils/date";
import { genSalt, hash, compare } from 'bcrypt';
import { z } from "zod";
import { EmployeeRegistrationSchema, getAgentsByStatus, ResetSchema, updateAdminProfile, updateAgentApprovalStatus, updateSuperAdminProfile, updateUserProfile } from "./authModel";
import { userSignupRedisRepository } from "@/common/models/redis/user";
import { redis } from "@/common/config/redis";

const signupCache = new Map<string, any>();
const forgotCache = new Map<string, any>();
const sessionCache = new Map<string, any>();

export const AuthSignUpService = async (req: UserSignupTypes) => {
    try {
        const user = await findUser(req.email);
        if (user) {
            return ServiceResponse.failure("User already exists", null, StatusCodes.UNAUTHORIZED);
        }

        const { password, ...rest } = req;
        const token = await SignUpToken('Encrypt', { email: rest.email });
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const preparedData = {
            email: req.email,  // Email is the primary identifier
            name: req.name,
            phone: req.phone,
            role: req.role,
            address: req.address,
            ABN: req.ABN,
            isEmailVerified: false,  // Default value
            password: hashedPassword, // Password will be hashed
            token: String(token),   // Token as a string
            disabled: false, // Include the disabled flag
        };
        await redis.set('tests:key', 'hello world');

        redis.set(`Signup:${req.email}`, JSON.stringify(preparedData), {
            EX: 60 * 60
        });

        // const signupKey = `Signup:${req.email}`;  // Using email as the key

        // await userSignupRedisRepository.save({
        //     key: signupKey,   // Store the key for reference
        //     email: req.email,  // Email is the primary identifier
        //     name: req.name,
        //     phone: req.phone,
        //     role: req.role,
        //     address: req.address,
        //     ABN: req.ABN,
        //     isEmailVerified: false,
        //     password: hashedPassword,
        //     token: String(token),
        //     disabled: false, // Include the disabled flag
        // });


        // signupCache.set(req.email, {
        //     ...rest,
        //     password: hashedPassword,
        //     token: String(token),
        // });

        // emailQueue.add(
        //     {
        //         ...req,
        //         type: "Signup",
        //         token: String(token),
        //     },
        //     {
        //         removeOnComplete: true,
        //         attempts: 3,
        //         jobId: req.email,
        //     }
        // );


        emailQueue.add({
            email: req.email,
            name: req.name,
            type: "Signup",
            token: String(token),
        }, {
            removeOnComplete: true,
            attempts: 3,
            jobId: req.email,
        });

        return ServiceResponse.success("Successfully sent login link to your email", null, StatusCodes.CREATED);
    } catch (error) {
        logger.error(`AuthSignUpService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while signing up users.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    };

}

export const AuthLoginService = async (req: { email: string, password: string }) => {
    try {
        const user = await findUser(req.email);
        if (!user) {
            return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
        }

        if (user.disabled) {
            return ServiceResponse.failure("Your account is disabled! Please contact support", null, StatusCodes.UNAUTHORIZED);
        }

        if (user.role === 'Agent' && !user.isUserVerified) {
            return ServiceResponse.failure("Your Agent account is not approved yet", null, StatusCodes.UNAUTHORIZED);
        }

        const isPasswordValid = await compare(req.password, user.password);
        if (!isPasswordValid) {
            return ServiceResponse.failure("Invalid Password", null, StatusCodes.UNAUTHORIZED);
        }

        const value = {
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
            address: user.address,
            userId: user.userId,
            createdAt: user.createdAt,
        };

        const newAccessToken = await AccessToken('Encrypt', { email: value.email });
        const newRefreshToken = await RefreshToken('Encrypt', { email: value.email });

        const session = {
            ...value,
            accessToken: String(newAccessToken),
            refreshToken: String(newRefreshToken),
            expiresIn: expireIn(2),
        };

        sessionCache.set(req.email, session);

        return ServiceResponse.success("Successfully logged in", session, StatusCodes.CREATED);
    } catch (error) {
        logger.error(`AuthLoginService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while logging in users.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const AuthLoginRefreshService = async (req: { email: string, token: string }) => {
    try {
        const isUserSessionExist = sessionCache.get(req.email);

        if (!isUserSessionExist || isUserSessionExist.refreshToken !== req.token) {
            return ServiceResponse.failure("User Doesn't Exist", null, StatusCodes.UNAUTHORIZED);
        }

        const { accessToken, refreshToken, ...user } = isUserSessionExist;
        const newAccessToken = await AccessToken('Encrypt', { email: user.email });
        const newRefreshToken = await RefreshToken('Encrypt', { email: user.email });

        const newSession = {
            ...user,
            accessToken: String(newAccessToken),
            refreshToken: String(newRefreshToken),
            expiresIn: expireIn(2),
        };

        sessionCache.set(req.email, newSession);

        return ServiceResponse.success("Login successfully refreshed", newSession, StatusCodes.OK);
    } catch (error) {
        logger.error(`AuthLoginRefreshService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while refreshing login of users.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const AuthForgotService = async (req: { email: string }) => {
    try {
        if (forgotCache.has(req.email)) {
            return ServiceResponse.success("Forgot link already sent to you successfully", null, StatusCodes.OK);
        }

        const user = await isUserExist(req.email);
        if (!user) {
            return ServiceResponse.failure("User not found", null, StatusCodes.UNAUTHORIZED);
        }

        const token = await ForgotToken('Encrypt', { email: req.email });

        forgotCache.set(req.email, {
            email: req.email,
            createdAt: new Date(),
            token: String(token),
        });

        emailQueue.add(
            {
                ...req,
                name: user.name,
                type: "Forgot",
                token: String(token),
            },
            {
                removeOnComplete: true,
                attempts: 3,
                jobId: req.email,
            }
        );

        return ServiceResponse.success("Successfully sent forgot link to your email", null, StatusCodes.CREATED);
    } catch (error) {
        logger.error(`AuthForgotService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while sending forgot email.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const AuthResetService = async (body: z.infer<typeof ResetSchema>['body']) => {
    try {
        const { email, password, token } = body;
        const forgotData = forgotCache.get(email);

        if (!forgotData || forgotData.token !== token) {
            return ServiceResponse.failure("Unauthorized", null, StatusCodes.UNAUTHORIZED);
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        await updateUserPassword(email, hashedPassword);
        forgotCache.delete(email);

        return ServiceResponse.success("Password Reset Successfully", null, StatusCodes.CREATED);
    } catch (error) {
        logger.error(`AuthResetService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while resetting password.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }

};

export const AuthRegisterEmployeeService = async (body: z.infer<typeof EmployeeRegistrationSchema>['body']) => {
    try {
        const existingUser = await findUser(body.email);
        if (existingUser) {
            return ServiceResponse.failure("Employee already exists", null, StatusCodes.CONFLICT);
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(body.password, salt);

        const userData = {
            email: body.email,
            name: body.name,
            phone: body.phone,
            address: body.address,
            password: hashedPassword,
            role: "Admin" as const, // 👈 Key fix here
            isUserVerified: false,
            isEmailVerified: true,
        };


        await createUser(userData);

        return ServiceResponse.success("Employee registered successfully", null, StatusCodes.CREATED);
    } catch (error) {
        logger.error(`AuthRegisterEmployeeService: ${(error as Error).message}`);
        return ServiceResponse.failure("An error occurred while registering the employee.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

//   // New Service for Agent Customer List API
// export const GetAgentCustomerListService = async (agentId: string) => {
//     try {
//         // Query to fetch all users linked to this agent (assuming 'assignedAgent' is the field in User model)
//         const customers = await User.find({ assignedAgent: agentId }).exec();

//         if (!customers || customers.length === 0) {
//             return { status: "error", message: "No customers found for this agent." };
//         }

//         return { status: "success", customers };
//     } catch (error) {
//         logger.error("Error fetching customers for agent:", error);
//         return { status: "error", message: "Internal server error." };
//     }
// };

export const GetAllUsersListService = async (page: number, limit: number = 10): Promise<ServiceResponse<any>> => {
    try {
        // Get all users with pagination
        const users = await getAllUsers(page, limit);

        // Return the service response with the required format
        return {
            success: true,
            statusCode: 200,
            // status: "success",
            data: users,
            message: "Success"
        };
    } catch (error) {
        console.error("Error fetching all users:", error);
        return {
            success: false,
            statusCode: 500,
            // status: "error",
            message: "Internal server error.",
            data: null

        };
    }
};

export const AuthGetAgentsService = async (status: string = 'all') => {
    try {
        const validStatuses = ['approved', 'pending', 'all'];
        const finalStatus = validStatuses.includes(status) ? status as 'approved' | 'pending' | 'all' : 'all';

        const agents = await getAgentsByStatus(finalStatus);

        return {
            success: true,
            statusCode: 200,
            message: "Agents fetched successfully",
            data: agents
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Failed to fetch agents",
            data: null,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};


export const AuthApproveAgentService = async (email: string, isUserVerified: boolean) => {
    try {
        const result = await updateAgentApprovalStatus(email, isUserVerified);

        if (result.modifiedCount === 0) {
            return {
                success: false,
                statusCode: 404,
                message: 'Agent not found or already in desired state',
                data: null
            };
        }

        return {
            success: true,
            statusCode: 200,
            message: `Agent ${isUserVerified ? 'approved' : 'rejected'} successfully`,
            data: null
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Failed to update agent status',
            data: null,
            error: error instanceof Error ? error.message : String(error)
        };
    }

};


export const AuthUpdateProfileService = async (updateData: any) => {
    try {
        const { email, ...fieldsToUpdate } = updateData;

        const { password, ...rest } = fieldsToUpdate;

        let updatedData = { ...rest };

        if (password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await updateUserProfile(email, updatedData);

        return {
            success: true,
            statusCode: 200,
            message: "User profile updated successfully",
            data: updatedUser
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Profile update failed",
            data: null,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};


export const AuthUpdateAgentProfileService = async (updateData: any) => {
    try {
        const { email, ...fieldsToUpdate } = updateData;

        const { password, ...rest } = fieldsToUpdate;
        let updatedData = { ...rest };

        if (password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            updatedData.password = hashedPassword;
        }

        const updatedUser = await updateUserProfile(email, updatedData);

        return {
            success: true,
            statusCode: 200,
            message: "Agent profile updated successfully",
            data: updatedUser
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Agent profile update failed",
            data: null,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};

export const AuthUpdateAdminProfileService = async (updateData: any) => {
    try {
        const { email, password, ...fieldsToUpdate } = updateData;

        // Check if password exists in the request
        if (password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            fieldsToUpdate.password = hashedPassword; // Update the password with the hashed one
        }

        // Update the admin profile in the database
        const updatedAdmin = await updateAdminProfile(email, fieldsToUpdate);

        return {
            success: true,
            statusCode: 200,
            message: "Admin profile updated successfully",
            data: updatedAdmin
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Failed to update admin profile",
            error: error instanceof Error ? error.message : String(error)
        };
    }
};

export const AuthUpdateSuperAdminProfileService = async (updateData: any) => {
    try {
        const { email, ...fieldsToUpdate } = updateData;

        const { password, ...rest } = fieldsToUpdate;

        let updatedData = { ...rest };

        if (password) {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            updatedData = { ...updatedData, password: hashedPassword };
        }

        // Assuming updateSuperAdminProfile is a function that updates Super Admin details in the database
        const updatedSuperAdmin = await updateSuperAdminProfile(email, updatedData);
        if (updatedSuperAdmin) {
            return {
                success: true,
                statusCode: 200,
                message: 'Super Admin profile updated successfully',
                data: updatedSuperAdmin
            };
        }
        return {
            success: false,
            statusCode: 400,
            message: 'Only SuperAdmin details can be udpated...',
            data: updatedSuperAdmin
        };
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Failed to update Super Admin profile',
            data: null,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};