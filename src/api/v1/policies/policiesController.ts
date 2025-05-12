import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { UserSessionTypes } from "@/common/types/user";
import { BlockedService, IssuedService, QuotedService } from "./policiesService";
import { QuotedModel } from "./policiesModel";


class PoliciesController {
    public quoted: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await QuotedService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof QuotedModel>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
    public blocked: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await BlockedService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof QuotedModel>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
    public issued: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await IssuedService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof QuotedModel>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
}

export const policiesController = new PoliciesController();