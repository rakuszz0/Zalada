import { FastifyRequest } from "fastify";
import * as UserRepository from "src/services/repository/User";
import * as Jwt from "src/utils/jwt";
import { ForbiddenAccessError, UnathorizedError } from "./error";
import { User } from "src/services/models/User";

declare module "fastify" {
    interface FastifyRequest {
        user: User
    }
}

export async function CheckAuth(request: FastifyRequest) {
    const token = request.headers["authorization"]

    if (token == undefined) {
        throw new UnathorizedError("TOKEN_NOT_FOUND")
    }

    const jwtPayload = await Jwt.verifyToken(token)

    const user = await UserRepository.DBCheckUserExist(jwtPayload.user_id);

    if (user == undefined) {
        throw new UnathorizedError("USER_NOT_EXIST")
    }

    request.user = user[0];
}

export function CheckRoles(role: number[]){
    return async (request: FastifyRequest) => {
        const user = request.user;

        if(!role.includes(user.user_level)){
            throw new UnathorizedError("FORBIDDEN_ACCESS");
        }
    }
}


export function CheckRules(...rules: number[]) {
    return async (request: FastifyRequest) => {
        const user = request.user
        const access = await UserRepository.DBGetUserRules(user.id)
        const isVerified = rules.some(rule => access.includes(rule))

        if(!isVerified) {
            throw new ForbiddenAccessError("FORBIDDEN_ACCESS")
        }
    }
} 