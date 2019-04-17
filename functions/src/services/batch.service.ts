import WalletService from './wallet.service'
import { getPins, timeStamp } from '../util'
interface Result {
  success: boolean
  data: {} | undefined
}
interface BatchRequest {
  success: boolean
  data:
    | {
        grandTotal: any
        perPrice: any
      }
    | undefined
}
export default class BatchService extends WalletService {
  async batchRequest(batched: any): Promise<BatchRequest> {
    try {
      const unitPrices = new Array()
      for (const keys in batched) {
        const values = await this.firestore
          .collection('units')
          .doc(`${keys}`)
          .get()
        const data = values.data()
        data
          ? unitPrices.push(data.price)
          : Promise.reject({ success: false, data })
      }
      const requestQty = Object.keys(batched).map(qty => batched[qty])
      const prices = unitPrices.map((price, qty) => {
        return parseInt(price) * parseInt(requestQty[qty])
      })
      let total = 0
      prices.map(values => (total += (values * 5) / 100))
      return Promise.resolve({
        success: true,
        data: { grandTotal: total, perPrice: prices },
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async generatePinsAndUpdateBalance(
    batched: any,
    fund: number
  ): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        const batches = []
        for (const unit in batched) {
          for (let i = 0; i < batched[unit]; i++) {
            batches.push({ [unit]: getPins() })
          }
        }
        const purchase = await this.firestore
          .collection('purchases')
          .doc(`${user.uid}`)
          .collection('batches')
          .add({ batches, timestamp: timeStamp() })
        const pins = await purchase.get()
        const balance = await this.setFundsToWallet(fund)
        return Promise.resolve({
          success: true,
          data: { _pins: pins.data(), balance },
        })
      }
      return Promise.reject({
        success: false,
        data: "You don't have Permission",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async generateBatch(batched: any): Promise<Result> {
    try {
      const user = this.auth.currentUser
      if (user) {
        const batchRequest = await this.batchRequest(batched)
        if (batchRequest.data) {
          const { grandTotal } = batchRequest.data
          const { data } = await this.getFundsFromWalletById(user.uid)
          const balance = data
          if (balance && balance.fund > grandTotal) {
            const fund = balance.fund - grandTotal
            const pins = await this.generatePinsAndUpdateBalance(batched, fund)
            return Promise.resolve({ success: true, data: pins.data })
          }
          return Promise.reject({
            success: false,
            data: `Insuffienct Funds ${balance.fund} `,
          })
        }
        return Promise.reject({
          success: false,
          data: 'Operation is currently not avaliable',
        })
      }
      return Promise.reject({
        success: false,
        data: "You don't have the permission to do this!",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async getUserBatchHistory(): Promise<Result> {
    try {
      const user = this.auth.currentUser
      if (user) {
        const history = await this.firestore
          .collection('purchases')
          .doc(`${user.uid}`)
          .get()
        const data = history.data()
        return Promise.resolve({ success: true, data })
      }
      return Promise.resolve({
        success: false,
        data: 'You dont have the permission to do this',
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ error })
    }
  }

  async forceUserBatchHistory(userId: string): Promise<Result> {
    try {
      const history = await this.firestore
        .collection('purchases')
        .doc(`${userId}`)
        .get()
      const data = history.data()
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ error })
    }
  }
}
