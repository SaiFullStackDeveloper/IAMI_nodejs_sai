import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  MONGODB_URI: str({ devDefault: testOnly("mongodb://localhost:27017/test") }),
  REDIS_URI: str({ devDefault: testOnly("redis://127.0.0.1:6379") }),

  SIGNUP_VERIFICATION_TOKEN_SECRET: str({ devDefault: testOnly("verfication") }),
  LOGIN_VERIFICATION_TOKEN_SECRET: str({ devDefault: testOnly("login") }),
  ACCESS_TOKEN_SECRET: str({ devDefault: testOnly("access") }),
  REFRESH_TOKEN_SECRET: str({ devDefault: testOnly("refresh") }),
  FORGOT_VERIFICATION_TOKEN_SECRET: str({ devDefault: testOnly("forgot") }),

  MAILTRAP_API_KEY: str({ devDefault: testOnly("Mailtrap") }),
  FROM_EMAIL: str({ devDefault: testOnly("test@gmail.com") }),
  // MAILGUN_DOMAIN: str({ devDefault: testOnly("test.com") }),

  BACKEND_DOMAIN: str({ devDefault: testOnly("http://localhost:8000") }),
  FRONTEND_DOMAIN: str({ devDefault: testOnly("http://localhost:3000") }),

  AUSTRALIA_EAST_CHAINTHAT: str({ devDefault: testOnly("") }),
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID: str({ devDefault: testOnly("") }),
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET: str({ devDefault: testOnly("") }),
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID: str({ devDefault: testOnly("") }),
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE: str({ devDefault: testOnly("") }),


  INSUREMO_API: str({ devDefault: testOnly("") }),
  INSUREMO_SERVER: str({ devDefault: testOnly("") }),
  INSUREMO_USERNAME: str({ devDefault: testOnly("") }),
  INSUREMO_PASSWORD: str({ devDefault: testOnly("") }),
  INSUREMO_CLIENT_ID: str({ devDefault: testOnly("") }),
  INSUREMO_TENANT_ID: str({ devDefault: testOnly("") }),
  INSUREMO_TENANT_CODE: str({ devDefault: testOnly("") }),
  INSUREMO_SOURCE_ID: str({ devDefault: testOnly("") }),

  STRIPE_SECRET_KEY: str({ devDefault: testOnly("") }),

});