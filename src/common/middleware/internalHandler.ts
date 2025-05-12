import { type Router, Request, Response, NextFunction } from "express";
import { userSessionRedisRepository } from "../models/redis/user";
import { handleServiceResponse } from "../utils/httpHandlers";
import { ServiceResponse } from "../models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { UserSessionTypes } from "../types/user";

// Authentication middleware
export const InternalMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const user = JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes;
    if (!['SuperAdmin', 'Admin'].includes(user.role)) {
        return handleServiceResponse(ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
        ), res)
    }
    next()

};