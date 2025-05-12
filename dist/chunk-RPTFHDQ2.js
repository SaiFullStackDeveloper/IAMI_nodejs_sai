"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/utils/commonValidation.ts
var _zod = require('zod');
var commonValidations = {
  id: _zod.z.string().refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value").transform(Number).refine((num) => num > 0, "ID must be a positive number")
  // ... other common validations
};
var pageValidation = _zod.z.string().optional().refine((val) => {
  if (val === void 0) return true;
  const num = parseInt(val, 10);
  return !isNaN(num) && num >= 1;
}, { message: "Page must be a string representing a number that is at least 1" });




exports.commonValidations = commonValidations; exports.pageValidation = pageValidation;
//# sourceMappingURL=chunk-RPTFHDQ2.js.map