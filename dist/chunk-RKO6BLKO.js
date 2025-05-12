"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/middleware/requestLogger.ts
var _crypto = require('crypto');
var _httpstatuscodes = require('http-status-codes');
var _pinohttp = require('pino-http');
var requestLogger = (options) => {
  const pinoOptions = {
    enabled: _chunkU3Q25YHWjs.env.isProduction,
    customProps,
    redact: [],
    genReqId,
    customLogLevel,
    customSuccessMessage,
    customReceivedMessage: (req) => `request received: ${req.method}`,
    customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
    customAttributeKeys,
    ...options
  };
  return [responseBodyMiddleware, _pinohttp.pinoHttp.call(void 0, pinoOptions)];
};
var customAttributeKeys = {
  req: "request",
  res: "response",
  err: "error",
  responseTime: "timeTaken"
};
var customProps = (req, res) => ({
  request: req,
  response: res,
  error: res.locals.err,
  responseBody: res.locals.responseBody
});
var responseBodyMiddleware = (_req, res, next) => {
  const isNotProduction = !_chunkU3Q25YHWjs.env.isProduction;
  if (isNotProduction) {
    const originalSend = res.send;
    res.send = (content) => {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};
var customLogLevel = (_req, res, err) => {
  if (err || res.statusCode >= _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR) return "error" /* Error */;
  if (res.statusCode >= _httpstatuscodes.StatusCodes.BAD_REQUEST) return "warn" /* Warn */;
  if (res.statusCode >= _httpstatuscodes.StatusCodes.MULTIPLE_CHOICES) return "silent" /* Silent */;
  return "info" /* Info */;
};
var customSuccessMessage = (req, res) => {
  if (res.statusCode === _httpstatuscodes.StatusCodes.NOT_FOUND) return _httpstatuscodes.getReasonPhrase.call(void 0, _httpstatuscodes.StatusCodes.NOT_FOUND);
  return `${req.method} completed`;
};
var genReqId = (req, res) => {
  const existingID = _nullishCoalesce(req.id, () => ( req.headers["x-request-id"]));
  if (existingID) return existingID;
  const id = _crypto.randomUUID.call(void 0, );
  res.setHeader("X-Request-Id", id);
  return id;
};
var requestLogger_default = requestLogger();



exports.requestLogger_default = requestLogger_default;
//# sourceMappingURL=chunk-RKO6BLKO.js.map