"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkLIHG6MRBjs = require('./chunk-LIHG6MRB.js');


var _chunkJDA4FSDTjs = require('./chunk-JDA4FSDT.js');

// src/api/v1/auth/authModel.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');
var _zod = require('zod');
var _libphonenumberjs = require('libphonenumber-js'); var _libphonenumberjs2 = _interopRequireDefault(_libphonenumberjs);
_zodtoopenapi.extendZodWithOpenApi.call(void 0, _zod.z);
var SignUpSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    ),
    name: _zod.z.string({ required_error: "Name is required" }),
    password: _zod.z.string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters"
    }),
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
    role: _chunkLIHG6MRBjs.UserRolesSchema.exclude(["SuperAdmin", "Admin"]),
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
    if (data.role === "User" && data.address) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "Address is not required",
        path: ["address"]
      });
    }
    if (data.role === "User" && data.ABN) {
      ctx.addIssue({
        code: _zod.z.ZodIssueCode.custom,
        message: "ABN is not required",
        path: ["ABN"]
      });
    }
  })
});
var LoginSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    ),
    password: _zod.z.string({ required_error: "Password is required" }).nonempty({
      message: "Password is required"
    }).min(8, {
      message: "Password must be at least 8 characters"
    })
  }).strict()
});
var LoginRefreshSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    ),
    token: _zod.z.string().min(20)
  }).strict()
});
var ForgotSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    )
  }).strict()
});
var ResetSchema = _zod.z.object({
  body: _zod.z.object({
    email: _zod.z.string({ required_error: "Email is required" }).email(
      {
        message: "Invalid email address"
      }
    ),
    password: _zod.z.string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters"
    }),
    token: _zod.z.string().min(20)
  }).strict()
});
var EmployeeRegistrationSchema = _zod.z.object({
  body: _zod.z.object({
    name: _zod.z.string().min(2),
    email: _zod.z.string().email(),
    phone: _zod.z.string().min(10).max(15),
    address: _zod.z.string(),
    password: _zod.z.string().min(6),
    ABN: _zod.z.string().optional()
  })
});
var getAgentsByStatus = async (status) => {
  const filter = { role: "Agent" };
  if (status === "approved") {
    filter.isUserVerified = true;
  } else if (status === "pending") {
    filter.isUserVerified = false;
  }
  return await _chunkJDA4FSDTjs.userModel.find(filter, "-password -__v");
};
var updateAgentApprovalStatus = async (email, isUserVerified) => {
  return await _chunkJDA4FSDTjs.userModel.updateOne(
    { email, role: "Agent" },
    { $set: { isUserVerified } }
  );
};
var updateUserProfile = async (email, updateFields) => {
  const updated = await _chunkJDA4FSDTjs.userModel.findOneAndUpdate(
    { email },
    { $set: updateFields },
    { new: true, projection: "-password -__v" }
  );
  return updated;
};
var updateAgentProfile = async (email, updateFields) => {
  return await _chunkJDA4FSDTjs.userModel.findOneAndUpdate({ email }, updateFields, { new: true, projection: "-password -__v" });
};
var updateAdminProfile = async (email, fieldsToUpdate) => {
  try {
    const updatedUser = await _chunkJDA4FSDTjs.userModel.findOneAndUpdate(
      { email },
      { $set: fieldsToUpdate },
      { new: true }
      // Return the updated document
    );
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user profile");
  }
};
var updateSuperAdminProfile = async (email, updateData) => {
  try {
    const updatedSuperAdmin = await _chunkJDA4FSDTjs.userModel.findOneAndUpdate(
      { email, role: "SuperAdmin" },
      { $set: updateData },
      { new: true }
    );
    return updatedSuperAdmin;
  } catch (error) {
    throw new Error("Error updating Super Admin profile");
  }
};














exports.SignUpSchema = SignUpSchema; exports.LoginSchema = LoginSchema; exports.LoginRefreshSchema = LoginRefreshSchema; exports.ForgotSchema = ForgotSchema; exports.ResetSchema = ResetSchema; exports.EmployeeRegistrationSchema = EmployeeRegistrationSchema; exports.getAgentsByStatus = getAgentsByStatus; exports.updateAgentApprovalStatus = updateAgentApprovalStatus; exports.updateUserProfile = updateUserProfile; exports.updateAgentProfile = updateAgentProfile; exports.updateAdminProfile = updateAdminProfile; exports.updateSuperAdminProfile = updateSuperAdminProfile;
//# sourceMappingURL=chunk-XSUWL2FG.js.map