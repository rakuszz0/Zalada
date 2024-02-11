import { FastifyReply, FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";
import * as ProductDomainService from "src/services/domain/Product";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDto from "src/services/models/Product";
import * as UserDto from "src/services/models/User";
import { RequestError } from "src/services/models/Common";
import * as TransactionDto from "src/services/models/Transaction";
import * as z from "zod"
import { QueryFailedError } from "typeorm";


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

export async function transactionListHandler(request: FastifyRequest) {
  try {
    const { limit, search, sort, lastId } = request.body as TransactionDto.TransactionListRequest
    const transactionList = await TransactionDomainService.transactionListDomain({ lastId, limit, search, sort })
    
    return { message: transactionList }
  } catch (error) {
    if(error instanceof QueryFailedError) {
      throw new RequestError("INVALID_SEARCH_PROPERTIES")
    }
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
export async function changeDeliveryStatusHandler(request: FastifyRequest) {
  try {
    const { id: user_id } = request.user
    const {order_no} = request.body as TransactionDto.ChangeDeliveryStatusRequest
    const response = await TransactionDomainService.changeDeliveryStatusHandler({order_no, user_id})

    return {message: response}
  } catch (error) {
    throw error
  }
}

export async function setDeliveryHandler(request: FastifyRequest) {
  try {
    const { order_no } = request.body as TransactionDto.SetDeliveryRequest
    const delivery = await TransactionDomainService.setDeliveryDomain({ order_no })

    return { message: delivery }
  } catch (error) {
    throw error
  }
}

export async function setArrivedHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const attachment = request.file
    const { id: delivered_by } = request.user
    const { order_no } = request.body as TransactionDto.SetArrivedRequest

    const response = await TransactionDomainService.setArrivedDomain({ attachment, order_no, delivered_by })

    return { message: response }
  } catch (error) {
    if(error instanceof z.ZodError) {
      throw new RequestError(error.issues[0].message)
    }
    throw error
  }
}

export async function readyDeliveryListHandler() {
  try {
    const response = await TransactionDomainService.readyDeliveryListDomain()

    return { message: response }
  } catch (error) {
    throw error
  }
}

export async function onDeliveryListHandler(request: FastifyRequest) {
  try {
    const { id: delivered_by } = request.user
    const response = await TransactionDomainService.onDeliveryListHandler({ delivered_by })

    return { message: response }
  } catch (error) {
    throw error
  } 
}

export async function confirmedOrderListHandler() {
  try {
    const message = await TransactionDomainService.confirmedOrderListDomain()
    return { message }
  } catch (error) {
    throw error 
  }
}

export async function transactionDetailsHandler(request: FastifyRequest) {
  try {
    const { order_no } = request.params as TransactionDto.TransactionDetailsRequest
    const message = await TransactionDomainService.transactionDetailsDomain({ order_no })

    return { message }
  } catch (error) {
    throw error
  }
}