import * as ProductRepository from "../repository/Product";
import * as ProductDto from "../models/Product";
import database from "@infrastructure/database";

export async function getProductsDomain() {
    return await ProductRepository.DBGetProducts()
}

export async function updateProductDomain({ description, name, price, product_id, stock }: ProductDto.UpdateProductDomainParams) {
    // Check Product Exist
    await ProductRepository.DBCheckProductExist(product_id)

    await ProductRepository.DBUpdateProduct({description, name, price, product_id, stock})

    return true
} 

export async function orderHistoryByDeliveryStatusHandler() {
    return await ProductRepository.DBGetProducts()
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