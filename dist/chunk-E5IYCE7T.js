"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');

// src/common/utils/httpHandlers.ts
var _httpstatuscodes = require('http-status-codes');
var handleServiceResponse = (serviceResponse, response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};
var validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${err.errors.map((e) => e.message).join(", ")}`;
    const statusCode = _httpstatuscodes.StatusCodes.BAD_REQUEST;
    const serviceResponse = _chunkGDC63SRXjs.ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};




exports.handleServiceResponse = handleServiceResponse; exports.validateRequest = validateRequest;
//# sourceMappingURL=chunk-E5IYCE7T.js.map