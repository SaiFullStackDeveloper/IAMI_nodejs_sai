import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { InsuranceFormBlockQuoteService, InsuranceFormCreateQuoteService, InsuranceFormFullQuoteService, InsuranceFormGetService, InsuranceFormClone, InsuranceFormResetService, InsuranceFormSaveService, InsuranceStatusService, InsuranceFormDiscard } from "./insuranceService";
import { UserSessionTypes } from "@/common/types/user";
import { z } from "zod";
import { InsuranceFormCloneModel, InsuranceFormCreateQuote, InsuranceFormDiscardModel, InsuranceFormFullQuote, InsuranceFormPostSchema, InsuranceFormStatusSchema } from "./insuranceModel";


class InsuranceController {
    public status: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceStatusService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof InsuranceFormStatusSchema>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
    public insuranceForm: RequestHandler = async (req: Request, res: Response) => {
        let serviceResponse;
        if (req.method === "GET") {
            serviceResponse = await InsuranceFormGetService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof InsuranceFormPostSchema>['query']);
        } else {
            serviceResponse = await InsuranceFormSaveService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body as z.infer<typeof InsuranceFormPostSchema>['body'], req.query as z.infer<typeof InsuranceFormPostSchema>['query']);
        }
        return handleServiceResponse(serviceResponse, res);
    };
    public createQuote: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormCreateQuoteService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body as z.infer<typeof InsuranceFormCreateQuote>['body'], req.query as z.infer<typeof InsuranceFormCreateQuote>['query']);
        return handleServiceResponse(serviceResponse, res);
    }
    public resetForm = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormResetService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes);
        return handleServiceResponse(serviceResponse, res);
    }
    public fullQuote: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormFullQuoteService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body as z.infer<typeof InsuranceFormFullQuote>['body']);
        return handleServiceResponse(serviceResponse, res);
    }
    public blockQuote: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormBlockQuoteService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body as z.infer<typeof InsuranceFormFullQuote>['body'], req.query as z.infer<typeof InsuranceFormFullQuote>['query']);
        return handleServiceResponse(serviceResponse, res);
    }
    public clone = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormClone(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof InsuranceFormCloneModel>['query']);
        return handleServiceResponse(serviceResponse, res);
    }
    public discard = async (req: Request, res: Response) => {
        const serviceResponse = await InsuranceFormDiscard(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof InsuranceFormDiscardModel>['query']);
        return handleServiceResponse(serviceResponse, res);
    }
}

export const insuranceController = new InsuranceController();