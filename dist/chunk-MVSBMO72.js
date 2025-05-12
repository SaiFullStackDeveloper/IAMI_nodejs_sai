"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkLIHG6MRBjs = require('./chunk-LIHG6MRB.js');

// src/api/v1/internal/settings/settingsModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
var _libphonenumberjs = require('libphonenumber-js'); var _libphonenumberjs2 = _interopRequireDefault(_libphonenumberjs);
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var CreateUserSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    ),
    name: _zod.z.string({ required_error: "Name is required" }),
    phone: _zod.z.string({ required_error: "Phone number is required" }).transform((arg, ctx) => {
      const phone = _libphonenumberjs2.default.call(void 0, arg, {
        // set this to use a default country when the phone number omits country code
        defaultCountry: "AU",
        // set to false to require that the whole string is exactly a phone number,
        // otherwise, it will search for a phone number anywhere within the string
        extract: false
      });
      if (phone && phone.isValid()) {
        return phone.number;
      }
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "Invalid phone number"
      });
      return _zod.z.NEVER;
    }),
    role: _chunkLIHG6MRBjs.UserRolesSchema.exclude(["SuperAdmin", "User"]),
    address: _zod.z.string().min(10).optional(),
    ABN: _zod.z.string().optional()
  }).strict().superRefine((data, ctx) => {
    if (data.role === "Agent" && !data.address) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "Address is required",
        path: ["address"]
      });
    }
    if (data.role === "Admin" && data.ABN) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "ABN is not required",
        path: ["ABN"]
      });
    }
  })
});



exports.CreateUserSchema = CreateUserSchema;
//# sourceMappingURL=chunk-MVSBMO72.js.map