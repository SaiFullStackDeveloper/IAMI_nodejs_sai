import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { paymentController } from "./paymentController";
import { PaymentCreateSchema, PaymentPeriodSchema, PaymentStatusSchema } from "./paymentModel";


export const paymentRegistry = new OpenAPIRegistry();
export const paymentRouter: Router = express.Router();

// POST /v1/payment/create

paymentRouter.post('/create', validateRequest(PaymentCreateSchema), paymentController.create)

// GET /v1/payment/status

paymentRouter.get('/status', validateRequest(PaymentStatusSchema), paymentController.status)

// POST /v1/payment/period

paymentRouter.post('/period', validateRequest(PaymentPeriodSchema), paymentController.period)