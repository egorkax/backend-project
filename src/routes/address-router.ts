import {Request, Response, Router} from "express";

export const addressRouter=Router({})

const address = [{id: 1, value: "Parkovaya 57"}, {id: 2, value: "Zaslonova 9A"}]


addressRouter.get('/', (req: Request, res: Response) => {
    res.send(address)
})
addressRouter.get('/:id', (req: Request, res: Response) => {
    let uriParams = req.params.id
    let addres = address.find(e => e.id === +uriParams)
    if (!addres) res.send(404)
    res.send(addres)
})