import FirebaseService from './firebase.service'
interface Result {
  success: boolean
  data: any
}


export default class WalletService extends FirebaseService {
  async setFundsToWallet(fund: number): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        const walletFund = await this.firestore
          .collection('users')
          .doc(`${user.uid}`)
          .collection('wallet')
          .doc(`${user.uid}`)
          .set({ fund })
        console.log(walletFund)
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

  async getFundsFromWallet(): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        const balance = await this.firestore
          .collection('users')
          .doc(`${user.uid}`)
          .collection('wallet')
          .get()
        const data = balance.docs[0]
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
        .collection('users')
        .doc(`${userId}`)
        .collection('wallet')
        .get()
      const data = balance.docs[0]
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
