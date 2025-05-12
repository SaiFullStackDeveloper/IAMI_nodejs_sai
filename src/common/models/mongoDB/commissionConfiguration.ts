import { UserTypes } from '@/common/types/user'
import { Schema, model } from 'mongoose'

const commissionSchema = new Schema(
    {
        Liability: Number,
        Property: Number,
        AgentFees: Number,
        BrokerFees: Number,
        type: { type: String, default: 'commission' },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    }
);


const commissionModel = model('settings', commissionSchema)

export const updateCommission = async (data: Object) => {
    try {
        const existingRecord = await commissionModel.findOne(); // Check if a record exists

        if (existingRecord) {
            // Update the existing record
            const updatedRecord = await commissionModel.findOneAndUpdate(
                { _id: existingRecord._id }, // Find the existing record by ID
                { $set: data },              // Update fields with the provided data
                { new: true }                // Return the updated document
            );
            return updatedRecord;
        } else {
            // No record exists, create a new one
            const newRecord = await commissionModel.create(data);
            return newRecord;
        }
    } catch (error) {
        throw new Error(`Failed to update or create commission`);
    }
};


export const getCommissionRecords = async () => {
    return await commissionModel.find({ type: 'commission' });
}