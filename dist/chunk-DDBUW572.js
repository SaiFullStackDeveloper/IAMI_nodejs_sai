"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/middleware/errorHandler.ts
var _httpstatuscodes = require('http-status-codes');
var unexpectedRequest = (_req, res) => {
  res.sendStatus(_httpstatuscodes.StatusCodes.NOT_FOUND);
};
var addErrorToRequestLog = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};
var errorHandler_default = () => [unexpectedRequest, addErrorToRequestLog];



exports.errorHandler_default = errorHandler_default;
//# sourceMappingURL=chunk-DDBUW572.js.map