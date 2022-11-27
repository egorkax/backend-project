// import express from 'express'
// import bodyParser from "body-parser";
// import {productRouter} from "./routes/products-router";
// import {runDb} from "./repositories/db-repositories";
//
//
// const app = express()
// const port = process.env.PORT || 3000
//
// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)
//
// app.use('/products', productRouter)
// const startApp = async () => {
//     await runDb()
//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// }
// startApp()


//WEB-SOCKET

import express from 'express'
import http from "http";
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app);
const socket = new Server(server, {cors: {origin: "*"}});
const port = process.env.PORT || 3007

const messages = [
    {message: 'Hello Polina', id: '2342352fs', user: {id: 'sdff243', name: 'Egor'}},
    {message: 'Hello Egor', id: '23234122fs', user: {id: 'scbg123', name: 'Polina'}},
]


app.get('/', (req, res) => {
    res.send('Hello, its WEB SOCKET SERVER');
});

socket.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message) => {
        let messItem={message: message, id: 'sdf'+ new Date().getTime(), user: {id: 'asdfasdf13e', name: 'New'}}
        messages.push(messItem)
        socket.emit('new-message-sent',messItem)
    })
    socketChannel.emit('init-messages-published', messages)
    console.log('a user connected');
});

server.listen(port, () => {
    console.log('listening on *:3007');
});