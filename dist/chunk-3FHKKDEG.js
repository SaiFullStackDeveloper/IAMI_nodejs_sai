"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var _chunkMY7ICP5Mjs = require('./chunk-MY7ICP5M.js');


var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/config/queue.ts
var _bull = require('bull'); var _bull2 = _interopRequireDefault(_bull);
var { REDIS_URI, BACKEND_DOMAIN, FRONTEND_DOMAIN } = _chunkU3Q25YHWjs.env;
var emailQueue = new (0, _bull2.default)(
  "email",
  {
    redis: REDIS_URI
  }
);
emailQueue.process((job, done) => {
  const { type, email, name, token } = job.data;
  if (type === "Signup") {
    _chunkMY7ICP5Mjs.signupEmail.call(void 0, email, name, `${BACKEND_DOMAIN}/auth/verification/${token}/${email}`);
  }
  if (type === "Forgot") {
    _chunkMY7ICP5Mjs.forgotEmail.call(void 0, email, name, `${FRONTEND_DOMAIN}/auth/forgot?code=${token}&email=${email}`);
  }
  done();
});



exports.emailQueue = emailQueue;
//# sourceMappingURL=chunk-3FHKKDEG.js.map