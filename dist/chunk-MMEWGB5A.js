"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunk4QGOQSDIjs = require('./chunk-4QGOQSDI.js');

// src/api/v1/payment/paymentModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var PaymentCreateSchema = _zod.z.object({
  body: _zod.z.object({
    amount: _chunk4QGOQSDIjs.AMOUNT.call(void 0, "Amount")
  }).strict({
    message: "Invalid request body"
  })
});
var PaymentStatusSchema = _zod.z.object({
  query: _zod.z.object({
    id: _zod.z.string({ required_error: "Id is required" })
  }).strict({
    message: "Invalid request body"
  })
});
var PaymentPeriodSchema = _zod.z.object({
  body: _zod.z.object({
    period: _zod.z.enum(["Monthly"], {
      message: "Invalid period"
    })
  }).strict({
    message: "Invalid request body"
  })
});





exports.PaymentCreateSchema = PaymentCreateSchema; exports.PaymentStatusSchema = PaymentStatusSchema; exports.PaymentPeriodSchema = PaymentPeriodSchema;
//# sourceMappingURL=chunk-MMEWGB5A.js.map