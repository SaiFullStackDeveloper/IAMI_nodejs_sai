"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/utils/common.ts
var formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value);
};
var parseCurrency = (formattedValue) => {
  return formattedValue.replace(/[^0-9.-]+/g, "");
};
var generateSixYears = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return Array.from({ length: 6 }, (_, i) => String(currentYear - i));
};
var generatePassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};






exports.formatCurrency = formatCurrency; exports.parseCurrency = parseCurrency; exports.generateSixYears = generateSixYears; exports.generatePassword = generatePassword;
//# sourceMappingURL=chunk-X5VRHMWC.js.map