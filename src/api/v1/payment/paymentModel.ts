import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { AMOUNT } from "../forms/insurance/insuranceStaticData";


extendZodWithOpenApi(z);


export const PaymentCreateSchema = z.object({
    body: z.object({
        amount: AMOUNT('Amount'),
    }).strict({
        message: "Invalid request body"
    })
})

export const PaymentStatusSchema = z.object({
    query: z.object({
        id: z.string({ required_error: 'Id is required' }),
    }).strict({
        message: "Invalid request body"
    })
})

export const PaymentPeriodSchema = z.object({
    body: z.object({
        period: z.enum(['Monthly'], {
            message: 'Invalid period'
        })
    }).strict({
        message: "Invalid request body"
    })
})