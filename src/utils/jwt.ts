import { rejects } from "assert";
import jwt, {Secret} from "jsonwebtoken"

type JwtPayload = { 
    user_id: number;
    user_level: number;
}

export async function signToken(payload: JwtPayload, privateKey: Secret, expiresIn?: string) {
    return jwt.sign(payload, privateKey, { expiresIn })
    
}

export async function verifyToken(token: string, secret: string){
    return jwt.verify(token, secret) as JwtPayload;
}