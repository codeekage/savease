import UnitServices from '../services/units.service'
import { Response, Request } from 'express'

const unit = new UnitServices()

export async function  handleUnitFetch (request: Request, response: Response) {
  try {
    const data = await unit.fetchUnits()
    response.send(data)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}


export const handleAddUnit = async (request : Request, response : Response) => {
    try {
        const {unit, price} = request.body;
        const data = await unit.addUnits(price, unit)
        response.send(data);
    } catch (error) {
        console.error(error);
        response.status(500).send(error)
    }
}

export const handleUnitFetchById = async (request : Request, response : Response) => {
  try {
    const {id} = request.params;
    const data = await unit.fetchUnitsById(id);
    response.send(data)
  }catch(error){
    console.error(error);
    response.status(500).send(error)
  }
}