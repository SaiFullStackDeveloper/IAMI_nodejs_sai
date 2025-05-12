"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/common/config/env.ts
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _envalid = require('envalid');
_dotenv2.default.config();
var env = _envalid.cleanEnv.call(void 0, process.env, {
  NODE_ENV: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "test"), choices: ["development", "production", "test"] }),
  HOST: _envalid.host.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "localhost") }),
  PORT: _envalid.port.call(void 0, { devDefault: _envalid.testOnly.call(void 0, 3e3) }),
  CORS_ORIGIN: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: _envalid.num.call(void 0, { devDefault: _envalid.testOnly.call(void 0, 1e3) }),
  COMMON_RATE_LIMIT_WINDOW_MS: _envalid.num.call(void 0, { devDefault: _envalid.testOnly.call(void 0, 1e3) }),
  MONGODB_URI: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "mongodb://localhost:27017/test") }),
  REDIS_URI: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "redis://127.0.0.1:6379") }),
  SIGNUP_VERIFICATION_TOKEN_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "verfication") }),
  LOGIN_VERIFICATION_TOKEN_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "login") }),
  ACCESS_TOKEN_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "access") }),
  REFRESH_TOKEN_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "refresh") }),
  FORGOT_VERIFICATION_TOKEN_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "forgot") }),
  MAILTRAP_API_KEY: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "Mailtrap") }),
  FROM_EMAIL: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "test@gmail.com") }),
  // MAILGUN_DOMAIN: str({ devDefault: testOnly("test.com") }),
  BACKEND_DOMAIN: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "http://localhost:8000") }),
  FRONTEND_DOMAIN: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "http://localhost:3000") }),
  AUSTRALIA_EAST_CHAINTHAT: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_API: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_SERVER: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_USERNAME: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_PASSWORD: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_CLIENT_ID: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_TENANT_ID: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_TENANT_CODE: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  INSUREMO_SOURCE_ID: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") }),
  STRIPE_SECRET_KEY: _envalid.str.call(void 0, { devDefault: _envalid.testOnly.call(void 0, "") })
});



exports.env = env;
//# sourceMappingURL=chunk-U3Q25YHW.js.map