import { env } from "@/common/utils/envConfig";
import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { AccessTokenPayload, RefreshTokenPayload } from "./users.model";

const accessSecret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
const refreshSecret = new TextEncoder().encode(env.REFRESH_TOKEN_SECRET)

export const generateAccessToken = async (payload: AccessTokenPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10m")
        .sign(accessSecret)
}

export const generateRefreshToken = async (payload: RefreshTokenPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(refreshSecret)
}


export const getPayloadFromRefreshToken = async (token: string) => {
    const { payload } = await jwtVerify(token, refreshSecret)
    return payload;
}

export const getPayloadFromAccessToken = async (token: string) => {
    const { payload } = await jwtVerify(token, accessSecret)
    return payload;
}