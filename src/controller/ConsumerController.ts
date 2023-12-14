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
        const payment = await TransactionDomainService.paymentOrderDomain({amount, order_no, customer_id})

        return {message: payment}
    } catch (error) {
        throw error
    }
}