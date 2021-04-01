import firebase from 'firebase/app'
import { FIREBASE_CONFIG } from '../config/vars'

firebase.initializeApp(FIREBASE_CONFIG)

export default {
  db: firebase.database().ref(),
  timestamp: firebase.database.ServerValue.TIMESTAMP
}
