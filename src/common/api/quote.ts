import axios from "axios";
import { env } from "@/common/config/env";
import { QuoteErrorMessage, TokenDetail } from "../types/api/quote";
import { convertDateFormat } from "../utils/date";
import { logger } from "@/server";


const {
    INSUREMO_API,
    INSUREMO_USERNAME,
    INSUREMO_PASSWORD,
    INSUREMO_CLIENT_ID,
    INSUREMO_TENANT_ID,
    INSUREMO_TENANT_CODE,
    INSUREMO_SOURCE_ID,
    INSUREMO_SERVER
} = env

export async function GETQuoteToken(): Promise<[TokenDetail | null, null | string]> {


    try {

        const res = await axios({
            method: "POST",
            url: `${INSUREMO_API}/cas/ebao/v2/json/tickets`,
            headers: {
                'Content-Type': 'application/json',
                "x-ebao-tenant-code": INSUREMO_TENANT_CODE,
                "x-mo-user-source-id": INSUREMO_SOURCE_ID,
                "x-mo-client-id": INSUREMO_CLIENT_ID,
                "x-mo-tenant-id": INSUREMO_TENANT_ID,
            },
            data: {
                "username": INSUREMO_USERNAME,
                "password": INSUREMO_PASSWORD
            }
        })



        return [res.data, null]
    } catch (error) {
        const errorMessage = `GETQuoteToken: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}


export async function SubmitCreateQuote(
    token: string,
    data: Object
): Promise<[Object | null, null | string]> {

    try {
        const res = await axios({
            method: "POST",
            url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/createQuote`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
                "X-ebao-tenant-code": INSUREMO_TENANT_CODE,
            },
            data: JSON.stringify(data)
        })

        return [res.data, null]
    } catch (error) {
        const errorMessage = `SubmitCreateQuote: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}


export async function SubmitFullQuote(
    token: string,
    data: Object
): Promise<[Object | null, null | string]> {


    try {

        const res = await axios({
            method: "POST",
            url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/fullQuote`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
                "X-ebao-tenant-code": INSUREMO_TENANT_CODE,
            },
            data: JSON.stringify(data)
        })

        return [res.data, null]
    } catch (error) {
        const errorMessage = `SubmitFullQuote: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}


export async function SubmitBlockQuote(
    token: string,
    data: string
): Promise<[Object | null, null | string]> {

    try {

        const res = await axios({
            method: "POST",
            url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/blockQuote`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
                "X-ebao-tenant-code": INSUREMO_TENANT_CODE,
            },
            data: {
                "ProposalNo": data
            }
        })


        return [res.data, null]
    } catch (error) {
        const errorMessage = `SubmitBlockQuote: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}



export async function SubmitIssueQuote(
    token: string,
    data: {
        ProposalNo: string,
        RefNo: string,
        Name: string,
        Amount: string
    }
): Promise<[Object | null, null | string]> {

    try {

        const res = await axios({
            method: "POST",
            url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/issueQuote`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
                "X-ebao-tenant-code": INSUREMO_TENANT_CODE,
            },
            data: {
                "ProposalNo": data.ProposalNo,
                "PolicyPaymentInfoList": [
                    {
                        "ReferenceNo": data.RefNo,
                        "PaidTime": convertDateFormat(new Date()),
                        "PayeeName": data.Name,
                        "PaidAmount": data.Amount
                    }
                ]
            }
        })

        return [res.data, null]
    } catch (error) {
        const errorMessage = `SubmitIssueQuote: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}