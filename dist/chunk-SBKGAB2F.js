"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkYCOP6BXVjs = require('./chunk-YCOP6BXV.js');


var _chunkMY7ICP5Mjs = require('./chunk-MY7ICP5M.js');


var _chunkJDA4FSDTjs = require('./chunk-JDA4FSDT.js');


var _chunkVXTEHXEPjs = require('./chunk-VXTEHXEP.js');


var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/api/auth/verification/signupVerificationRouter.ts
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var signupVerificationRouter = _express2.default.Router();
signupVerificationRouter.get("/:token/:email", async (req, res) => {
  const { FRONTEND_DOMAIN } = _chunkU3Q25YHWjs.env;
  const { email, token } = req.params;
  const signupKey = `Signup:${email}`;
  const userExist = await _chunkVXTEHXEPjs.redis.get(signupKey);
  if (userExist) {
    const isUserExist = JSON.parse(userExist);
    if (isUserExist.email !== email || isUserExist.token !== token) {
      return res.redirect(`${FRONTEND_DOMAIN}/auth/login`);
    }
    await _chunkJDA4FSDTjs.createUser.call(void 0, {
      email: isUserExist.email,
      name: isUserExist.name,
      phone: isUserExist.phone,
      role: isUserExist.role,
      address: isUserExist.address,
      ABN: isUserExist.ABN,
      isEmailVerified: true,
      password: isUserExist.password,
      isUserVerified: isUserExist.role === "Agent" ? false : true
    });
    await _chunkYCOP6BXVjs.userSignupRedisRepository.remove(email);
    await _chunkVXTEHXEPjs.redis.del(`Stats:Users:${isUserExist.role}`);
  } else {
    return res.status(502).send("Please, try again signup, Token is expired");
  }
  const data = _chunkMY7ICP5Mjs.emailHtml.call(void 0, "auth/signup/verification-complete.hbs", {
    link: FRONTEND_DOMAIN
  });
  res.send(data);
});



exports.signupVerificationRouter = signupVerificationRouter;
//# sourceMappingURL=chunk-SBKGAB2F.js.map