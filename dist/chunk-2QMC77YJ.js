"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/utils/date.ts
var expireIn = (time) => {
  const expirationDate = /* @__PURE__ */ new Date();
  expirationDate.setDate(expirationDate.getDate() + time);
  const formattedExpiration = expirationDate.toISOString();
  return formattedExpiration;
};
function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}




exports.expireIn = expireIn; exports.convertDateFormat = convertDateFormat;
//# sourceMappingURL=chunk-2QMC77YJ.js.map