import { UserSessionTypes } from '@/common/types/user'
import { Schema, model } from 'mongoose'

// Schemas

const createQuoteDebugSchema = new Schema(
    {}, { strict: false }
)

const policiesSchema = new Schema(
    {}, { strict: false }
)

const createQuoteResponseDebugSchema = new Schema(
    {}, { strict: false }
)

const periodPaymentSchema = new Schema(
    {}, { strict: false }
)

// Models

const createQuoteDebugModel = model('CreateQuote-Debug', createQuoteDebugSchema)
const createQuoteResponseDebugModel = model('CreateResponseQuote-Debug', createQuoteResponseDebugSchema)
export const policiesModel = model('Policies', policiesSchema)
const periodPaymentModel = model('PeriodPayment', periodPaymentSchema)

// Function 

export const createQuoteDebug = async (data: Object) => {
    return await createQuoteDebugModel.create(data)
}

export const createQuoteResponseDebugModelQuote = async (data: Object) => {
    const createdQuote = await createQuoteResponseDebugModel.create(data)
    return createdQuote._id
}

export const policies = async (data: Object) => {
    const createdQuote = await policiesModel.create(data)
    return createdQuote._id
}

export const policiesGet = async (id: string, email: string) => {
    return await policiesModel.findOne({ _id: id, "meta.email": email }) as {
        _id: string,
        meta: Object,
        data: Object,
        status: Object
    };
}

export const policiesDelete = async (id: string, email: string) => {
    return await policiesModel.deleteOne({ _id: id, "meta.email": email })
}

export const policiesUpdateCreateQuote = async (id: string, data: {
    data: Object,
    status: Object[]
}) => {
    const { "form-id": _, ...filteredData } = data.data as any;

    return await policiesModel.updateOne({ _id: id }, {
        $set: {
            "data": filteredData,
            "status": data.status,
            "meta.createdAt": new Date()
        }
    })
}

export const policiesUpdateBlockQuote = async (id: string, summary: Object, blockquote: Object, status: Object[]) => {
    return await policiesModel.updateOne({ _id: id }, {
        $set: {
            "data.premium-summary": summary,
            "data.block-quote": blockquote,
            "status": status
        }
    })
}

export const policiesUpdateFullQuote = async (id: string, quote: Object) => {
    return await policiesModel.updateOne({ _id: id }, {
        $set: {
            "data.quote-summary": quote,
            "status.3.status": "completed",
            "payment": true,
        }
    })
}

export const quotedData = async (page: number, limit: number = 10, query: Object) => {

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
        "Coverages": "$data.coverage-selection.Coverages",
    }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);

}

export const blockedData = async (page: number, limit: number = 10, query: Object) => {

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
        "ProposalNo": "$data.block-quote.ProposalNo",
    }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);

}

export const issuedData = async (page: number, limit: number = 10, query: Object) => {



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
        },
    }).sort({ "meta.createdAt": -1 }).skip(skip).limit(limit);

}


export const periodPayment = async (data: Object) => {
    const createdQuote = await periodPaymentModel.create(data)
    return createdQuote._id
}


// ...existing code...

export const filterPoliciesQuery = async (
    queryObject: Object,
    type: "quoted" | "blocked" | "issued",
    filters: {
        name?: string,
        num?: string,
        effectiveAt?: string,
        createdAt?: string,
    } = {}
) => {

    const query: any = queryObject;

    if (type === 'quoted') {

        if (filters.name) {
            query["data.create-quote.BusinessName"] = {
                $regex: filters.name,
                $options: 'i'
            };
        }

        if (filters.num) {
            query["data.create-quote.CarrierQuoteNumber"] = {
                $regex: filters.num,
                $options: 'i'
            };
        }

        if (filters.effectiveAt) {

            query["data.create-quote.EffectiveDate"] = {
                $eq: filters.effectiveAt,
            };

        }

    }


    if (type === 'blocked') {

        if (filters.name) {
            query["data.block-quote.BusinessName"] = {
                $regex: filters.name,
                $options: 'i'
            };
        }

        if (filters.num) {
            query["data.block-quote.CarrierQuoteNumber"] = {
                $regex: filters.num,
                $options: 'i'
            };
        }

        if (filters.effectiveAt) {

            query["data.block-quote.EffectiveDate"] = {
                $eq: filters.effectiveAt,
            };

        }

    }


    if (type === 'issued') {

        if (filters.name) {
            query["data.quote-summary.BusinessName"] = {
                $regex: filters.name,
                $options: 'i'
            };
        }

        if (filters.num) {
            query["data.quote-summary.PolicyNo"] = {
                $regex: filters.num,
                $options: 'i'
            };
        }

        if (filters.effectiveAt) {

            query["data.quote-summary.EffectiveDate"] = {
                $eq: filters.effectiveAt,
            };

        }

    }



    if (filters.createdAt) {

        // Get the start of the day in UTC
        const startDate = new Date(filters.createdAt);
        startDate.setUTCHours(0, 0, 0, 0);

        // Get the start of the next day in UTC
        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        // Use range query with $gte and $lt (not $lte)
        query["meta.createdAt"] = {
            $gte: startDate,
            $lt: endDate
        };

    }

    return query;

}