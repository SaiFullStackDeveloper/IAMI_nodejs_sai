"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/common/models/mongoDB/quote.ts
var _mongoose = require('mongoose');
var createQuoteDebugSchema = new (0, _mongoose.Schema)(
  {},
  { strict: false }
);
var policiesSchema = new (0, _mongoose.Schema)(
  {},
  { strict: false }
);
var createQuoteResponseDebugSchema = new (0, _mongoose.Schema)(
  {},
  { strict: false }
);
var periodPaymentSchema = new (0, _mongoose.Schema)(
  {},
  { strict: false }
);
var createQuoteDebugModel = _mongoose.model.call(void 0, "CreateQuote-Debug", createQuoteDebugSchema);
var createQuoteResponseDebugModel = _mongoose.model.call(void 0, "CreateResponseQuote-Debug", createQuoteResponseDebugSchema);
var policiesModel = _mongoose.model.call(void 0, "Policies", policiesSchema);
var periodPaymentModel = _mongoose.model.call(void 0, "PeriodPayment", periodPaymentSchema);
var createQuoteDebug = async (data) => {
  return await createQuoteDebugModel.create(data);
};
var createQuoteResponseDebugModelQuote = async (data) => {
  const createdQuote = await createQuoteResponseDebugModel.create(data);
  return createdQuote._id;
};
var policies = async (data) => {
  const createdQuote = await policiesModel.create(data);
  return createdQuote._id;
};
var policiesGet = async (id, email) => {
  return await policiesModel.findOne({ _id: id, "meta.email": email });
};
var policiesDelete = async (id, email) => {
  return await policiesModel.deleteOne({ _id: id, "meta.email": email });
};
var policiesUpdateCreateQuote = async (id, data) => {
  const { "form-id": _, ...filteredData } = data.data;
  return await policiesModel.updateOne({ _id: id }, {
    $set: {
      "data": filteredData,
      "status": data.status,
      "meta.createdAt": /* @__PURE__ */ new Date()
    }
  });
};
var policiesUpdateBlockQuote = async (id, summary, blockquote, status) => {
  return await policiesModel.updateOne({ _id: id }, {
    $set: {
      "data.premium-summary": summary,
      "data.block-quote": blockquote,
      "status": status
    }
  });
};
var policiesUpdateFullQuote = async (id, quote) => {
  return await policiesModel.updateOne({ _id: id }, {
    $set: {
      "data.quote-summary": quote,
      "status.3.status": "completed",
      "payment": true
    }
  });
};
var quotedData = async (page, limit = 10, query) => {
  const skip = (page - 1) * limit;
  return await policiesModel.find(query, {
    "CreatedAt": "$meta.createdAt",
    "BusinessName": "$data.create-quote.BusinessName",
    "EffectiveDate": "$data.create-quote.EffectiveDate",
    "QuoteNo": "$data.create-quote.CarrierQuoteNumber",
    "ReferenceNo": "$data.create-quote.CarrierReferenceNumber",
    "TransactionType": {
      $cond: {
        if: { $eq: ["$data.create-quote.IsRenewable", "Y"] },
        then: "Renewal",
        else: "New Business"
      }
    },
    "PolicyStatus": {
      $cond: {
        if: { $eq: ["$data.create-quote.PolicyStatus", 1] },
        then: "Not Issued",
        else: {
          $cond: {
            if: { $eq: ["$data.create-quote.PolicyStatus", 2] },
            then: "Issued",
            else: "Cancelled"
          }
        }
      }
    },
    "Coverages": "$data.coverage-selection.Coverages"
  }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);
};
var blockedData = async (page, limit = 10, query) => {
  const skip = (page - 1) * limit;
  return await policiesModel.find(query, {
    "CreatedAt": "$meta.createdAt",
    "BusinessName": "$data.block-quote.BusinessName",
    "EffectiveDate": "$data.block-quote.EffectiveDate",
    "QuoteNo": "$data.block-quote.CarrierQuoteNumber",
    "ReferenceNo": "$data.block-quote.CarrierReferenceNumber",
    "TransactionType": {
      $cond: {
        if: { $eq: ["$data.block-quote.IsRenewable", "Y"] },
        then: "Renewal",
        else: "New Business"
      }
    },
    "PolicyStatus": {
      $cond: {
        if: { $eq: ["$data.block-quote.PolicyStatus", 1] },
        then: "Not Issued",
        else: {
          $cond: {
            if: { $eq: ["$data.block-quote.PolicyStatus", 2] },
            then: "Issued",
            else: "Cancelled"
          }
        }
      }
    },
    "Coverages": "$data.coverage-selection.Coverages",
    "ProposalNo": "$data.block-quote.ProposalNo"
  }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);
};
var issuedData = async (page, limit = 10, query) => {
  const skip = (page - 1) * limit;
  return await policiesModel.find(query, {
    "CreatedAt": "$meta.createdAt",
    "BusinessName": "$data.quote-summary.BusinessName",
    "EffectiveDate": "$data.quote-summary.EffectiveDate",
    "ExpiryDate": "$data.quote-summary.ExpiryDate",
    "ReferenceNo": "$data.quote-summary.CarrierReferenceNumber",
    "TransactionType": {
      $cond: {
        if: { $eq: ["$data.quote-summary.IsRenewable", "Y"] },
        then: "Renewal",
        else: "New Business"
      }
    },
    "PolicyStatus": {
      $cond: {
        if: { $eq: ["$data.quote-summary.PolicyStatus", 1] },
        then: "Not Issued",
        else: {
          $cond: {
            if: { $eq: ["$data.quote-summary.PolicyStatus", 2] },
            then: "Issued",
            else: "Cancelled"
          }
        }
      }
    },
    "Coverages": "$data.coverage-selection.Coverages",
    "PolicyNo": "$data.quote-summary.PolicyNo",
    "NetPremium": "$data.quote-summary.DuePremium",
    "NetCommission": {
      $add: [
        { $ifNull: [{ $toDouble: "$data.quote-summary.BrokerFee" }, 0] },
        { $ifNull: [{ $toDouble: "$data.quote-summary.GSTBrokerFee" }, 0] }
      ]
    }
  }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);
};
var periodPayment = async (data) => {
  const createdQuote = await periodPaymentModel.create(data);
  return createdQuote._id;
};
var filterPoliciesQuery = async (queryObject, type, filters = {}) => {
  const query = queryObject;
  if (type === "quoted") {
    if (filters.name) {
      query["data.create-quote.BusinessName"] = {
        $regex: filters.name,
        $options: "i"
      };
    }
    if (filters.num) {
      query["data.create-quote.CarrierQuoteNumber"] = {
        $regex: filters.num,
        $options: "i"
      };
    }
    if (filters.effectiveAt) {
      query["data.create-quote.EffectiveDate"] = {
        $eq: filters.effectiveAt
      };
    }
  }
  if (type === "blocked") {
    if (filters.name) {
      query["data.block-quote.BusinessName"] = {
        $regex: filters.name,
        $options: "i"
      };
    }
    if (filters.num) {
      query["data.block-quote.CarrierQuoteNumber"] = {
        $regex: filters.num,
        $options: "i"
      };
    }
    if (filters.effectiveAt) {
      query["data.block-quote.EffectiveDate"] = {
        $eq: filters.effectiveAt
      };
    }
  }
  if (type === "issued") {
    if (filters.name) {
      query["data.quote-summary.BusinessName"] = {
        $regex: filters.name,
        $options: "i"
      };
    }
    if (filters.num) {
      query["data.quote-summary.PolicyNo"] = {
        $regex: filters.num,
        $options: "i"
      };
    }
    if (filters.effectiveAt) {
      query["data.quote-summary.EffectiveDate"] = {
        $eq: filters.effectiveAt
      };
    }
  }
  if (filters.createdAt) {
    const startDate = new Date(filters.createdAt);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    query["meta.createdAt"] = {
      $gte: startDate,
      $lt: endDate
    };
  }
  return query;
};
















exports.policiesModel = policiesModel; exports.createQuoteDebug = createQuoteDebug; exports.createQuoteResponseDebugModelQuote = createQuoteResponseDebugModelQuote; exports.policies = policies; exports.policiesGet = policiesGet; exports.policiesDelete = policiesDelete; exports.policiesUpdateCreateQuote = policiesUpdateCreateQuote; exports.policiesUpdateBlockQuote = policiesUpdateBlockQuote; exports.policiesUpdateFullQuote = policiesUpdateFullQuote; exports.quotedData = quotedData; exports.blockedData = blockedData; exports.issuedData = issuedData; exports.periodPayment = periodPayment; exports.filterPoliciesQuery = filterPoliciesQuery;
//# sourceMappingURL=chunk-JI2CNXVD.js.map