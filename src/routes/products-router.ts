import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {ProductType} from "../repositories/db-repositories";
import {productsService} from "../domain/products-service";

export const productRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 2,
    max: 12
}).withMessage('Title should be from 2 to 12 symbols ')

productRouter.get('/', async (req: Request, res: Response) => {
    let searchString = req.query.title?.toString()
    const foundProducts:ProductType[] = await productsService.filteredProducts(searchString)
    res.send(foundProducts)


})

productRouter.get('/:id', async (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let product:ProductType | null =  await productsService.findProduct(uriParams)
    res.send(product)
})

productRouter.delete('/:id', async (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let isDelete:boolean = await productsService.deleteProduct(uriParams)
    if (isDelete) res.status(200)
    else res.status(400)

})

productRouter.post('/', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    let newTitle = req.body.title
    let product :ProductType = await productsService.createProduct(newTitle)
    res.status(200).send(product)
})

productRouter.put('/:id', titleValidation,inputValidationMiddleware,async (req: Request, res: Response) => {
    let uriParams = +req.params.id
    let newTitle = req.body.title
    let isUpdated:boolean = await productsService.updateProduct(newTitle, uriParams)
    if (isUpdated) {
        const product = await productsService.findProduct(uriParams)
        res.status(200).send(product)
    } else res.status(404)
})
