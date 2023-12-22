import * as TransactionRepository from "../repository/Transaction";
import * as TransactionDto from "../models/Transaction";
import * as ProductRepository from "../repository/Product"
import * as CommonRepository from "../repository/Common"
import { RequestError } from "src/config/error";
import db from "@database"
import moment from "moment"
import MailService from "@infrastructure/mailer"

export async function getPaymentTypesDomain() {
    return await TransactionRepository.DBGetPaymentTypes()
}

export async function createTransactionDomain({customer_id, order, payment_type}: TransactionDto.CreateTransactionDomainParams) {
    const order_no = `ORD/${customer_id}/${moment().unix()}`
    let stock: Record<string, number> | number = {}
    let total_price = 0

    const queryRunner = db.createQueryRunner()
    await queryRunner.connect()
    try {
        await queryRunner.startTransaction()

        await TransactionRepository.DBCheckPaymentExist(payment_type)

        if(Array.isArray(order)) {
            for (const item of order) {
                // Check product exists
                const product = await ProductRepository.DBCheckProductExist(item.product_id, { lock: true })

                // Check quantity is more than product stock
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
            const product = await ProductRepository.DBCheckProductExist(order.product_id, { lock: true })

            // Check quantity is more than product stock
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

        await queryRunner.commitTransaction()

        return { order_no, total_price, stock }
    } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
    } finally {
        await queryRunner.release()
    }
}

export async function TransactionHistoryDomain(params: TransactionDto.TransactionHistoryParams) {
    const transactionHistory = await TransactionRepository.DBTransactionHistory(params);

    if (transactionHistory.length < 1) {
        throw new Error("NO_TRANSACTIONS_FOUND")
    }

    const result: TransactionDto.TransactionHistoryResponse = {}

    for (const item of transactionHistory) {
        if (!result[item.order_no]) {
            result[item.order_no] = {
                order_no: item.order_no,
                product: [],
                status: item.status,
                customer_id: item.customer_id,
                payment_type: item.payment_type,
                order_time: item.order_time,
                verified_by: item.verified_by
            }
        }

        result[item.order_no].product.push({
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity
        })
    }

    return result;
}

export async function paymentOrderDomain({amount, order_no, customer_id, email, username}: TransactionDto.PaymentOrderDomainParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})

    // Check if transaction has been paid
    if (transaction.status == 2) {
        throw new RequestError("TRANSACTION_HAS_BEEN_PAID")
    }

    // Check if transaction is pending
    if(transaction.status != 1) {
        throw new RequestError("INVALID_SESSION_PLEASE_CHECK_YOUR_TRANSACTION_STATUS")
    }

    const orders = await TransactionRepository.DBGetOrders(transaction.order_no)

    const total_price = orders.map(order => order.quantity * order.price).reduce((acc, curr) => acc + curr, 0)

    if(total_price != amount) {
        throw new RequestError("INVALID_AMOUNT")
    }

    // Set transaction to pending approval 
    await TransactionRepository.DBUpdateTransactionStatus({order_no, status: 2})

    const html = await MailService.getTemplate({
        template: "ORDER_CONFIRMATION",
        content: {
            order_no, 
            order_time: moment.utc(transaction.created_at).utcOffset("+07:00").format("YYYY-MM-DD HH:mm:ss"),
            total_price,
            items: orders,
            username
        }
    })

    // Send Mail to use
    await MailService.sendMail({
        to: email,
        subject: "Order Confirmation",
        html 
    })

    return true
}

export async function getTransactionDetailsDomain({customer_id, order_no}: TransactionDto.GetTransactionDetailsQueryParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})
    const payment = await TransactionRepository.DBCheckPaymentTypeExist(transaction.payment_type)
    const orders = await TransactionRepository.DBGetOrders(order_no)

    console.log({tr: new Date(transaction.created_at).getTime()})

    return {
        order_no,
        payment_type: payment.bank_name,
        payment_at: transaction.payment_at,
        created_at: transaction.created_at,
        shipping_at: transaction.shipping_at,
        arrived_at: transaction.arrived_at,
        status: TransactionDto.TransactionStatus[transaction.status],
        items: orders
    }
}

export async function getOrdersDomain(order_no: string) {
    return await TransactionRepository.DBGetOrders(order_no)
}

export async function confirmOrderDomain({order_no, user_id}: TransactionDto.ConfirmOrderDomain) {
    // Check order exist
    const transaction = await TransactionRepository.DBCheckPendingTransaction(order_no)

    // Check Transaction Status
    if(transaction.status != 2) {
        throw new RequestError("PLEASE_FINISH_PREVIOUS_STEP_FIRST")
    }

    // Update order to packing
    await TransactionRepository.DBUpdateTransactionStatus({order_no, status: 3, verified_by: user_id})

    return true
}

export async function changeDeliveryStatusHandler({order_no, user_id: delivered_by}: TransactionDto.ChangeDeliveryStatusDomain) {
    await TransactionRepository.DBCheckTransactionDelivery(order_no)

    await TransactionRepository.DBUpdateTransactionStatus({ status: 4, delivered_by, order_no  })

    return true
}

export async function setDeliveryDomain({ order_no }: TransactionDto.SetDeliveryOrderDomainParams) {
    const transaction = await TransactionRepository.DBCheckTransactionExist({ order_no })

    if(transaction.status != 3) {
        throw new RequestError("INVALID_SESSION_TRANSACTION")
    }

    await TransactionRepository.DBSetDeliveryOrder(order_no)

    return true
}

export async function setArrivedDomain({ attachment, order_no, delivered_by }: TransactionDto.SetArrivedDomain) {
    await TransactionDto.setArrivedSchema.parseAsync({ attachment, order_no })

    // Check Transaction exists
    await TransactionRepository.DBCheckTransactionArrived({ delivered_by, order_no })

    // Save file attachments
    await CommonRepository.uploadImage({ file: attachment, dir: "/orders", filename: `${order_no.split("/").join("-")}.png` })

    // Update status to arrived
    await TransactionRepository.DBUpdateTransactionStatus({ status: 5, order_no })

    return true
}