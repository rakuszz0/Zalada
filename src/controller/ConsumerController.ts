import { FastifyReply, FastifyRequest } from "fastify";
import * as ProductDomainService from "src/services/domain/Product";

export async function getProducstHandler(request: FastifyRequest, reply: FastifyReply) {
    const product = await ProductDomainService.getProducts();
    reply.send(product);
}
