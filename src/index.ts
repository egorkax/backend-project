import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {productRouter} from "./routes/products-router";
import {addressRouter} from "./routes/address-router";

const app = express()
const port = 3000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productRouter)
app.use('/address', addressRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
