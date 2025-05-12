"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRPTFHDQ2js = require('./chunk-RPTFHDQ2.js');

// src/api/v1/policies/policiesModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var QuotedModel = _zod.z.object({
  query: _zod.z.object({
    page: _chunkRPTFHDQ2js.pageValidation,
    name: _zod.z.string().optional(),
    num: _zod.z.string().optional(),
    createdAt: _zod.z.string().optional(),
    effectiveAt: _zod.z.string().optional()
  }).strict(
    {
      message: "Invalid query parameters"
    }
  )
});



exports.QuotedModel = QuotedModel;
//# sourceMappingURL=chunk-NX24CH72.js.map