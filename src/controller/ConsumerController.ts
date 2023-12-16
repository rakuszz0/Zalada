import db from "@database"
import { FastifyReply, FastifyRequest } from "fastify";
import { RequestError } from "src/config/error";
import * as ProductDomainService from "src/services/domain/Product";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as UserDomainService from "src/services/domain/User";
import * as CartDomainService from "src/services/domain/Cart";
import * as UserDto from "src/services/models/User";
import * as TransactionDto from "src/services/models/Transaction";
import * as CartDto from "src/services/models/Cart";
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

export async function changePassword(request: FastifyRequest) {
    try {
        const { old_password, new_password, password_confirmation } = request.body as UserDto.ChangePassRequest
        const user = request.user
        const changePassword = await UserDomainService.changePasswordDomain({
            old_password, new_password, password_confirmation, user_id: user.id
        })

        return { message: changePassword }
    } catch (error) {
        throw (error)
    }
}

export async function registerHandler(request: FastifyRequest) {
    try {
        const { username, email, password, password_confirmation, phone_number, address, first_name, last_name } = request.body as UserDto.RegisterRequest;

        if (password != password_confirmation) {
            throw new RequestError("CONFIRMATION_PASSWORD_DOES_NOT_MATCH");
        }

        const checkEmail = await UserDomainService.checkEmailExistDomain(email)

        if (checkEmail) {
            throw new RequestError("EMAIL_ALREADY_EXIST")
        }

        const hashPassword = await Bcrypt.hashPassword(password);

        await UserDomainService.registerDomain({
            username,
            email,
            first_name,
            last_name,
            password: hashPassword,
            phone_number,
            address,
        })


        return { message: true }
    } catch (error) {
        throw error
    }

}

export async function createOrderHandler(request: FastifyRequest, reply: FastifyReply) {
    const { id: customer_id } = request.user
    const { order, payment_type } = request.body as TransactionDto.CreateOrderRequest
    try {
        const transaction = await TransactionDomainService.createTransactionDomain({customer_id, order, payment_type})

        reply.code(201).send({ message: transaction })
    } catch (error) {
        throw error  
    }
}

export async function getPaymentTypesHandler() {
    try {
        const payments = await TransactionDomainService.getPaymentTypesDomain()
        return {message: payments}
    } catch (error) {
        throw error
    }
}


export async function TransactionHistoryHandler(request: FastifyRequest, reply: FastifyReply) {
    // const user = request.user;
    const {status} = request.body as TransactionDto.TransactionHistoryRequest;
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

export async function addProductToCart(request: FastifyRequest) {
    try {
        const {product_id, quantity} = request.body as CartDto.AddProductToCartRequest
        const user = request.user

        await CartDomainService.AddProductToCartDomain({
            product_id,
            quantity,
            userid: user.id
        })

        return { message: true }
    } catch (error){
        throw (error)
    }}

export async function getOrderDetailsHandler(request: FastifyRequest) {
    try {
        const {id: customer_id} = request.user
        const {order_no} = request.params as TransactionDto.GetOrderDetailsRequest
        const transaction = await TransactionDomainService.getTransactionDetailsDomain({customer_id, order_no})

        return {message: transaction}
    } catch (error) {
        throw error
    }
}