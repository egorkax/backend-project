import {productsRepositoryDb} from "../repositories/products-repository-db";
import {ProductType} from "../repositories/db-repositories";


export const productsService = {
    async filteredProducts(title: string | undefined): Promise<ProductType[]> {
        return productsRepositoryDb.filteredProducts(title)
    },
    async findProduct(id: number): Promise<ProductType | null> {
        return productsRepositoryDb.findProduct(id)
    },
    async deleteProduct(id: number): Promise<boolean> {
        return productsRepositoryDb.deleteProduct(id)
    },
    async createProduct(newTitle: string): Promise<ProductType> {
        let newProduct = {
            id: +(new Date()),
            title: newTitle
        }
        return await productsRepositoryDb.createProduct(newProduct)
    },
    async updateProduct(newTitle: string, id: number): Promise<boolean> {
        return await productsRepositoryDb.updateProduct(newTitle, id)
    },

}