import {MongoClient} from "mongodb";

export type ProductType = {
    id: number
    title: string
}


const mongoUri = process.env.mongoURI || "mongodb://127.0.0.1:27017/"
const client = new MongoClient(mongoUri)
const db = client.db('shop');
export const productsCollection = db.collection<ProductType>('products');


export async function runDb() {
    try {
        await client.connect()

        await client.db("products").command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch {
        await client.close()
    }

}