import { JWK, JWTPayload, jwtVerify, KeyLike, SignJWT } from 'jose'
import { env } from '@/common/config/env'

type JWTActionType = "Decrypt" | "Encrypt"

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    SIGNUP_VERIFICATION_TOKEN_SECRET,
    LOGIN_VERIFICATION_TOKEN_SECRET,
    FORGOT_VERIFICATION_TOKEN_SECRET
} = env

export const keyEncoder = (key: string) => {
    return new TextEncoder().encode(key)
}

export const jwtEncrypt = async (payload: JWTPayload, exp: string | number | Date, Secret: KeyLike | Uint8Array | JWK) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(Secret)
}


export async function jwtDecrypt(input: string, Secret: KeyLike | Uint8Array | JWK) {
    const { payload } = await jwtVerify(input, Secret, {
        algorithms: ['HS256'],
    })

    return payload
}


export const SignUpToken = async (type: JWTActionType, payload: JWTPayload | string) => {

    if (type === "Decrypt" && typeof payload === 'string') {
        return await jwtDecrypt(payload, keyEncoder(SIGNUP_VERIFICATION_TOKEN_SECRET))
    }

    return await jwtEncrypt(payload as JWTPayload || {}, '30d', keyEncoder(SIGNUP_VERIFICATION_TOKEN_SECRET))

}

export const LoginToken = async (type: JWTActionType, payload: JWTPayload | string) => {

    if (type === "Decrypt" && typeof payload === 'string') {
        return await jwtDecrypt(payload, keyEncoder(LOGIN_VERIFICATION_TOKEN_SECRET))
    }

    return await jwtEncrypt(payload as JWTPayload || {}, '1d', keyEncoder(LOGIN_VERIFICATION_TOKEN_SECRET))

}

export const AccessToken = async (type: JWTActionType, payload: JWTPayload | string) => {

    if (type === "Decrypt" && typeof payload === 'string') {
        return await jwtDecrypt(payload, keyEncoder(ACCESS_TOKEN_SECRET))
    }

    return await jwtEncrypt(payload as JWTPayload || {}, '2d', keyEncoder(ACCESS_TOKEN_SECRET))

}

export const RefreshToken = async (type: JWTActionType, payload: JWTPayload | string) => {

    if (type === "Decrypt" && typeof payload === 'string') {
        return await jwtDecrypt(payload, keyEncoder(REFRESH_TOKEN_SECRET))
    }

    return await jwtEncrypt(payload as JWTPayload || {}, '2d', keyEncoder(REFRESH_TOKEN_SECRET))

}


export const ForgotToken = async (type: JWTActionType, payload: JWTPayload | string) => {

    if (type === "Decrypt" && typeof payload === 'string') {
        return await jwtDecrypt(payload, keyEncoder(FORGOT_VERIFICATION_TOKEN_SECRET))
    }

    return await jwtEncrypt(payload as JWTPayload || {}, '1d', keyEncoder(FORGOT_VERIFICATION_TOKEN_SECRET))

}
