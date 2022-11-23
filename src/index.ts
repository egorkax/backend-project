import express from 'express'
import bodyParser from "body-parser";
import {productRouter} from "./routes/products-router";
import {runDb} from "./repositories/db-repositories";

const app = express()
const port = 3000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productRouter)



const startApp =async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()