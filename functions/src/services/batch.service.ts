import WalletService from './wallet.service'
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
      for (let keys in batched) {
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

  async generatePinsAndUpdateBalance(batched: any, fund : number): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        const batches = []
        for (let unit in batched) {
          for (let i = 0; i < batched[unit]; i++) {
            batches.push({ [unit]: getPins() })
          }
        }
        const purchase = await this.firestore
          .collection('users')
          .doc(`${user.uid}`)
          .collection(`purchase`)
          .add({ batches, timestamp : timeStamp() })
        const pins = await purchase.get()
        const balance = await this.setFundsToWallet(fund)
        return Promise.resolve({ success: true, data: {_pins : pins.data(), balance } })
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
            const fund = balance.fund - grandTotal;
            const { data } = await this.generatePinsAndUpdateBalance(batched, fund)
            return Promise.resolve({ success: true, data })
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
}

function getPins() {
  const min = 111111111111
  const max = 9999999999999
  const pin = Math.floor(Math.random() * (+max - +min) + +min)
  const serial_no = Math.floor(Math.random() * (+max - +min) + +min)
  return { _pins: { pin, serial_no } }
}

const timeStamp = () => {
  const date = new Date().getUTCDate(),
    hour = new Date().getUTCHours(),
    min = new Date().getUTCMinutes(),
    sec = new Date().getUTCSeconds(),
    mil_sec = new Date().getUTCMilliseconds()

  return `${date}-${hour}-${min}-${sec}-${mil_sec}`
}
