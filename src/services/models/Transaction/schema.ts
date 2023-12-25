import { File } from "fastify-multer/lib/interfaces"
import { buildJsonSchemas } from "fastify-zod"
import * as z from "zod"

const createOrder = z.object({
    product_id: z.number(),
    quantity: z.number().min(1)
})

const createOrders = z.array(createOrder)

export const createOrderRequest = z.object({
    order: z.union([createOrder, createOrders]),
    payment_type: z.number(),
})

export const createOrderResponse = z.object({
    message: z.object({
        order_no: z.string(),
        total_price: z.number(),
        stock: z.union([z.number(), z.record(z.string(), z.number())])
    })
})

const getPaymentType = z.object({
    id: z.number(),
    bank_name: z.string(),
    account: z.string()
})

export const getPaymentTypesResponse = z.object({
    message: z.array(getPaymentType)
})

// export const transactionHistoryRequest = z.object({
//   status: z.number().optional()
// });

// export const productList = z.object({
//   product_id: z.number(),
//   price: z.number(),
//   quantity: z.number()
// })

// export const transactionHistoryResponse = z.record(z.string(), z.object({
//   order_no: z.string(),
//   product: z.array(productList),
//   order_time: z.string(),
//   status: z.number(),
//   customer_id: z.number(),
//   payment_type: z.number(),
//   verified_by: z.number()
// }))

export const productList = z.object({
    product_name: z.string(),
    price: z.number(),
    quantity: z.number()
})

export const confirmOrderRequest = z.object({
  order_no: z.string(),
})

export const transactionListResponse = z.object({
    message: z.object({
        order_no: z.string(),
        items: z.array(productList),
        status: z.number(),
        customer_name: z.string(),
        order_time: z.string(),
        payment_type: z.string(),
        verified_by: z.string(),
        total_price: z.number()
    }).array()
})



export const paymentOrderRequest = z.object({
    order_no: z.string(),
    amount: z.number().min(1)
})

export const paymentOrderResponse = z.object({
    message: z.boolean()
})



export const getOrderDetailsRequest = z.object({
    order_no: z.string()
})


const orders = z.object({
    product_name: z.string(),
    price: z.number(),
    quantity: z.number()
})

export const getOrderDetailsResponse = z.object({
    message: z.object({
        order_no: z.string(),
        payment_type: z.string(),
        status: z.string(),
        created_at: z.date(),
        payment_at: z.date().nullable(),
        shipping_at: z.date().nullable(),
        arrived_at: z.date().nullable(),
        items: z.array(orders)
    })
})

export const confirmOrderResponse = z.object({
    message: z.boolean()
})

export const changeDeliveryStatusRequest = z.object({
    order_no: z.string(),
})

export const setDeliveryRequest = z.object({
    order_no: z.string()
})

const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const setArrivedSchema = z.object({
    attachment: z.custom<Required<File>>().refine(file => file != undefined, "Attachment is required!").refine(file => imageTypes.includes(file.mimetype), "Invalid file type!").refine(file => (file.size / 1000) < 2048, { message: "File size too big!" }),
    order_no: z.string({ required_error: "order_no is required!" })
})

export const setDeliveryResponse = z.object({
    message: z.boolean()
})

export const setArrivedResponse = z.object({
    message: z.boolean()
})

export const changeDeliveryStatusResponse = z.object({
    message: z.boolean()
})

export const finishOrderRequest = z.object({
    order_no: z.string()
})

export const finishOrderResponse = z.object({
    message: z.boolean()
})

export const { schemas: transactionSchemas, $ref: transactionSchema } = buildJsonSchemas({
    createOrderRequest,
    createOrderResponse,
    getPaymentTypesResponse,
    productList,
    transactionListResponse,
    paymentOrderRequest,
    paymentOrderResponse,
    getOrderDetailsRequest,
    getOrderDetailsResponse,
    finishOrderRequest,
    finishOrderResponse,
    confirmOrderRequest,
    confirmOrderResponse,
    changeDeliveryStatusRequest,
    setDeliveryRequest,
    setDeliveryResponse,
    setArrivedResponse,
    changeDeliveryStatusResponse
}, {
    $id: "transactionSchemas"
})
