import FirebaseService from './firebase.service'
import { timeStamp } from '../util'
interface Result {
  success: boolean
  data: any
}

export default class WalletService extends FirebaseService {
  async setFundsToWallet(fund: number): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        await this.firestore
          .collection('wallet')
          .doc(`${user.uid}`)
          .set({ fund })
        const history = await this.setFundsHistory(fund)
        const wallet = await this.firestore
          .collection('wallet')
          .doc(`${user.uid}`)
          .get()
        const balance = wallet.data()
        return Promise.resolve({ success: true, data: { balance, history } })
      }
      return Promise.reject({
        success: false,
        data: "You don't have permission to do this!",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async setFundsHistory(fund: number): Promise<Result> {
    try {
      const user = this.auth.currentUser
      if (user) {
        const addHistory = await this.firestore
          .collection('wallet')
          .doc(`${user.uid}`)
          .collection('history')
          .add({ fund, time_stamp : timeStamp() })

        const history = await addHistory.get()
        return Promise.resolve({ success: true, data: history.data() })
      }
      return Promise.reject({
        success: false,
        data: "You don't have permission to do this!",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async getWalletBalance(): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        const balance = await this.firestore
          .collection('wallet')
          .doc(`${user.uid}`)
          .get()
        const data = balance.data()
        return Promise.resolve({ success: true, data })
      }
      return Promise.reject({
        success: false,
        data: "You don't have permission to do this!",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async getWalletHistory(): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
      const data : any = []
        const balance = await this.firestore
          .collection('wallet')
          .doc(`${user.uid}`)
          .collection('history')
          .get()
        await balance.forEach(history => data.push(history.data()))

        return Promise.resolve({ success: true, data })
      }
      return Promise.reject({
        success: false,
        data: "You don't have permission to do this!",
      })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async getFundsFromWalletById(userId: string): Promise<Result> {
    try {
      const balance = await this.firestore
        .collection('wallet')
        .doc(`${userId}`)
        .get()
      const data = balance.data()
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
