import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { UserSessionTypes } from "@/common/types/user";
import { StatsGetUserService } from "./statsService";
import { GetUserSchema } from "./statsModel";


class StatsController {
    public getUser: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await StatsGetUserService(req.query as z.infer<typeof GetUserSchema>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
}

export const statsController = new StatsController();