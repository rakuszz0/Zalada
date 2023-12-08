import { FastifyReply, FastifyRequest } from "fastify";
import { RequestError } from "src/config/error";
import * as ProductDomainService from "src/services/domain/Product";
import * as UserDomainService from "src/services/domain/User";
import * as UserDto from "src/services/models/User";
import * as TransactionDto from "src/services/models/Transaction";
import * as Jwt from "src/utils/jwt";
import * as Bcrypt from "src/utils/password";
import * as TransactionDomainService from "src/services/domain/Transaction";


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

export async function paymentOrderHandler(request: FastifyRequest) {
    try {
        const { id: customer_id } = request.user
        const { amount, order_no } = request.body as TransactionDto.PaymentOrderRequest

        // Check Pending Order 
        const order = await TransactionDomainService.checkOrderExistDomain({ order_no, status: TransactionDto.TransactionStatus.PENDING, customer_id })

        // Total amount price from order
        const total_price = order.map(v => v.price * v.quantity).reduce((acc, curr) => acc + curr, 0)

        if (total_price != amount) {
            throw new RequestError("INVALID_AMOUNT")
        }

        // Update order to packing
        await TransactionDomainService.updateOrderStatusDomain({ order_no, status: TransactionDto.TransactionStatus.PACKING })

        return { message: true }
    } catch (error) {
        throw error
    }
}