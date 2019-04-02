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

export default class FirebaseService {
  constructor() {
    this.auth = this.auth
    this.firestore = this.firestore
  }
  auth = firebase.auth()
  firestore = firebase.firestore()
}
