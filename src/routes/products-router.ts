import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";

export const productRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 2,
    max: 12
}).withMessage('Title should be from 2 to 12 symbols ')

productRouter.get('/', (req: Request, res: Response) => {
    let searchString = req.query.title?.toString()
    const foundProducts = productsRepository.filteredProducts(searchString)
    res.send(foundProducts)


})

productRouter.get('/:id', (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let product = productsRepository.findProduct(uriParams)
    res.send(product)
})

productRouter.delete('/:id', (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let isDelete = productsRepository.deleteProduct(uriParams)
    if (isDelete) res.status(200)
    else res.status(400)

})

productRouter.post('/', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    let newTitle = req.body.title
    let product = productsRepository.createProduct(newTitle)
    res.status(200).send(product)
})

productRouter.put('/:id', titleValidation,inputValidationMiddleware, (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let newTitle = req.body.title
    let isUpdated = productsRepository.updateProduct(newTitle, uriParams)
    if (isUpdated) {
        const product = productsRepository.findProduct(uriParams)
        res.status(200).send(product)
    } else res.status(404)
})
