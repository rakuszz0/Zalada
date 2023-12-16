import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";
import format from "format-unicorn/safe"
import { parse } from "path";

export async function getProductsDomain({limit = 500, search = "", sort = "DESC", lastId = 0}: ProductDto.GetProductsDomainParams) {
    const searchProps = {
        price: "price",
        stock: "stock",
        name: "name"
    }

    let parsedSearch = format(search, searchProps)

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

    const product = await ProductRepository.DBGetProducts({ limit, search: searchClause, sort })

    const result = {
        data: product,
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