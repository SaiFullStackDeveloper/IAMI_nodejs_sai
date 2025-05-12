export type ChainHatTokenTypes = {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    "not-before-policy": number;
    scope: string;
    user_journey_type: string;
}



export interface AddressDetailsTypes {
    messageInformation: MessageInformation;
    providerRequest: null;
    providerResponse: ProviderResponse;
    errorList: null;
    warningList: null;
    addressInfo: AddressInfo[];
}

export interface AddressInfo {
    id: null;
    freeFormAddress: string;
    unitNumber: string;
    addressLine1: string;
    addressLine2: string;
    street: string;
    locality: null;
    city: string;
    county: null;
    province: string;
    name: null;
    postalCode: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    matchStatus: null;
    partialSearchFlag: null;
    minFuzzyLevel: null;
    maxFuzzyLevel: null;
    gnafPid: null;
    addressIdentifier: string;
}

export interface MessageInformation {
    businessPurposeTypeCode: null;
    sequenceNumber: null;
    trackingNumber: null;
    sender: null;
    receiver: null;
    messageStatus: MessageStatus;
    userInfo: null;
    channelType: null;
}

export interface MessageStatus {
    statusCode: number;
    statusDescription: string;
    successStatusCode: null;
    errors: null;
}

export interface ProviderResponse {
    CustomerKey: null;
    Find_Address: string;
    GNAF_PID: string;
    GNAF_Address: string;
    ConfidenceScore: string;
    Elements: Element[];
    JsonElements: string;
}

export interface Element {
    Product: Product;
    Field: string;
    Value: string;
}

export enum Product {
    Base = "Base",
    BushfireV2 = "bushfire_v2",
    BushfireV21 = "bushfire_v2_1",
    CoastalV2 = "coastal_v2",
    CycloneV2 = "cyclone_v2",
    DefindDemo = "DefindDemo",
    FincycloneV20_201911 = "fincyclone_v2_0_201911",
    FinfloodV11_201911 = "finflood_v1_1_201911",
    Finpoint = "finpoint",
    FinstormV10_201911 = "finstorm_v1_0_201911",
    FloodV2 = "flood_v2",
    FloodV20 = "flood_v2_0",
    FloodV3 = "flood_v3",
    Gnaf = "GNAF",
    StormV2 = "storm_v2",
    StormV20 = "storm_v2_0",
}
