import * as ProductDomainService from "src/services/domain/Product";

export async function getProducstHandler() {
    try {
        const product = await ProductDomainService.getProductsDomain();
        return product
    } catch (error) {
        throw error
    }

}
