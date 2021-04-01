import { action, observable, reaction } from 'mobx'

import store from './FirebaseStore'
import UiState from './UiState'

export default class TimerStore {
  static myInstance = null

  @observable path = ''
  @observable isClearPath = false
  @observable message = ''
  @observable timer = {
    timerRef: null,
    createdAt: null,
    endTime: null,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  static getInstance() {
    if (TimerStore.myInstance == null) {
      TimerStore.myInstance = new TimerStore()
    }

    return this.myInstance
  }

  constructor() {
    this.subscribeToPathChecks()
    this.clearOldFirebaseTimers()
  }

  @action resetTimer() {
    this.timer = {
      timerRef: null,
      createdAt: null,
      endTime: null,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  @action setPath(path) {
    this.path = path
  }

  checkForClearPath() {
    return new Promise((resolve, reject) => {
      store.db.once('value').then((snapshot) => {
        if (snapshot.hasChild(this.path)) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  @action subscribeToPathChecks() {
    reaction(() => this.path, () => {
      if (this.path !== '') {
        this.checkForClearPath().then((isClearPath) => {
          if (isClearPath) {
            this.isClearPath = true
          } else {
            this.isClearPath = false
          }
        })
      } else {
        this.isClearPath = false
      }
    }, {delay: 100})
  }

  createTimer() {
    if (this.path !== '') {
      return store.db.child(this.path).set({
        createdAt: store.timestamp,
        endTime: store.timestamp,
        message: "Countdown",
      })
    }
  }

  @action subscribeToTimerUpdates() {
    store.db.child(this.path).on('value', (snapshot) => {
      let data = snapshot.val()
      if (data) {
        this.timer.createdAt = data.createdAt
        this.timer.endTime = data.endTime
        this.message = data.message
      }
    })
    UiState.loading = false
  }

  clearOldFirebaseTimers() {
    store.db.once('value').then((snapshot) => {
      snapshot.forEach((timer) => {
        let hours = (new Date(timer.val().endTime) - new Date()) / 1000 / 60 / 60
        // Delete timer if finished over 24 hours ago
        if (hours < -24) {
          store.db.child(timer.key).remove()
        }
      })
    })
  }

  setTime = (minutes) => {
    let endTime = new Date().getTime() + minutes * 60 * 1000 + 1000
    store.db.child(this.path).update({
      endTime: endTime
    })
  }

  setMessage = (msg) =>{
    store.db.child(this.path).update({
      message: msg
    })
  }
}
