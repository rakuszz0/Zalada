import { FastifyReply, FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";
import * as ProductDomainService from "src/services/domain/Product";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDto from "src/services/models/Product";
import * as UserDto from "src/services/models/User";
import { RequestError } from "src/config/error";

import * as TransactionDto from "src/services/models/Transaction";



export async function getStaffsHandler( request: FastifyRequest, reply: FastifyReply) {
  const staff = await UserDomainService.getStaffsDomain();
  reply.send(staff);
}

export async function updateProductHandler(request: FastifyRequest) {
  try {
    const { product_id, description, name, price, stock } = request.body as ProductDto.UpdateProductRequest

    const product = await ProductDomainService.updateProductDomain({description, name, price, stock, product_id})
    
    return {message: product}
  } catch (error) {
    throw error
  }
}

export async function confirmOrderHandler(request: FastifyRequest) {
  try {
    const { id: user_id } = request.user
    const { order_no } = request.body as TransactionDto.ConfirmOrderRequest
    const response = await TransactionDomainService.confirmOrderDomain({ order_no, user_id })
    return { message: response }
  } catch (error) {
    throw error
  }
}

export async function editUserHandler(request: FastifyRequest) {
  try {
    const { id, email, first_name, last_name, user_level, username, address, phone_number } = request.body as UserDto.EditUserRequest

    if (user_level == 1 && request.user.user_level != 1) {
      throw new RequestError("NOT_ENOUGH_RIGHT")
    }
    
    const editUser = await UserDomainService.editUserDomain({
      id,
      email, first_name, last_name,
      user_level, address, username,
      phone_number
    })
    return { message: editUser }

  } catch (error) {
    throw error
  }
}