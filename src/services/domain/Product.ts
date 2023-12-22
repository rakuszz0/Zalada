import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";
import format from "format-unicorn/safe"
import database from "@infrastructure/database";
import * as TransactionRepository from "../repository/Transaction";
import { RequestError } from "src/config/error";



export async function getProductsDomain({limit = 500, search = "", sort = "DESC", lastId = 0, filter = "1=1"}: ProductDto.GetProductsDomainParams) {
    const searchProps = {
        price: "p.price",
        stock: "p.stock",
        name: "p.name",
        description: "p.description",
    }

    const filterProps = {
        ratings: "ratings",
        total_price: "total_price"
    }

    let parsedSearch = format(search, searchProps)

    let parsedFilter = format(filter, filterProps)

    let searchClause = "1=1"

    if(parsedSearch != "" && lastId < 1) {
        // Search when search props not empty and not paginate
        searchClause = `${searchClause} AND (${parsedSearch})`
    } else if (parsedSearch != "" && lastId > 0) {
        // Search when search props not empty and wanting to paginate
        searchClause = `${searchClause} AND (${parsedSearch}) AND id ${sort == "ASC" ? ">" : "<"} ${lastId}`
    } else if (parsedSearch == "" && lastId > 0) {
        searchClause = `${searchClause} AND id ${sort == "ASC" ? ">" : "<"} ${lastId}`
    }

    const product = await ProductRepository.DBGetProducts({ limit, search: searchClause, sort, filter: parsedFilter })

    if(product.length < 1) {
        return {
            data: [],
            column: [],
            hasNext: -1
        }
    }

    const result = {
        data: product.map(p => Object.values(p)),
        column: Object.keys(product[0]),
        hasNext: -1
    }

    if (product.length > limit) {
        product.length = limit
        result.data.length = limit
        result.hasNext = product[product.length - 1].id
    }

    return result
}

export async function updateProductDomain({ description, name, price, product_id, stock }: ProductDto.UpdateProductDomainParams) {
    // Check Product Exist
    await ProductRepository.DBCheckProductExist(product_id)

    await ProductRepository.DBUpdateProduct({description, name, price, product_id, stock})

    return true
} 

export async function orderHistoryByDeliveryStatusHandler() {
    return await ProductRepository.DBGetProducts({})
}

export async function getProductDetailsDomain(id:number) {
    const product_detail= await ProductRepository.DBGetProductsDetails(id)
    const reviews = await ProductRepository.DBProductReviews(id)

    return {...product_detail,reviews}
}

export async function deleteProductByAdmin(params: ProductDto.DeleteProductRequest) {
    const {product_id} = params
    
    const checkProduct = await ProductRepository.DBCheckProductExist(product_id)
  
    const db = database.getDatasource();
    const conn = db.createQueryRunner();
    await conn.connect()
    try {
      await conn.startTransaction()
  
      const insertToProductTrash =  await ProductRepository.DBInsertToTrashedProduct({
        product_id: checkProduct.id,
        name: checkProduct.name,
        description: checkProduct.description,
        price: checkProduct.price,
        store_id: checkProduct.store_id,
      },conn)

      const deleteProduct = await ProductRepository.DBDeleteProduct({product_id:checkProduct.id},conn)

        await conn.commitTransaction();
        await conn.release();

        return deleteProduct;
    } catch (error) {
        await conn.rollbackTransaction();
        await conn.release();
        throw error
    }
}

export async function addReviewProduct({customer_id,product_id,message,order_no,rating}: ProductDto.ReviewProductParams) {

    const transaction = await TransactionRepository.DBCheckTransactionExist({customer_id, order_no})

    if(transaction.status < 6 || transaction.status != 6 ) {
        throw new RequestError("NEED_TO_COMPLATE_THE_TRANSACTION")
    }

    // await ProductRepository.DBCheckReviewExist({ order_no, product_id })

    const reviewProduct = await ProductRepository.DBAddReviewTransaction({customer_id,product_id,rating,message})

    return reviewProduct
}