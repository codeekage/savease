import WalletService from '../services/wallet.service'
import { Request, Response } from 'express'
const wallet = new WalletService()

export const handleWalletBalance = async (request: Request, response: Response) => {
  try {
    const fund = await wallet.getWalletBalance()
    response.send(fund)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}

export const handleWalletHistory = async (request: Request, response: Response) => {
  try {
    const fund = await wallet.getWalletHistory()
    response.send(fund)
  } catch (error) {
    console.error(error)
    response.status(500).send(error)
  }
}
