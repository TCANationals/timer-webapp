import React, { Component } from 'react'

import history from '../stores/BrowserHistoryStore'
import TimerStore from '../stores/TimerStore'

import Clock from '../components/Clock'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import Timer from '../components/Timer'
import TimerLink from '../components/TimerLink'
import TimerControls from '../components/TimerControls'

class Live extends Component {

  timerStoreInstance = null

  constructor() {
    super()
    this.timerStoreInstance = TimerStore.getInstance()
    this.timerStoreInstance.resetTimer()
  }

  componentWillMount() {
    this.checkTimerExists()
  }

  checkTimerExists() {
    this.timerStoreInstance.setPath(this.props.match.params.path)
    this.timerStoreInstance.checkForClearPath().then((isClearPath) => {
      if (isClearPath) {
        // No timer at this URL therefore redirect home
        history.push('/')
      }
    })    
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink />
        <Timer />
        <TimerControls />
        <Footer />
      </div>
    )
  }  
}

export default Live
