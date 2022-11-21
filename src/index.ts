import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

const app = express()
const port = 3000

const products = [{id: 1, title: "tomato"}, {id: 2, title: "cucumber"}, {id: 3, title: "potato"}]
const address = [{id: 1, value: "Parkovaya 57"}, {id: 2, value: "Zaslonova 9A"}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(e => e.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }

})

app.get('/products/:id', (req: Request, res: Response) => {
    let uriParams = req.params.id
    let product = products.find(e => e.id === +uriParams)
    if (!product) res.send(404)
    res.send(product)
})

app.delete('/products/:id', (req: Request, res: Response) => {
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

app.post('/products', (req: Request, res: Response) => {
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

app.put('/products/:id', (req: Request, res: Response) => {
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


app.get('/address', (req: Request, res: Response) => {
    res.send(address)
})
app.get('/address/:id', (req: Request, res: Response) => {
    let uriParams = req.params.id
    let addres = address.find(e => e.id === +uriParams)
    if (!addres) res.send(404)
    res.send(addres)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
