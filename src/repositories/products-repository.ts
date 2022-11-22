const products = [{id: 1, title: "tomato"}, {id: 2, title: "cucumber"}, {id: 3, title: "potato"}]

export const productsRepository = {
    filteredProducts(title: string | undefined) {
        if (title) {
            return products.filter(e => e.title.indexOf(title) > -1)
        } else return products
    },
    findProduct(id: number) {
        return products.find(e => e.id === id)
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    },
    createProduct(newTitle: string) {
        let newProduct = {
            id: +(new Date()),
            title: newTitle
        }
        products.push(newProduct)
        return newProduct
    },
    updateProduct(newTitle: string, id: number) {
        let product = products.find(e => e.id === id)
        if (product) {
            product.title = newTitle
            return true
        } else return false
    },

}