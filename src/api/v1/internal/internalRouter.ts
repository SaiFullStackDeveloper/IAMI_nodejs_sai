import express, { type Router } from "express";
import { InternalMiddleware } from "@/common/middleware/internalHandler";
import { settingsRegistry, settingsRouter } from './settings/settingsRouter';
import { statsRegistry, statsRouter } from "./stats/statsRouter";

export const internalRouter: Router = express.Router();

export const internalRegistry = [
    settingsRegistry,
    statsRegistry,
]

internalRouter.use(InternalMiddleware)
internalRouter.use('/settings', settingsRouter)
internalRouter.use('/stats', statsRouter)