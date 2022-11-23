import {productsCollection, ProductType} from "./db-repositories";


export const productsRepositoryDb = {
    async filteredProducts(title: string | undefined): Promise<ProductType[]> {
        const filter: any = {}
        if (title) {
            filter.title = {$regex: title}
        }
        return productsCollection.find(filter).toArray()
    },
    async findProduct(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await productsCollection.findOne({id: id})
        if (product) return product
        else return null
    },
    async deleteProduct(id: number): Promise<boolean> {
        const res = await productsCollection.deleteOne({id: id})
        return res.deletedCount === 1;
    },
    async createProduct(newTitle: string): Promise<ProductType> {
        let newProduct = {
            id: +(new Date()),
            title: newTitle
        }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(newTitle: string, id: number): Promise<boolean> {
        let res = await productsCollection.updateOne({id: id}, {$set: {title: newTitle}})
        return res.matchedCount === 1
    },

}