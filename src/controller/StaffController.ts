import { FastifyReply, FastifyRequest } from "fastify";
import * as UserDomainService from "src/services/domain/User";
import * as ProductDomainService from "src/services/domain/Product";
import * as TransactionDomainService from "src/services/domain/Transaction";
import * as ProductDto from "src/services/models/Product";
import * as TransactionDto from "src/services/models/Transaction";
import * as z from "zod"

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
      throw reply.code(400).send(error.issues)
    }
    throw error
  }
}