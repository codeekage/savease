import WalletService from '../services/wallet.service'
import { Request, Response } from 'express'
const wallet = new WalletService()

export const handleAddFund = async (request: Request, response: Response) => {
  try {
    const { fund } = request.body
    if(typeof fund !== "number"){
      throw new TypeError(`Don't Be Smart`)
    }
    const result = await wallet.setFundsToWallet(fund)
    response.send(result)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export const handleGetFund = async (request: Request, response: Response) => {
  try {
    const fund = await wallet.getFundsFromWallet()
    response.send(fund)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
