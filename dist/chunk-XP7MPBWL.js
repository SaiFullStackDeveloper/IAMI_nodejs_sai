"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');

// src/api-docs/openAPIResponseBuilders.ts
var _httpstatuscodes = require('http-status-codes');
function createApiResponse(schema, description, statusCode = _httpstatuscodes.StatusCodes.OK) {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema: _chunkGDC63SRXjs.ServiceResponseSchema.call(void 0, schema)
        }
      }
    }
  };
}



exports.createApiResponse = createApiResponse;
//# sourceMappingURL=chunk-XP7MPBWL.js.map