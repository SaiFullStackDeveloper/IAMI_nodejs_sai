import { type Router, Request, Response, NextFunction } from "express";
import { userSessionRedisRepository } from "../models/redis/user";
import { handleServiceResponse } from "../utils/httpHandlers";
import { ServiceResponse } from "../models/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { UserSessionTypes } from "../types/user";
import { AccessToken } from "../config/jwt";
import { userModel } from "../models/mongoDB/user";

// Authentication middleware
export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {



    if (req.path !== '/auth/login/refresh' && req.path.startsWith('/auth')) {
        return next();
    }

    const emailHeader = req.headers['x-requested-email'] as string;
    const accessTokenHeader = req.headers.authorization as string;


    if (!emailHeader || !accessTokenHeader) {
        return handleServiceResponse(ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
        ), res)
    }

    const userSession = await userSessionRedisRepository.fetch(emailHeader);

    if (!userSession.accessToken) {
        return handleServiceResponse(ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
        ), res)
    }

    if (`Bearer ${userSession.accessToken}` !== accessTokenHeader) {

        return handleServiceResponse(ServiceResponse.failure(
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
        ), res)
    }

    req.headers['x-requested-user'] = JSON.stringify(userSession)
    next()

};


export const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // return res.status(403).json({ success: false, message: "Access denied: Not a Super Admin" });


    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Access token missing" });
        }

        const payload = await AccessToken("Decrypt", token);
        if (typeof payload !== "object" || !("email" in payload)) {
            return res.status(400).json({ success: false, message: "Invalid token payload" });
        }

        const email = payload.email as string;
        const user = await userModel.findOne({ email });

        if (!user || user.role !== "SuperAdmin") {
            return res.status(403).json({ success: false, message: "Access denied: Not a Super Admin" });
        }

        // Optional: Attach user data to req.user for further usage
        //   req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// Middleware to ensure the user is an agent
export const isAgent = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user?.role !== "Agent") {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: Only SuperAdmin allowed." });
    }

    next();
};



export const isAdminOrSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized access: Missing token' });
        }

        const token = authHeader.split(' ')[1];
        const decoded: any = await AccessToken('Decrypt', token);

        const email = decoded.email as string;
        const user = await userModel.findOne({ email });

        // Allow only SuperAdmin or Employee
        if (!user || user.role !== 'SuperAdmin' && user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins and SuperAdmins only have access to Edit details...' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export const isAdminOrAgent = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Unauthorized: No token provided",
        });
    }

    try {
        const decoded = await AccessToken("Decrypt", token);
        if (!decoded || typeof decoded === "string") throw new Error("Invalid token");

        const user = await userModel.findOne({ email: decoded.email });

        if (!user || (user.role !== 'Agent' && user.role !== 'Admin')) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "Forbidden: Access denied, Only Agents and Admins had the access!"
            });
        }

        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Unauthorized",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}