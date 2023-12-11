import db from "@database"
import { FastifyReply, FastifyRequest } from "fastify";
import { RequestError } from "src/config/error";
import * as ProductDomainService from "src/services/domain/Product";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as UserDomainService from "src/services/domain/User";
import * as UserDto from "src/services/models/User";
import * as TransactionDto from "src/services/models/Transaction";
import * as Jwt from "src/utils/jwt";
import * as Bcrypt from "src/utils/password";


export async function getProductHandler() {
    try {
        const product = await ProductDomainService.getProductsDomain();
        return product
    } catch (error) {
        throw error
    }

}

export async function loginHandler(request: FastifyRequest) {
    try {
        const { email, password } = request.body as UserDto.LoginRequest

        const user = await UserDomainService.checkUserExistByEmailDomain(email)

        const isPassword = await Bcrypt.checkPassword({ hash: user.password, password })

        if(!isPassword) {
            throw new RequestError("INVALID_CREDENTIALS")
        }

        const token = await Jwt.signToken({user_id: user.id, user_level: user.user_level})

        return {message: token}
    } catch (error) {
        throw error
    }

}

export async function orderProductsHandler(request: FastifyRequest, reply: FastifyReply) {
    const { id: customer_id } = request.user
    const { order, payment_type } = request.body as TransactionDto.CreateOrderRequest
    const order_no = `ORD/${customer_id}/${Date.now()}`

    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    try {
        await queryRunner.startTransaction()

        let total_price = 0
        let stock: any  = {}

        await TransactionDomainService.checkPaymentExistDomain(payment_type)

        // If user order more than 1 type of product
        if(Array.isArray(order)) {
            for (const item of order) {
                const product = await ProductDomainService.checkProductExistDomain(item.product_id)

                if (product.stock < item.quantity) {
                    throw new RequestError(`${product.name.toUpperCase()}_QUANTITY_EXCEEDS_STOCK`)
                }

                await TransactionDomainService.createTransactionDomain({ customer_id, order_no, payment_type, product_id: product.id, quantity: item.quantity, status: TransactionDto.TransactionStatus.PENDING }, queryRunner)

                await ProductDomainService.updateStockProduct({ product_id: product.id, stock: product.stock - item.quantity }, queryRunner)

                stock[product.name] = product.stock - item.quantity

                total_price += product.price * item.quantity
            }
        } else {
            const product = await ProductDomainService.checkProductExistDomain(order.product_id)

            if (product.stock < order.quantity) {
                throw new RequestError("QUANTITY_EXCEEDS_STOCK")
            }

            total_price += product.price * order.quantity

            stock = product.stock - order.quantity

            await TransactionDomainService.createTransactionDomain({ customer_id, order_no, payment_type, product_id: product.id, quantity: order.quantity, status: TransactionDto.TransactionStatus.PENDING }, queryRunner)

            await ProductDomainService.updateStockProduct({ product_id: product.id, stock: product.stock - order.quantity }, queryRunner)
        }

        await queryRunner.commitTransaction()

        reply.code(201).send({ message: { order_no, total_price, stock } })
    } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error  
    } finally {
        await queryRunner.release()
    }
}

export async function getPaymentTypesHandler() {
    try {
        const payments = await TransactionDomainService.getPaymentTypesDomain()
        return payments
    } catch (error) {
        throw error
    }
}