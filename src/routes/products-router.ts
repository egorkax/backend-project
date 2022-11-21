import {Request, Response, Router} from "express";

export const productRouter=Router({})

const products = [{id: 1, title: "tomato"}, {id: 2, title: "cucumber"}, {id: 3, title: "potato"}]


productRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(e => e.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }

})

productRouter.get('/:id', (req: Request, res: Response) => {
    let uriParams = req.params.id
    let product = products.find(e => e.id === +uriParams)
    if (!product) res.send(404)
    res.send(product)
})

productRouter.delete('/:id', (req: Request, res: Response) => {
    let uriParams = req.params.id
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +uriParams) {
            products.splice(i, 1)
            res.status(201)
            res.send(products)
            return
        }
    }
    res.send(404)
})

productRouter.post('/', (req: Request, res: Response) => {
    let newTitle = req.body.title
    if (newTitle.length) {
        let newItem = {
            id: +(new Date()),
            title: newTitle
        }

        products.push(newItem)
        res.status(201).send(products)
    } else res.send(404)
})

productRouter.put('/:id', (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let newTitle = req.body.title
    if (newTitle.length && uriParams) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === uriParams) {
                products[i] = {...products[i], title: newTitle}
                res.status(200).send(products)
            }

        }
    }
    res.send(404)
})
