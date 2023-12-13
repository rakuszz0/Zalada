import * as TransactionRepository from "../repository/Transaction";
import * as TransactionDto from "../models/Transaction";
import * as ProductRepository  from "../repository/Product"
import { RequestError } from "src/config/error";
import db from "@database"

export async function getPaymentTypesDomain() {
    return await TransactionRepository.DBGetPaymentTypes()
}

export async function createTransactionDomain({customer_id, order, payment_type}: TransactionDto.CreateTransactionDomainParams) {
    const order_no = `ORD/${customer_id}/${Date.now()}`
    let total_price = 0
    let stock: any = {}

    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    try {
        await queryRunner.startTransaction()

        await TransactionRepository.DBCheckPaymentExist(payment_type)

        if(Array.isArray(order)) {
            for (const item of order) {
                // Check product exists
                const product = await ProductRepository.DBCheckProductExist(item.product_id)

                // Check product stock is more than quantity
                if (product.stock < item.quantity) {
                    throw new RequestError(`${product.name.split(" ").join("_").toUpperCase()}_EXCEEDS_STOCK`)
                }

                stock[product.name] = product.stock - item.quantity

                total_price += product.price * item.quantity

                await TransactionRepository.DBCreateOrder({ order_no, price: product.price, quantity: item.quantity, product_id: product.id }, queryRunner)

                // Update product stock after transaction has been created
                await ProductRepository.DBUpdateStockProduct({ product_id: product.id, stock: product.stock - item.quantity }, queryRunner)   
            }
        } else {
            // Check product exists
            const product = await ProductRepository.DBCheckProductExist(order.product_id)

            // Check product stock is more than quantity
            if (product.stock < order.quantity) {
                throw new RequestError(`${product.name.split(" ").join("_").toUpperCase()}_EXCEEDS_STOCK`)
            }

            total_price += product.price * order.quantity

            stock = product.stock - order.quantity

            await TransactionRepository.DBCreateOrder({ order_no, price: product.price, quantity: order.quantity, product_id: product.id }, queryRunner)

            // Update product stock after transaction has been created
            await ProductRepository.DBUpdateStockProduct({ product_id: product.id, stock: product.stock - order.quantity }, queryRunner)   
        }

        await TransactionRepository.DBCreateTransaction({order_no, customer_id, payment_type, status: 1}, queryRunner)

        return { order_no, total_price, stock }
    } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
    } finally {
        await queryRunner.release()
    }
}