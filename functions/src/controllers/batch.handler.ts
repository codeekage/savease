import BatchService from '../services/batch.service'
import { Request, Response } from 'express'

const batch = new BatchService()

export const handleBatchRequest = async (
  request: Request,
  response: Response
) => {
  try {
    const { batched } = request.body
    const batchRequest = await batch.batchRequest(batched)
    response.send(batchRequest)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export const handleBatchPins = async (request: Request, response: Response) => {
  try {
    const { batched } = request.body
    const batchPins = await batch.generatePins(batched)
    response.send(batchPins)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
