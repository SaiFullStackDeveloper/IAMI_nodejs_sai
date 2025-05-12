"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('../../../chunk-PR4QN5HX.js');

// src/common/models/mongoDB/commissionConfiguration.ts
var _mongoose = require('mongoose');
var commissionSchema = new (0, _mongoose.Schema)(
  {
    Liability: Number,
    Property: Number,
    AgentFees: Number,
    BrokerFees: Number,
    type: { type: String, default: "commission" }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);
var commissionModel = _mongoose.model.call(void 0, "settings", commissionSchema);
var updateCommission = async (data) => {
  try {
    const existingRecord = await commissionModel.findOne();
    if (existingRecord) {
      const updatedRecord = await commissionModel.findOneAndUpdate(
        { _id: existingRecord._id },
        // Find the existing record by ID
        { $set: data },
        // Update fields with the provided data
        { new: true }
        // Return the updated document
      );
      return updatedRecord;
    } else {
      const newRecord = await commissionModel.create(data);
      return newRecord;
    }
  } catch (error) {
    throw new Error(`Failed to update or create commission`);
  }
};
var getCommissionRecords = async () => {
  return await commissionModel.find({ type: "commission" });
};



exports.getCommissionRecords = getCommissionRecords; exports.updateCommission = updateCommission;
//# sourceMappingURL=commissionConfiguration.js.map