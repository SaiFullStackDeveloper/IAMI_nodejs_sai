"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/models/serviceResponse.ts
var _httpstatuscodes = require('http-status-codes');
var _zod = require('zod');
var ServiceResponse = class _ServiceResponse {
  
  
  
  
  constructor(success, message, data, statusCode) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
  static success(message, data, statusCode = _httpstatuscodes.StatusCodes.OK) {
    return new _ServiceResponse(true, message, data, statusCode);
  }
  static failure(message, data, statusCode = _httpstatuscodes.StatusCodes.BAD_REQUEST) {
    return new _ServiceResponse(false, message, data, statusCode);
  }
};
var ServiceResponseSchema = (dataSchema) => _zod.z.object({
  success: _zod.z.boolean(),
  message: _zod.z.string(),
  data: dataSchema.optional(),
  statusCode: _zod.z.number()
});




exports.ServiceResponse = ServiceResponse; exports.ServiceResponseSchema = ServiceResponseSchema;
//# sourceMappingURL=chunk-GDC63SRX.js.map