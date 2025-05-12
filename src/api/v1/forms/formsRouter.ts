import express, { type Router } from "express";
import { insuranceRegistry, insuranceRouter } from "./insurance/insuranceRouter";

export const formsRouter: Router = express.Router();

export const formsRegistry = [
    insuranceRegistry
]

formsRouter.use('/insurance', insuranceRouter)


