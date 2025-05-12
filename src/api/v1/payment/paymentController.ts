import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { PaymentCreateService, PaymentPeriodService, PaymentStatusService } from "./paymentService";
import { z } from "zod";
import { PaymentStatusSchema } from "./paymentModel";
import { UserSessionTypes } from "@/common/types/user";


class PaymentController {
    public create: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await PaymentCreateService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body);
        return handleServiceResponse(serviceResponse, res);
    };
    public status: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await PaymentStatusService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.query as z.infer<typeof PaymentStatusSchema>['query']);
        return handleServiceResponse(serviceResponse, res);
    };
    public period: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await PaymentPeriodService(JSON.parse(req.headers['x-requested-user'] as string) as UserSessionTypes, req.body);
        return handleServiceResponse(serviceResponse, res);
    };
}

export const paymentController = new PaymentController();