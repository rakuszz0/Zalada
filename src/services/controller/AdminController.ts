import { FastifyRequest } from "fastify";


export async function Hello(request: FastifyRequest) {
    return { message: "Hello" }
}