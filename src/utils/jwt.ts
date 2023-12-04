import jwt from "jsonwebtoken"

type JwtPayload = { user_id: number }

export async function signToken(payload: JwtPayload, expiresIn?: number | "1d") {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn })
}

export async function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload
}