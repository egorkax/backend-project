
export type ProductType={
    id:number
    title:string
}
const products:ProductType[] = [{id: 1, title: "tomato"}, {id: 2, title: "cucumber"}, {id: 3, title: "potato"}]

export const productsRepository = {
    async filteredProducts(title: string | undefined):Promise<ProductType[]> {
        if (title) {
            return products.filter(e => e.title.indexOf(title) > -1)
        } else return products
    },
    async  findProduct(id: number): Promise<ProductType | null> {
        let product= products.find(e => e.id === id)
        if(product)return product
        else return null
    },
    async  deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    },
    async createProduct(newTitle: string):Promise<ProductType> {
        let newProduct = {
            id: +(new Date()),
            title: newTitle
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(newTitle: string, id: number):Promise<boolean> {
        let product = products.find(e => e.id === id)
        if (product) {
            product.title = newTitle
            return true
        } else return false
    },

}