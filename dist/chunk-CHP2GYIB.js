"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/config/jwt.ts
var _jose = require('jose');
var {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  SIGNUP_VERIFICATION_TOKEN_SECRET,
  LOGIN_VERIFICATION_TOKEN_SECRET,
  FORGOT_VERIFICATION_TOKEN_SECRET
} = _chunkU3Q25YHWjs.env;
var keyEncoder = (key) => {
  return new TextEncoder().encode(key);
};
var jwtEncrypt = async (payload, exp, Secret) => {
  return await new (0, _jose.SignJWT)(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(exp).sign(Secret);
};
async function jwtDecrypt(input, Secret) {
  const { payload } = await _jose.jwtVerify.call(void 0, input, Secret, {
    algorithms: ["HS256"]
  });
  return payload;
}
var SignUpToken = async (type, payload) => {
  if (type === "Decrypt" && typeof payload === "string") {
    return await jwtDecrypt(payload, keyEncoder(SIGNUP_VERIFICATION_TOKEN_SECRET));
  }
  return await jwtEncrypt(payload || {}, "30d", keyEncoder(SIGNUP_VERIFICATION_TOKEN_SECRET));
};
var LoginToken = async (type, payload) => {
  if (type === "Decrypt" && typeof payload === "string") {
    return await jwtDecrypt(payload, keyEncoder(LOGIN_VERIFICATION_TOKEN_SECRET));
  }
  return await jwtEncrypt(payload || {}, "1d", keyEncoder(LOGIN_VERIFICATION_TOKEN_SECRET));
};
var AccessToken = async (type, payload) => {
  if (type === "Decrypt" && typeof payload === "string") {
    return await jwtDecrypt(payload, keyEncoder(ACCESS_TOKEN_SECRET));
  }
  return await jwtEncrypt(payload || {}, "2d", keyEncoder(ACCESS_TOKEN_SECRET));
};
var RefreshToken = async (type, payload) => {
  if (type === "Decrypt" && typeof payload === "string") {
    return await jwtDecrypt(payload, keyEncoder(REFRESH_TOKEN_SECRET));
  }
  return await jwtEncrypt(payload || {}, "2d", keyEncoder(REFRESH_TOKEN_SECRET));
};
var ForgotToken = async (type, payload) => {
  if (type === "Decrypt" && typeof payload === "string") {
    return await jwtDecrypt(payload, keyEncoder(FORGOT_VERIFICATION_TOKEN_SECRET));
  }
  return await jwtEncrypt(payload || {}, "1d", keyEncoder(FORGOT_VERIFICATION_TOKEN_SECRET));
};










exports.keyEncoder = keyEncoder; exports.jwtEncrypt = jwtEncrypt; exports.jwtDecrypt = jwtDecrypt; exports.SignUpToken = SignUpToken; exports.LoginToken = LoginToken; exports.AccessToken = AccessToken; exports.RefreshToken = RefreshToken; exports.ForgotToken = ForgotToken;
//# sourceMappingURL=chunk-CHP2GYIB.js.map