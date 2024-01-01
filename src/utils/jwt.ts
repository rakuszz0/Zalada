import jwt from "jsonwebtoken"
import { UnathorizedError } from "src/config/error";

type JwtPayload = { 
    user_id: number;
    user_level: number;
}


type SignTokenPayload = JwtPayload & { expiresIn?: number | string } 

export async function signToken({expiresIn = '1d', ...payload}: SignTokenPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn })
}

export async function verifyToken(token: string){
    return new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, undefined, (error, decoded) => {
            if(error) {
                reject(new UnathorizedError(error.name))
            } else {
                resolve(decoded as JwtPayload)
            }
        })
    })
}