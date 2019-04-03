import FirebaseService from './firebase.service'

export default class AuthService extends FirebaseService {

   signUp = async (email: string, password: string): Promise<object> => {
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      )
      return Promise.resolve(newUser)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async login(email: string, password: string): Promise<object> {
    try {
      const loggedUser = await this.auth.signInWithEmailAndPassword(
        email, password
      )
      return Promise.resolve(loggedUser)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async logout(): Promise<object> {
    try {
      await this.auth.signOut()
      return Promise.resolve({ state: `logged out` })
    } catch (error) {
      console.error(error)
      return Promise.reject({ state: `Failed ${error}` })
    }
  }

  async currentUser(): Promise<object> {
    try {
      const user = await this.auth.currentUser
      if (user) {
        return Promise.resolve(user)
      }
      return Promise.reject({ error: `You're not logged in!` })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

}
