import { FastifyReply, FastifyRequest } from "fastify";
import { RequestError } from "src/config/error";
import * as ProductDomainService from "src/services/domain/Product";
import * as UserDomainService from "src/services/domain/User";
import * as UserDto from "src/services/models/User";
import * as Jwt from "src/utils/jwt";
import * as Bcrypt from "src/utils/password";


export async function getProducstHandler(request: FastifyRequest, reply: FastifyReply) {
    const product = await ProductDomainService.getProducts();
    reply.send(product);
}

export async function loginHandler(request: FastifyRequest) {
    try {
        const { email, password } = request.body as UserDto.LoginRequest

        const user = await UserDomainService.checkUserExistByEmailDomain(email)

        const isPassword = await Bcrypt.checkPassword({ hash: user.password, password })

        if(!isPassword) {
            throw new RequestError("INVALID_CREDENTIALS")
        }

        const token = await Jwt.signToken({user_id: user.id})

        return {message: token}
    } catch (error) {
        throw error
    }

}