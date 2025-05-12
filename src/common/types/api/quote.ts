export interface TokenDetail {

    "access_token": string;
    "expire_in": number;
    "message": string;
    "retry_times": number;
    "authResult": boolean;
    "auth_result": boolean;
    "trace_id": string;


}


export interface QuoteErrorMessage {
    CloverErrorResponse: CloverErrorResponse;
    ErrorMessage: string;
    Status: string;
}

export interface CloverErrorResponse {
    quoteNumber: string;
    reasons: Reason[];
    statusCode: string;
}

export interface Reason {
    category: string;
    categoryCode: string;
    description: string;
    hasReplicated: boolean;
    ratedIndicator: boolean;
    ruleType: string;
    sectionCode: string;
    value: string;
}


export interface CreateQuoteTypes {
    AgentFees: number;
    GSTAgentFee: number;
    BrokerFee: number;
    GSTBrokerFee: number;
    DuePremium: number;

    BrokerCommission: number;
    GSTBrokerCommission: number;

    ProposalNo: string;

    IsRenewable: "Y" | "N";
    PolicyLobList: {
        PolicyRiskList: {
            FullAddress: string;
            PolicyCoverageList: {
                ProductElementCode: string;
                GST: number;
                StandardNetPremium: number;
                EmergencyServiceLevy: number;
                StampDuty: number;
            }[]
        }[]
    }[]
}


export interface BlockQuoteTypes extends CreateQuoteTypes {
    CarrierPolicyStatus: string;
    EffectiveDate: string;
    ExpiryDate: string;
    CarrierQuoteNumber: string;
    BusinessName: string;
}