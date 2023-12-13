import db from "@database";
import { User } from "@entities";
import { FastifyReply, FastifyRequest } from "fastify";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDomainService from "src/services/domain/Product";
import { TransactionHistoryRequest } from "src/services/models/Transaction";
import * as z from "zod";

export async function getProducstHandler(request: FastifyRequest, reply: FastifyReply) {
    const product = await ProductDomainService.getProducts();
    reply.send(product);
}

export async function TransactionHistoryHandler(request: FastifyRequest, reply: FastifyReply) {
    // const user = request.user;
    const {status} = request.body as TransactionHistoryRequest;
    // const userid = user.id;

    if(status){
        return await TransactionDomainService.TransactionHistoryDomain({
            userid: 6,
            status
        })
    }else{
        return await TransactionDomainService.TransactionHistoryDomain({
            userid: 6
        })
    }

}