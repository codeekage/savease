import FirebaseService from './firebase.service'
interface Result {
  success: boolean
  data: {} | undefined
}
export default class BatchService extends FirebaseService {
  async batchRequest(batched: any): Promise<Result> {
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

  async generatePins(batched: any): Promise<Result> {
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
          .collection('purchase')
          .doc(`${user.uid}`)
          .collection(`batches`)
          .add({ batches })
        const pins = await purchase.get()
        return Promise.resolve({ success: true, data: pins.data() })
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
}

function getPins() {
  const min = 111111111111
  const max = 9999999999999
  const pin = Math.floor(Math.random() * (+max - +min) + +min)
  const serial_no = Math.floor(Math.random() * (+max - +min) + +min)
  return { _pins: { pin, serial_no } }
}
