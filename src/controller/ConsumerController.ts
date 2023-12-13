import db from "@database";
import { User } from "@entities";
import { FastifyReply, FastifyRequest } from "fastify";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDomainService from "src/services/domain/Product";
import { CustomerOrderHistoryByDeliveryStatusRequest, CustomerOrderHistoryByDeliveryStatusParams } from "src/services/models/Transaction";
import * as z from "zod";

export async function getProducstHandler(request: FastifyRequest, reply: FastifyReply) {
    const product = await ProductDomainService.getProducts();
    reply.send(product);
}

export async function CustomerOrderHistoryByDeliveryStatusHandler(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user;
    const {status} = request.body as CustomerOrderHistoryByDeliveryStatusRequest;
    const userid = user.user_id;

    if(status){
        reply.send(await TransactionDomainService.CustomerOrderHistoryByDeliveryStatusDomain({
            userid,
            status
        }))
    }else{
        reply.send(await TransactionDomainService.CustomerOrderHistoryByDeliveryStatusDomain({
            userid
        }))
    }

}