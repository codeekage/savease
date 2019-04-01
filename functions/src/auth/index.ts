import * as firebase from 'firebase'


const config = {
  apiKey: 'AIzaSyD850mZsF8mJHqBYfd8Um1akwM3rzNYXpQ',
  authDomain: 'save-ease.firebaseapp.com',
  databaseURL: 'https://save-ease.firebaseio.com',
  projectId: 'save-ease',
  storageBucket: 'save-ease.appspot.com',
  messagingSenderId: '899728875953',
}
firebase.initializeApp(config)

export default class AuthService {

  async signUp(email: string, password: string): Promise<object> {
    try {
      const newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      return Promise.resolve(newUser)
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  async login(email : string, password : string) : Promise<object>{
      try {
          const loggedUser = await firebase.auth().signInWithEmailAndPassword(email, password);
          return Promise.resolve(loggedUser);
      } catch (error) {
          console.error(error);
          return Promise.reject(error)
      }
  }
  

  async logout(): Promise<object> {
      try{
          await firebase.auth().signOut()
          return Promise.resolve({state :  `logged out`})
      }
      catch(error){
          console.error(error);
          return Promise.reject({state : `Failed ${error}`})
      }
  }

  async nodes() : Promise<object>{
    try{
        const results = new Array()
        const data_set = await firebase.firestore().collection('nodes').get()
        data_set.forEach(async sanpshot => {
          await results.push(sanpshot.data())
        })
        return Promise.resolve(results)
    }catch(error){
        console.error(error);
        return Promise.reject(error)
    }
  }

  async profile() : Promise<object>{
      try{
          const user = await firebase.auth().currentUser;
          if(user){
            return Promise.resolve(user)
          }
          return Promise.reject({error: `You're not logged in!`})
      }catch(error){
          console.error(error);
          return Promise.reject(error)
      }

  }
}
