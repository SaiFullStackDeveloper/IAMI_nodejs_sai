"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/common/config/email.ts
var _mailtrap = require('mailtrap');
var _handlebars = require('handlebars'); var _handlebars2 = _interopRequireDefault(_handlebars);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var { FROM_EMAIL, NODE_ENV, MAILTRAP_API_KEY } = _chunkU3Q25YHWjs.env;
var mg = new (0, _mailtrap.MailtrapClient)({
  token: MAILTRAP_API_KEY
});
var emailHtml = (file, data) => {
  const templatePath = _path2.default.resolve(
    __dirname,
    NODE_ENV === "development" ? "../src/templates" : "./templates",
    file
  );
  const templateSource = _fs2.default.readFileSync(templatePath, "utf8");
  const template = _handlebars2.default.compile(templateSource, {
    noEscape: true
  });
  return template(data);
};
var signupEmail = async (email, name, link) => {
  const html = emailHtml("auth/signup/signup.hbs", {
    name,
    link
  });
  const plainText = emailHtml("auth/signup/signup-plain.hbs", {
    name,
    link
  });
  try {
    await mg.send({
      from: {
        name: "Iamiinsure",
        email: FROM_EMAIL
      },
      to: [{
        email,
        name
      }],
      subject: `${name} - Email Verification`,
      html,
      text: plainText
    });
  } catch (e) {
    console.log(e);
  }
};
var forgotEmail = async (email, name, link) => {
  const html = emailHtml("auth/forgot/forgot.hbs", {
    name,
    link
  });
  const plainText = emailHtml("auth/forgot/forgot-plain.hbs", {
    name,
    link
  });
  try {
    await mg.send({
      from: {
        name: "Iamiinsure",
        email: FROM_EMAIL
      },
      to: [{
        email
      }],
      subject: `${name} - Forgot Password Link`,
      html,
      text: plainText
    });
  } catch (e) {
    console.log(e);
  }
};





exports.emailHtml = emailHtml; exports.signupEmail = signupEmail; exports.forgotEmail = forgotEmail;
//# sourceMappingURL=chunk-MY7ICP5M.js.map