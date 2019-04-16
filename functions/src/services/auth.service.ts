import FirebaseService from './firebase.service'
import WalletService from './wallet.service';


const wallet = new WalletService();
interface Result {
  success: boolean
  data: {} | undefined
}

export default class AuthService extends FirebaseService {
  signUp = async (email: string, password: string): Promise<Result> => {
    try {
      const data = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      )
      const balance = await wallet.setFundsToWallet(0)
      return Promise.resolve({ success: true, data, balance })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async login(email: string, password: string): Promise<Result> {
    try {
      const data = await this.auth.signInWithEmailAndPassword(email, password)
      return Promise.resolve({ success: true, data })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async logout(): Promise<Result> {
    try {
      await this.auth.signOut()
      return Promise.resolve({ success: true, data: 'logged out' })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }

  async currentUser(): Promise<Result> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        return Promise.resolve({ success: true, data: user })
      }
      return Promise.reject({ success: false, error: "You're not logged in!" })
    } catch (error) {
      console.error(error)
      return Promise.reject({ success: false, error })
    }
  }
}
