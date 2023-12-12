import { FastifyReply, FastifyRequest } from "fastify";
import { RequestError, ServerError } from "src/config/error";
import * as ProductDomainService from "src/services/domain/Product";
import * as UserDomainService from "src/services/domain/User";
import * as UserDto from "src/services/models/User";
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

export async function registerHandler(request: FastifyRequest) {
    try {
        const { username, email, password, password_confirmation, phone_number, address, first_name, last_name } = request.body as UserDto.RegisterRequest;

        if(password != password_confirmation){
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


        return {message: true}
    } catch (error) {
        throw error
    }

}