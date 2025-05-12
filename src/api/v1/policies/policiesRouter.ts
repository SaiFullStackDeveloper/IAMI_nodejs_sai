import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { policiesController } from "./policiesController";
import { QuotedModel } from "./policiesModel";

export const policiesRegistry = new OpenAPIRegistry();
export const policiesRouter: Router = express.Router();

policiesRouter.get('/quoted', validateRequest(QuotedModel), policiesController.quoted)
policiesRouter.get('/blocked', validateRequest(QuotedModel), policiesController.blocked)
policiesRouter.get('/issued', validateRequest(QuotedModel), policiesController.issued)