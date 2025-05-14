import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

import mongoose from 'mongoose';
import { redis } from "@/common/config/redis";
import { signupEmail } from "@/common/config/email";

import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

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
  console.log('HEALTH CHECK CALLED')
  sendTestEmail();

  return handleServiceResponse(serviceResponse, res);
});

const TOKEN = "5bddbec37dfecdebb0e7c3a0fa36e328";
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL as string;

const client = new MailtrapClient({ token: TOKEN });

const sendTestEmail = async () => {
  try {
    await client.send({
      from: {
        email: "noreply@iamiinsurance.com.au",
        name: "Mailtrap Test",
      },
      to: [
        {
          email: "linguistic.capybara.qiyp@letterprotect.com", // Replace with your test address
        },
      ],
      subject: "Hello from Mailtrap API",
      text: "This is a test email sent using Mailtrap Email Sending API.",
      html: "<p><strong>This is a test email sent using <em>Mailtrap API</em>.</strong></p>",
    });

    console.log("✅ Test email sent successfully");
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};