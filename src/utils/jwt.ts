import jwt from "jsonwebtoken"

type JwtPayload = { 
    user_id: number;
    user_level: number;
}


type SignTokenPayload = JwtPayload & { expiresIn?: number | string } 

export async function signToken({expiresIn = '1d', ...payload}: SignTokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn })
}

export async function verifyToken(token: string){
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
}