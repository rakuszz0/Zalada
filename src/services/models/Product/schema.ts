import { buildJsonSchemas } from "fastify-zod";
import * as z from "zod";

export const baseSchema = {
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    // created_at: z.date(),
    store_id: z.number()
}

export const getProductRequest = z.object({
    product_id: z.number(),
});

export const getProductResponse = z.object({ ...baseSchema })

export const addProductsResponse = z.object({ message:z.boolean() })

export const getProductsResponse = z.array(getProductResponse)

export const addProductsRequest = z.object({
    name: z.string(),
    quantity: z.number(),
    description: z.number(),
    price: z.number()
})

const addProductsSchema = z.object({
    name:z.string(),
    stock:z.number(),
    description:z.string(),
    price:z.number()
})


export const updateProductRequest = z.object({
    product_id: z.number(),
    name: z.string(),
    stock: z.number(),
    price: z.number(),
    description: z.string(),
})

export const updateProductResponse = z.object({
    message: z.boolean()
})

export const getProductListRequest = z.object({
    limit: z.number().min(1).optional(),
    sort: z.enum(["DESC", "ASC"]).optional(),
    lastId: z.number().optional(),
    search: z.string().optional().describe(JSON.stringify({ price: "string", stock: "number", name: "string", description: "string" })),
    filter: z.string().optional().describe(JSON.stringify({ ratings: "number", total_sale: "number" }))
})

export const getProductDetails = z.object({
    id: z.number(),
})
  
export const getProductDetailsResponse = z.object({
    id: z.number(),
    name: z.string(),
    stock: z.number(),
    price:z.number(),
    description: z.string(),
    average_rating: z.number(),
    total_sell: z.number(),
    created_at: z.number(),
    reviews:z.object({
        rating: z.number(),
        message: z.string(),
        username: z.string()
    }).array()

})

export const deleteProductRequest = z.object({
    product_id: z.number()
})

export const deleteProductResponse = z.object({
    message: z.boolean()
})

export const addProductReviewRequest = z.object({
    product_id: z.number(),
    message:z.string().optional(),
    rating:z.number().min(1).max(5),
    order_no:z.string()
})

export const addProductReviewResponse = z.object({
    message: z.boolean()
})

export const { schemas: productSchemas, $ref: productSchema } = buildJsonSchemas(
    {
        getProductRequest,
        getProductResponse,
        getProductsResponse,
        addProductsSchema,
        addProductsRequest,
        addProductsResponse,
        updateProductRequest,
        updateProductResponse,
        addProductReviewRequest,
        addProductReviewResponse,
        getProductDetails,
        getProductDetailsResponse,
        getProductListRequest,
        deleteProductRequest,
        deleteProductResponse,
    },
    {
        $id: "productSchema",
    }
);
