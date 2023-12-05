import db from "@database";
import { User } from "@entities";
import { FastifyReply, FastifyRequest } from "fastify";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDomainService from "src/services/domain/Product";
import { CustomerOrderHistoryByDeliveryStatusRequest } from "src/services/models/Transaction";
import * as z from "zod";

export async function getProducstHandler(request: FastifyRequest, reply: FastifyReply) {
    const product = await ProductDomainService.getProducts();
    reply.send(product);
}

export async function CustomerOrderHistoryByDeliveryStatusHandler(request: FastifyRequest, reply: FastifyReply) {
    const {status} = request.body as CustomerOrderHistoryByDeliveryStatusRequest;
    // todo: tambahkan userid 

    const deliveryStatus = z.enum(['pending', 'packed', 'onway', 'finished', 'cancel']);

    await deliveryStatus.parse(status);

    const orderHistory = await TransactionDomainService.CustomerOrderHistoryByDeliveryStatusDomain(status);

    reply.send(orderHistory);
}