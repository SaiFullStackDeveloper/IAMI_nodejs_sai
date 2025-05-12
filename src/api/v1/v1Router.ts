import express, { type Router } from "express";
import { authRegistry, authRouter } from "./auth/authRouter";
import { formsRegistry, formsRouter } from "./forms/formsRouter";
import { AuthMiddleware } from "@/common/middleware/authHandler";
import { internalRouter, internalRegistry } from "./internal/internalRouter";
import { paymentRegistry, paymentRouter } from "./payment/paymentRouter";
import { policiesRegistry, policiesRouter } from './policies/policiesRouter'

export const v1Router: Router = express.Router();

export const v1Registry = [
    authRegistry,
    paymentRegistry,
    policiesRegistry,
    ...formsRegistry,
    ...internalRegistry
]

v1Router.use(AuthMiddleware)
v1Router.use('/auth', authRouter)
v1Router.use('/forms', formsRouter)
v1Router.use('/internal', internalRouter)
v1Router.use('/payment', paymentRouter)
v1Router.use("/policies", policiesRouter)