import { FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";
import { AddProductByAdmin } from "src/services/models/User";
import * as UserTypes from "src/services/models/User/type"


export async function Hello(request: FastifyRequest) {
    return { message: "Hello" }
}

export async function getUsersHandler() {
    const users = await UserDomainService.getUsersDomain()
    return users
}

export async function addProductsHandler(request: FastifyRequest) {
    const {name,stock,description,price} = request.body as AddProductByAdmin
    const addProducts = await UserDomainService.addProductByAdmin({
        name, stock, description, price,
        id: 0,
        store_id: 0
    })

    return addProducts
}