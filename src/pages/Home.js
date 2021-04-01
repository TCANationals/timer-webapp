import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { APP_NAME } from '../config/vars'
import history from '../stores/BrowserHistoryStore'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

import Button from '../components/Button'
import Clock from '../components/Clock'
import CustomPathInput from '../components/CustomPathInput'
import Footer from '../components/Footer'
import FullScreenButton from '../components/FullScreenButton'
import TimerLink from '../components/TimerLink'

@observer
class Home extends Component {

  timerStoreInstance = null

  constructor() {
    super()
    this.timerStoreInstance = TimerStore.getInstance()
    document.title = APP_NAME
    UiState.hasLink = true
  }

  handleCreateTimerButton() {
    this.timerStoreInstance.createTimer().then(() => {
      history.push(this.timerStoreInstance.path)
    })
  }

  render() {
    return (
      <div>
        <Clock />
        <FullScreenButton />
        <TimerLink hasLink={true} />
        <CustomPathInput />
        <Button text='Create timer' type='success' onClick={this.handleCreateTimerButton} isDisabled={!this.timerStoreInstance.isClearPath} noMarginRight />
        <Footer />
      </div>
    )
  }
}

export default Home
