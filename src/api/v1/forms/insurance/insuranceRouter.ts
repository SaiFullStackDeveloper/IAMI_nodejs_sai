import express, { type Router } from "express";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { insuranceController } from "./insuranceController";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { InsuranceFormPostSchema, InsuranceFormGetSchema, InsuranceFormCreateQuote, InsuranceFormFullQuote, InsuranceFormStatusSchema, InsuranceFormCloneModel, InsuranceFormDiscardModel } from "./insuranceModel";

export const insuranceRegistry = new OpenAPIRegistry();
export const insuranceRouter: Router = express.Router();

// GET /v1/forms/insurance/status


// insuranceRegistry.registerPath({
//     method: "get",
//     path: "/health-check",
//     tags: ["Health Check"],
//     responses: createApiResponse(z.null(), "Success"),
// });

insuranceRouter.get("/status", validateRequest(InsuranceFormStatusSchema), insuranceController.status)


// POST /v1/forms/insurance/save

insuranceRouter.post("/save", validateRequest(InsuranceFormPostSchema), insuranceController.insuranceForm)

// GET /v1/forms/insurance/get

insuranceRouter.get("/get", validateRequest(InsuranceFormGetSchema), insuranceController.insuranceForm)

// GET /v1/forms/insurance/reset

insuranceRouter.get("/reset", insuranceController.resetForm)

// POST /v1/forms/insurance/createquote

insuranceRouter.post("/createquote", validateRequest(InsuranceFormCreateQuote), insuranceController.createQuote)

// POST /v1/forms/insurance/fullquote

insuranceRouter.post("/fullquote", validateRequest(InsuranceFormFullQuote), insuranceController.fullQuote)

// POST /v1/forms/insurance/blockquote

insuranceRouter.post("/blockquote", validateRequest(InsuranceFormFullQuote), insuranceController.blockQuote)

// GET /v1/forms/insurance/clone

insuranceRouter.get("/clone", validateRequest(InsuranceFormCloneModel), insuranceController.clone)

// DEL /v1/forms/insurance/discard

insuranceRouter.delete("/discard", validateRequest(InsuranceFormDiscardModel), insuranceController.discard)
