import { FastifyRequest } from "fastify";
import { RequestError } from "src/config/error";
import * as UserDomainService from "src/services/domain/User";
import * as ProductDomainService from "src/services/domain/Product";
import { AddProductByAdmin, DeleteProductRequest } from "src/services/models/Product";
import { CreateRulesRequest, CreateUserByAdmin, RestoreTrashedUser } from "src/services/models/User";
import * as Bcrypt from "src/utils/password"

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
    })

    return {message:true}
}

export async function createUserByAdmin(request: FastifyRequest) {
    try{
        const {username,email,first_name,last_name,password,password_confirmation,user_level} = request.body as CreateUserByAdmin
        if (password != password_confirmation) {
            throw new RequestError("CONFIRMATION_PASSWORD_DOES_NOT_MATCH")
        }

        const checkEmail = await UserDomainService.checkEmailExistDomain(email);
        if (checkEmail) {
            throw new RequestError("EMAIL_ALREADY_EXIST")
        } 

        const hashPassword = await Bcrypt.hashPassword(password)

        await UserDomainService.createUserByAdmin({
            username,
            email,
            first_name,
            last_name,
            password: hashPassword,
            user_level,
            password_confirmation
        })

        return {message:true}

    } catch (error){
        throw error
    }
}

export async function getRolesList() {
    try {
        const response = await UserDomainService.getRolesListDomain()
        return { message: response }
    } catch (error) {
        throw error
    }
} 

export async function getRulesList() {
    try {
        const response = await UserDomainService.getRulesListDomain()
        return { message: response }
    } catch (error) {
        throw error
    }
}

export async function addGroupRulesHandler(request: FastifyRequest) {
    try {
        const { role_id, rules } = request.body as CreateRulesRequest

        const response = await UserDomainService.addGroupRulesDomain({ role_id, rules })

        return { message: response }   
    } catch (error) {
        throw error
    }
}


export async function restoreTrashedUserController(request: FastifyRequest) {
    try {
        const { id } = request.body as RestoreTrashedUser
        const restoreUser = await UserDomainService.restoreTrashedUser({
            id
        })

        return { message: restoreUser }
    } catch (error) {
        throw error
    }
}


export async function deleteProductController(request:FastifyRequest){
    try{
        const {product_id} = request.body as DeleteProductRequest
        const delete_product = await ProductDomainService.deleteProductByAdmin({
            product_id
        })

        return {message:delete_product}
    } catch (error){
        throw error
    }
}