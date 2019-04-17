import BatchService from '../services/batch.service'
import { Request, Response } from 'express'

const batch = new BatchService()

export const handleBatchRequest = async (
  request: Request,
  response: Response
) => {
  try {
    const { batched } = request.body
    const batchRequest = await batch.generateBatch(batched)
    response.send(batchRequest)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export const handleBatchHistory = async (
  request: Request,
  response: Response
) => {
  try {
    const history = await batch.getUserBatchHistory()
    response.send(history)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export const forecHandleBatchHistory = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = request.params
    const history = await batch.forceUserBatchHistory(userId)
    response.send(history)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
