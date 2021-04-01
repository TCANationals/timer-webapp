import React, { Component } from 'react'

import history from '../stores/BrowserHistoryStore'
import TimerStore from '../stores/TimerStore'

import Timer from '../components/Timer'

class View extends Component {

  timerStoreInstance = null

  constructor() {
    super()
  }

  componentWillMount() {
    this.timerStoreInstance = TimerStore.getInstance()
    this.timerStoreInstance.resetTimer()
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
        <Timer />
      </div>
    )
  }  
}

export default View
