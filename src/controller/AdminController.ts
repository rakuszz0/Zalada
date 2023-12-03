import { FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";

export async function Hello(request: FastifyRequest) {
    return { message: "Hello" }
}

export async function getUsersHandler() {
    const users = await UserDomainService.getUsersDomain()
    return users
}