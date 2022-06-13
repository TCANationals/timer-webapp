import firebase from 'firebase'

import { FIREBASE_CONFIG, FIREBASE_DB_TIMER_PREFIX } from '../config/vars'

firebase.initializeApp(FIREBASE_CONFIG)

// Get an estimate on time offset from server to enable better accuracy
var clientServerTimeOffset = 0;
firebase.database().ref(".info/serverTimeOffset").on("value", (snapshot) => {
  clientServerTimeOffset = snapshot.val()
  var currentTime = new Date(Date.now() + clientServerTimeOffset)
  console.log(`Detected server time offset of ${clientServerTimeOffset}\n   server time:  ${currentTime}\n   current time: ${(new Date())}`)
});

// Setup loop to try and keep time offset in sync, retry every minute
setInterval(function() {
  firebase.database().goOffline();
  setTimeout(function() {
    firebase.database().goOnline();
  }, 500);
}, 1000 * 60 * 5); // refresh every 5 minutes

function getDate() {
  return new Date(Date.now() + clientServerTimeOffset)
}

export default {
  db: firebase.database().ref(FIREBASE_DB_TIMER_PREFIX),
  timestamp: firebase.database.ServerValue.TIMESTAMP,
  date: getDate,
  auth: firebase.auth,
}
