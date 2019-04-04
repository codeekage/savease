import UnitServices from '../services/units.service'
import { Response, Request } from 'express'

const product = new UnitServices()

export async function  handleUnitFetch (request: Request, response: Response) {
  try {
    const data = await product.fetchUnits()
    response.send(data)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}


export const handleAddUnit = async (request : Request, response : Response) => {
    try {
        const {unit, price} = request.body;
        const data = await product.addUnits(price, unit)
        response.send(data);
    } catch (error) {
        console.error(error);
        response.status(500).send(error)
    }
}