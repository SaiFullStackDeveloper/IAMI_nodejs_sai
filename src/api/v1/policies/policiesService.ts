import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/server";
import { UserSessionTypes } from "@/common/types/user";
import { z } from "zod";
import { redis } from "@/common/config/redis";
import { blockedData, filterPoliciesQuery, issuedData, policiesModel, quotedData } from "@/common/models/mongoDB/quote";
import { QuotedModel } from "./policiesModel";


export const QuotedService = async (user: UserSessionTypes, query: z.infer<typeof QuotedModel>['query']) => {
    try {

        const page = Number(query.page || "1");
        const limit = 10

        const name = query.name;
        const num = query.num;
        const effectiveAt = query.effectiveAt;
        const createdAt = query.createdAt

        const userRole = user.role === 'SuperAdmin';

        const queryValue = userRole ? {
            "data.quote-summary": { $exists: false },
            "data.block-quote": { $exists: false }
        } : {
            "meta.email": user.email,
            "data.quote-summary": { $exists: false },
            "data.block-quote": { $exists: false }
        }

        const totalFilteredCountQuery = await filterPoliciesQuery(
            queryValue,
            'quoted',
            {
                name,
                num,
                effectiveAt,
                createdAt
            });


        if (name || num || effectiveAt || createdAt) {

            const totalFilteredCount = await policiesModel.countDocuments(totalFilteredCountQuery);

            const totalPages = Math.ceil(totalFilteredCount / limit);
            const all_quotes = totalPages < page ? [] : await quotedData(page, limit, totalFilteredCountQuery);

            return ServiceResponse.success(`Successfully Get Quotes`, {
                "totalCounts": totalFilteredCount,
                "totalPages": totalPages,
                "currentPage": page,
                "data": all_quotes,
            }, StatusCodes.OK);

        }

        const quotesExist = userRole ? await redis.get("Quotes:All") : await redis.get(`Quotes:${user.email}`);
        let quotesData = quotesExist ? JSON.parse(quotesExist) : {};

        const all_pages = quotesData['totalPages'];
        const all_data = quotesData['data'] ? quotesData['data'][page] : null;


        if (quotesExist && all_data && all_pages >= page) {
            return ServiceResponse.success(`Successfully Get Quotes`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": quotesData['data'][page],
            }, StatusCodes.OK);
        }

        if (quotesExist && all_pages < page) {
            return ServiceResponse.success(`Successfully Get Quotes`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": [],
            }, StatusCodes.OK);
        }

        const total = await policiesModel.countDocuments(queryValue);
        const totalPages = Math.ceil(total / limit);
        const all_quotes = totalPages < page ? [] : await quotedData(page, limit, totalFilteredCountQuery);

        quotesData['totalCounts'] = total;
        quotesData['totalPages'] = totalPages;

        if (totalPages >= page) {
            quotesData['data'] = { ...quotesData['data'], [page]: all_quotes };
        }

        if (userRole) {
            await redis.set(`Quotes:All`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });
        } else {
            await redis.set(`Quotes:${user.email}`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });
        }

        return ServiceResponse.success(`Successfully Get Quotes`, {
            "totalCounts": quotesData['totalCounts'],
            "totalPages": quotesData['totalPages'],
            "currentPage": page,
            "data": all_quotes,
        }, StatusCodes.OK);

    }
    catch (error) {
        const errorMessage = `QuotedService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}


export const BlockedService = async (user: UserSessionTypes, query: z.infer<typeof QuotedModel>['query']) => {
    try {

        const page = Number(query.page || "1");
        const limit = 10

        const name = query.name;
        const num = query.num;
        const effectiveAt = query.effectiveAt;
        const createdAt = query.createdAt

        const userRole = user.role === 'SuperAdmin';

        const queryValue = userRole ? {
            "data.quote-summary": { $exists: false },
            "data.block-quote": { $exists: true }
        } : {
            "meta.email": user.email,
            "data.quote-summary": { $exists: false },
            "data.block-quote": { $exists: true }
        }
        const totalFilteredCountQuery = await filterPoliciesQuery(
            queryValue,
            'blocked',
            {
                name,
                num,
                effectiveAt,
                createdAt
            });


        if (name || num || effectiveAt || createdAt) {

            const totalFilteredCount = await policiesModel.countDocuments(totalFilteredCountQuery);

            const totalPages = Math.ceil(totalFilteredCount / limit);
            const all_quotes = totalPages < page ? [] : await blockedData(page, limit, totalFilteredCountQuery);

            return ServiceResponse.success(`Successfully Get Blocked Quotes`, {
                "totalCounts": totalFilteredCount,
                "totalPages": totalPages,
                "currentPage": page,
                "data": all_quotes,
            }, StatusCodes.OK);

        }

        const quotesExist = userRole ? await redis.get('Block-Quotes:All') : await redis.get(`Block-Quotes:${user.email}`);
        let quotesData = quotesExist ? JSON.parse(quotesExist) : {};

        const all_pages = quotesData['totalPages'];
        const all_data = quotesData['data'] ? quotesData['data'][page] : null;


        if (quotesExist && all_data && all_pages >= page) {
            return ServiceResponse.success(`Successfully Get Blocked Quotes`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": quotesData['data'][page],
            }, StatusCodes.OK);
        }

        if (quotesExist && all_pages < page) {
            return ServiceResponse.success(`Successfully Get Blocked Quotes`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": [],
            }, StatusCodes.OK);
        }

        const total = await policiesModel.countDocuments(queryValue);
        const totalPages = Math.ceil(total / limit);
        const all_quotes = totalPages < page ? [] : await blockedData(page, limit, totalFilteredCountQuery);

        quotesData['totalCounts'] = total;
        quotesData['totalPages'] = totalPages;

        if (totalPages >= page) {
            quotesData['data'] = { ...quotesData['data'], [page]: all_quotes };
        }


        if (userRole) {
            await redis.set(`Block-Quotes:All`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });
        } else {
            await redis.set(`Block-Quotes:${user.email}`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });
        }

        return ServiceResponse.success(`Successfully Get Blocked Quotes`, {
            "totalCounts": quotesData['totalCounts'],
            "totalPages": quotesData['totalPages'],
            "currentPage": page,
            "data": all_quotes,
        }, StatusCodes.OK);

    }
    catch (error) {
        const errorMessage = `BlockedService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}


