"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkE5IYCE7Tjs = require('./chunk-E5IYCE7T.js');


var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');

// src/common/middleware/internalHandler.ts
var _httpstatuscodes = require('http-status-codes');
var InternalMiddleware = async (req, res, next) => {
  const user = JSON.parse(req.headers["x-requested-user"]);
  if (!["SuperAdmin", "Admin"].includes(user.role)) {
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, _chunkGDC63SRXjs.ServiceResponse.failure(
      "Unauthorized",
      null,
      _httpstatuscodes.StatusCodes.UNAUTHORIZED
    ), res);
  }
  next();
};



exports.InternalMiddleware = InternalMiddleware;
//# sourceMappingURL=chunk-RHY4WX2A.js.map