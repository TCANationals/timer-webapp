import firebase from 'firebase'
import { FIREBASE_CONFIG, FIREBASE_DB_TIMER_PREFIX } from '../config/vars'

firebase.initializeApp(FIREBASE_CONFIG)

const store = {
  db: firebase.database().ref(FIREBASE_DB_TIMER_PREFIX),
  timestamp: firebase.database.ServerValue.TIMESTAMP,
}

export default store
