"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/types/user.ts
var _zod = require('zod');
var UserRolesSchema = _zod.z.enum(["Agent", "User", "Admin", "SuperAdmin"]);



exports.UserRolesSchema = UserRolesSchema;
//# sourceMappingURL=chunk-LIHG6MRB.js.map