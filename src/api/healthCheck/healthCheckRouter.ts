import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

import mongoose from 'mongoose';
import { redis } from "@/common/config/redis";
import { signupEmail } from "@/common/config/email";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", async (_req: Request, res: Response) => {

  const serviceResponse = ServiceResponse.success("Service is healthy", {
    mongoDB: await mongoose.connection.db?.admin().command({ ping: 1 }) ? "Connected" : "Not connected",
    redis: await redis.PING() === "PONG" ? "Connected" : "Not connected",
  });
  return handleServiceResponse(serviceResponse, res);
});
