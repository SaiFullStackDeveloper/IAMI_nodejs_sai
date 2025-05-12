"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkE5IYCE7Tjs = require('./chunk-E5IYCE7T.js');


var _chunkXP7MPBWLjs = require('./chunk-XP7MPBWL.js');


var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');


var _chunkVXTEHXEPjs = require('./chunk-VXTEHXEP.js');

// src/api/healthCheck/healthCheckRouter.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _zod = require('zod');
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var healthCheckRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var healthCheckRouter = _express2.default.Router();
healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: _chunkXP7MPBWLjs.createApiResponse.call(void 0, _zod.z.null(), "Success")
});
healthCheckRouter.get("/", async (_req, res) => {
  const serviceResponse = _chunkGDC63SRXjs.ServiceResponse.success("Service is healthy", {
    mongoDB: await _optionalChain([_mongoose2.default, 'access', _ => _.connection, 'access', _2 => _2.db, 'optionalAccess', _3 => _3.admin, 'call', _4 => _4(), 'access', _5 => _5.command, 'call', _6 => _6({ ping: 1 })]) ? "Connected" : "Not connected",
    redis: await _chunkVXTEHXEPjs.redis.PING() === "PONG" ? "Connected" : "Not connected"
  });
  return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
});




exports.healthCheckRegistry = healthCheckRegistry; exports.healthCheckRouter = healthCheckRouter;
//# sourceMappingURL=chunk-QIPQVNW5.js.map