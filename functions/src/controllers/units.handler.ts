import UnitServices from '../services/units.service'
import { Response, Request } from 'express'
import * as sanitize from 'sanitize-html'

const units = new UnitServices()

export async function  handleUnitFetch (request: Request, response: Response) {
  try {
    const data = await units.fetchUnits()
    response.send(data)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}


export const handleAddUnit = async (request : Request, response : Response) => {
    try {
        const {unit, price} = request.body;
        if(typeof unit !== "number" && typeof price !== "number"){
          throw new TypeError(`Don't Be Smart`)
        }
        const data = await units.addUnits(price, unit)
        response.send(data);
    } catch (error) {
        console.error(error);
        response.status(500).send(error)
    }
}

export const handleUnitFetchById = async (request : Request, response : Response) => {
  try {
    const {id} = request.params;
    const data = await units.fetchUnitsById(sanitize(id));
    response.send(data)
  }catch(error){
    console.error(error);
    response.status(500).send(error)
  }
}