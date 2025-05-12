"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('../../../chunk-PR4QN5HX.js');

// src/api/auth/verification/veriicationModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var GetSignupVerificationSchema = _zod.z.object({
  params: _zod.z.object({
    email: _zod.z.string().email(),
    token: _zod.z.string()
  })
});


exports.GetSignupVerificationSchema = GetSignupVerificationSchema;
//# sourceMappingURL=veriicationModel.js.map