"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkCHP2GYIBjs = require('./chunk-CHP2GYIB.js');


var _chunkE5IYCE7Tjs = require('./chunk-E5IYCE7T.js');


var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');


var _chunkYCOP6BXVjs = require('./chunk-YCOP6BXV.js');


var _chunkJDA4FSDTjs = require('./chunk-JDA4FSDT.js');

// src/common/middleware/authHandler.ts
var _httpstatuscodes = require('http-status-codes');
var AuthMiddleware = async (req, res, next) => {
  if (req.path !== "/auth/login/refresh" && req.path.startsWith("/auth")) {
    return next();
  }
  const emailHeader = req.headers["x-requested-email"];
  const accessTokenHeader = req.headers.authorization;
  if (!emailHeader || !accessTokenHeader) {
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, _chunkGDC63SRXjs.ServiceResponse.failure(
      "Unauthorized",
      null,
      _httpstatuscodes.StatusCodes.UNAUTHORIZED
    ), res);
  }
  const userSession = await _chunkYCOP6BXVjs.userSessionRedisRepository.fetch(emailHeader);
  if (!userSession.accessToken) {
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, _chunkGDC63SRXjs.ServiceResponse.failure(
      "Unauthorized",
      null,
      _httpstatuscodes.StatusCodes.UNAUTHORIZED
    ), res);
  }
  if (`Bearer ${userSession.accessToken}` !== accessTokenHeader) {
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, _chunkGDC63SRXjs.ServiceResponse.failure(
      "Unauthorized",
      null,
      _httpstatuscodes.StatusCodes.UNAUTHORIZED
    ), res);
  }
  req.headers["x-requested-user"] = JSON.stringify(userSession);
  next();
};
var isSuperAdmin = async (req, res, next) => {
  try {
    const token = _optionalChain([req, 'access', _ => _.headers, 'access', _2 => _2.authorization, 'optionalAccess', _3 => _3.split, 'call', _4 => _4(" "), 'access', _5 => _5[1]]);
    if (!token) {
      return res.status(401).json({ success: false, message: "Access token missing" });
    }
    const payload = await _chunkCHP2GYIBjs.AccessToken.call(void 0, "Decrypt", token);
    if (typeof payload !== "object" || !("email" in payload)) {
      return res.status(400).json({ success: false, message: "Invalid token payload" });
    }
    const email = payload.email;
    const user = await _chunkJDA4FSDTjs.userModel.findOne({ email });
    if (!user || user.role !== "SuperAdmin") {
      return res.status(403).json({ success: false, message: "Access denied: Not a Super Admin" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
var isAgent = (req, res, next) => {
  const user = req.user;
  if (_optionalChain([user, 'optionalAccess', _6 => _6.role]) !== "Agent") {
    return res.status(_httpstatuscodes.StatusCodes.FORBIDDEN).json({ message: "Forbidden: Only SuperAdmin allowed." });
  }
  next();
};
var isAdminOrSuperAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access: Missing token" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await _chunkCHP2GYIBjs.AccessToken.call(void 0, "Decrypt", token);
    const email = decoded.email;
    const user = await _chunkJDA4FSDTjs.userModel.findOne({ email });
    if (!user || user.role !== "SuperAdmin" && user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins and SuperAdmins only have access to Edit details..." });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
var isAdminOrAgent = async (req, res, next) => {
  const token = _optionalChain([req, 'access', _7 => _7.headers, 'access', _8 => _8.authorization, 'optionalAccess', _9 => _9.split, 'call', _10 => _10(" "), 'access', _11 => _11[1]]);
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized: No token provided"
    });
  }
  try {
    const decoded = await _chunkCHP2GYIBjs.AccessToken.call(void 0, "Decrypt", token);
    if (!decoded || typeof decoded === "string") throw new Error("Invalid token");
    const user = await _chunkJDA4FSDTjs.userModel.findOne({ email: decoded.email });
    if (!user || user.role !== "Agent" && user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Forbidden: Access denied, Only Agents and Admins had the access!"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};







exports.AuthMiddleware = AuthMiddleware; exports.isSuperAdmin = isSuperAdmin; exports.isAgent = isAgent; exports.isAdminOrSuperAdmin = isAdminOrSuperAdmin; exports.isAdminOrAgent = isAdminOrAgent;
//# sourceMappingURL=chunk-H52BNYS6.js.map