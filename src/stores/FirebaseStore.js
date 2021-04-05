import firebase from 'firebase'

import { FIREBASE_CONFIG, FIREBASE_DB_TIMER_PREFIX } from '../config/vars'

firebase.initializeApp(FIREBASE_CONFIG)

export default {
  db: firebase.database().ref(FIREBASE_DB_TIMER_PREFIX),
  timestamp: firebase.database.ServerValue.TIMESTAMP,
  auth: firebase.auth,
}
