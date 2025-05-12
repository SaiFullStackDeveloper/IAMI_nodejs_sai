"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/middleware/rateLimiter.ts
var _expressratelimit = require('express-rate-limit');
var rateLimiter = _expressratelimit.rateLimit.call(void 0, {
  legacyHeaders: true,
  limit: _chunkU3Q25YHWjs.env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 15 * 60 * _chunkU3Q25YHWjs.env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req) => req.ip
});
var rateLimiter_default = rateLimiter;



exports.rateLimiter_default = rateLimiter_default;
//# sourceMappingURL=chunk-PQNQEBHS.js.map