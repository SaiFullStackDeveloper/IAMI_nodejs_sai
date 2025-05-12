import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import { UserSessionTypes } from "@/common/types/user";
import { z } from "zod";
import { GetUserSchema } from "./statsModel";
import { getUserByRole, getUserByRoleFilterUsingEmail, userModel } from "@/common/models/mongoDB/user";
import { redis } from "@/common/config/redis";



export const StatsGetUserService = async (query: z.infer<typeof GetUserSchema>['query']) => {
    try {

        const page = Number(query.page || "1");
        const role = query.role;
        const email = query.email;
        const limit = 10

        if (email) {
            const isUserWithEmailExist = await redis.get(`Stats:Users:${query.role}:${email}`);
            let data = isUserWithEmailExist ? JSON.parse(isUserWithEmailExist) : {};

            if (isUserWithEmailExist) {
                return ServiceResponse.success(`Successfully Get ${query.role}`, {
                    "totalCounts": 1,
                    "totalPages": 1,
                    "currentPage": 1,
                    "data": data ? data : [],
                }, StatusCodes.OK);
            }

            const user = await getUserByRoleFilterUsingEmail(query.role, email);

            await redis.set(`Stats:Users:${query.role}:${email}`, JSON.stringify(user), {
                EX: 2 * 24 * 60 * 60
            })
            return ServiceResponse.success(`Successfully Get ${query.role}`, {
                "totalCounts": 1,
                "totalPages": 1,
                "currentPage": 1,
                "data": user ? user : [],
            }, StatusCodes.OK);
        }


        const isUsersExist = await redis.get(`Stats:Users:${query.role}`);
        let usersData = isUsersExist ? JSON.parse(isUsersExist) : {};

        const all_pages = usersData['totalPages'];
        const all_data = usersData['data'] ? usersData['data'][page] : null;


        if (isUsersExist && all_data && all_pages >= page) {
            return ServiceResponse.success(`Successfully Get ${query.role}`, {
                "totalCounts": usersData['totalCounts'],
                "totalPages": usersData['totalPages'],
                "currentPage": page,
                "data": usersData['data'][page],
            }, StatusCodes.OK);
        }

        if (isUsersExist && all_pages < page) {
            return ServiceResponse.success(`Successfully Get ${query.role}`, {
                "totalCounts": usersData['totalCounts'],
                "totalPages": usersData['totalPages'],
                "currentPage": page,
                "data": [],
            }, StatusCodes.OK);
        }

        const total = await userModel.countDocuments({ role: role });
        const totalPages = Math.ceil(total / limit);
        const all_users = totalPages < page ? [] : await getUserByRole(query.role, page, limit);

        usersData['totalCounts'] = total;
        usersData['totalPages'] = totalPages;

        if (totalPages >= page) {
            usersData['data'] = { ...usersData['data'], [page]: all_users };
        }
        await redis.set(`Stats:Users:${query.role}`, JSON.stringify(usersData), {
            EX: 30 * 24 * 60 * 60
        });

        return ServiceResponse.success(`Successfully Get ${query.role}`, {
            "totalCounts": usersData['totalCounts'],
            "totalPages": usersData['totalPages'],
            "currentPage": page,
            "data": all_users,
        }, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `StatsGetUserService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}