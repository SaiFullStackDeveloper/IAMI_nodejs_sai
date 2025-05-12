import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import { UserSessionTypes } from "@/common/types/user";
import { z } from "zod";
import { CreateUserSchema } from "./settingsModel";
import { userSignupRedisRepository } from "@/common/models/redis/user";
import { createUser, findUser } from "@/common/models/mongoDB/user";
import { generatePassword } from "@/common/utils/common";
import { genSalt, hash } from "bcrypt";
import { redis } from "@/common/config/redis";


export const SettingsCreateUserService = async (user: UserSessionTypes, body: z.infer<typeof CreateUserSchema>['body']) => {
    try {
        const isUserExist = await userSignupRedisRepository.fetch(body.email);

        if (isUserExist.email) {
            await userSignupRedisRepository.remove(body.email);
        }

        const userAccount = await findUser(body.email);

        if (userAccount) {
            return ServiceResponse.failure(
                "User already exists",
                null,
                StatusCodes.UNAUTHORIZED
            )
        }

        if (user.role === 'Admin' && body.role === 'Admin') {
            return ServiceResponse.failure(
                "Admin can't create another admin",
                null,
                StatusCodes.UNAUTHORIZED
            )
        }


        const user_password = generatePassword(10)
        const salt = await genSalt(10);
        const hashedPassword = await hash(user_password, salt);

        await createUser({
            ...body,
            isEmailVerified: true,
            password: hashedPassword,
            isUserVerified: true,
        })

        await redis.del(`Stats:Users:${body.role}`);

        return ServiceResponse.success(`Successfully ${body.role} created`, null, StatusCodes.CREATED);
    }
    catch (error) {
        const errorMessage = `SettingsCreateUserService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}