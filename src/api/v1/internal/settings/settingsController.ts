import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { SettingsCreateUserService } from './settingsService'
import { z } from "zod";
import { CreateUserSchema } from "./settingsModel";
import { UserSessionTypes } from "@/common/types/user";


class SettingsController {
    public createUser: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await SettingsCreateUserService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body as z.infer<typeof CreateUserSchema>['body']);
        return handleServiceResponse(serviceResponse, res);
    };
}

export const settingsController = new SettingsController();