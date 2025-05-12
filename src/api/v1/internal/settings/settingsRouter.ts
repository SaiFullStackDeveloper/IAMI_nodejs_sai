import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { settingsController } from "./settingsController";
import { CreateUserSchema } from './settingsModel'

export const settingsRegistry = new OpenAPIRegistry();
export const settingsRouter: Router = express.Router();

settingsRouter.post('/user/create', validateRequest(CreateUserSchema), settingsController.createUser)