export const IssuedService = async (user: UserSessionTypes, query: z.infer<typeof QuotedModel>['query']) => {
    try {

        const page = Number(query.page || "1");
        const limit = 10

        const name = query.name;
        const num = query.num;
        const effectiveAt = query.effectiveAt;
        const createdAt = query.createdAt

        const userRole = user.role === 'SuperAdmin';

        const queryValue = userRole ? {
            "data.quote-summary": { $exists: true }
        } : {
            "meta.email": user.email,
            "data.quote-summary": { $exists: true },
        }
        const totalFilteredCountQuery = await filterPoliciesQuery(
            queryValue, 'issued', {
            name,
            num,
            effectiveAt,
            createdAt
        });


        if (name || num || effectiveAt || createdAt) {

            const totalFilteredCount = await policiesModel.countDocuments(totalFilteredCountQuery);

            const totalPages = Math.ceil(totalFilteredCount / limit);
            const all_quotes = totalPages < page ? [] : await issuedData(page, limit, totalFilteredCountQuery);

            return ServiceResponse.success(`Successfully Get Policies`, {
                "totalCounts": totalFilteredCount,
                "totalPages": totalPages,
                "currentPage": page,
                "data": all_quotes,
            }, StatusCodes.OK);

        }

        const quotesExist = userRole ? await redis.get("Policies:All") : await redis.get(`Policies:${user.email}`);
        let quotesData = quotesExist ? JSON.parse(quotesExist) : {};

        const all_pages = quotesData['totalPages'];
        const all_data = quotesData['data'] ? quotesData['data'][page] : null;


        if (quotesExist && all_data && all_pages >= page) {
            return ServiceResponse.success(`Successfully Get Policies`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": quotesData['data'][page],
            }, StatusCodes.OK);
        }

        if (quotesExist && all_pages < page) {
            return ServiceResponse.success(`Successfully Get Policies`, {
                "totalCounts": quotesData['totalCounts'],
                "totalPages": quotesData['totalPages'],
                "currentPage": page,
                "data": [],
            }, StatusCodes.OK);
        }

        const total = await policiesModel.countDocuments(queryValue);
        const totalPages = Math.ceil(total / limit);
        const all_quotes = totalPages < page ? [] : await issuedData(page, limit, totalFilteredCountQuery);

        quotesData['totalCounts'] = total;
        quotesData['totalPages'] = totalPages;

        if (totalPages >= page) {
            quotesData['data'] = { ...quotesData['data'], [page]: all_quotes };
        }

        if (userRole) {
            await redis.set(`Policies:All`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });
        } else {
            await redis.set(`Policies:${user.email}`, JSON.stringify(quotesData), {
                EX: 30 * 24 * 60 * 60
            });

        }

        return ServiceResponse.success(`Successfully Get Policies`, {
            "totalCounts": quotesData['totalCounts'],
            "totalPages": quotesData['totalPages'],
            "currentPage": page,
            "data": all_quotes,
        }, StatusCodes.OK);
    }
    catch (error) {
        const errorMessage = `IssuedService: $${(error as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure(
            "An error occurred while creating users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}