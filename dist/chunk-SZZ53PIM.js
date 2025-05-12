"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkRPTFHDQ2js = require('./chunk-RPTFHDQ2.js');


var _chunkLIHG6MRBjs = require('./chunk-LIHG6MRB.js');

// src/api/v1/internal/stats/statsModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var GetUserSchema = _zod.z.object({
  query: _zod.z.object({
    role: _chunkLIHG6MRBjs.UserRolesSchema.exclude(["SuperAdmin"]),
    email: _zod.z.string().email({
      message: "Invalid email address"
    }).optional(),
    page: _chunkRPTFHDQ2js.pageValidation
  }).strict(
    {
      message: "Invalid query parameters"
    }
  )
});



exports.GetUserSchema = GetUserSchema;
//# sourceMappingURL=chunk-SZZ53PIM.js.map