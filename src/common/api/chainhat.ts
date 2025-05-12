import axios from "axios";
import { env } from "@/common/config/env";
import { AddressDetailsTypes, ChainHatTokenTypes } from "../types/api/chainhat";
import { logger } from "@/server";


const {
    AUSTRALIA_EAST_CHAINTHAT,
    AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID,
    AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET,
    AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
    AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE
} = env

export async function GetChainHatToken(): Promise<[ChainHatTokenTypes | null, null | string]> {

    try {

        const res = await axios({
            method: "POST",
            url: `${AUSTRALIA_EAST_CHAINTHAT}/auth/realms/onepatch/protocol/openid-connect/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-ebao-tenant-Id": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
                "X-ebao-tenant-code": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE,
            },
            data: new URLSearchParams({
                "grant_type": "client_credentials",
                "client_id": AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID,
                "client_secret": AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET
            })
        })

        return [res.data, null]
    } catch (error) {
        const errorMessage = `GetChainHatToken: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}


export async function GetAddressDetails(
    token: string,
    id: string
): Promise<[AddressDetailsTypes | null, null | string]> {

    try {

        const res = await axios({
            method: "POST",
            url: `${AUSTRALIA_EAST_CHAINTHAT}/connector-api/route/addressSearch/v1/address`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "X-ebao-tenant-Id": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
                "X-ebao-tenant-code": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE,
            },
            data: JSON.stringify({
                "address": {
                    "gnafPid": id
                },
                "typeOfRequest": "GNF_TOKEN"
            })
        })

        return [res.data, null]
    } catch (error) {
        const errorMessage = `GetAddressDetails: $${(error as Error).message}`;
        logger.error(errorMessage);
        return [null, (error as Error).message]
    }

}