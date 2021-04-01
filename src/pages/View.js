import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import TimerStore from '../stores/TimerStore'

import Timer from '../components/Timer'

class View extends Component {
  constructor() {
    super()
    TimerStore.resetTimer()
  }

  componentWillMount() {
    this.checkTimerExists()
  }

  checkTimerExists() {
    TimerStore.setPath(this.props.params.path)
    TimerStore.checkForClearPath().then((isClearPath) => {
      if (isClearPath) {
        // No timer at this URL therefore redirect home
        browserHistory.push('/')
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
