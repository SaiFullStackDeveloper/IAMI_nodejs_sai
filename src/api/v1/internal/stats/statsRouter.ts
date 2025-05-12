import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { statsController } from "./statsController";
import { GetUserSchema } from "./statsModel";

export const statsRegistry = new OpenAPIRegistry();
export const statsRouter: Router = express.Router();

statsRouter.get("/users/get", validateRequest(GetUserSchema), statsController.getUser)