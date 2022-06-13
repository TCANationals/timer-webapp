import React, { Component } from 'react'
import Radium from 'radium'
import { observer } from 'mobx-react'
import FontAwesome from 'react-fontawesome'

import { APP_NAME, COLOURS, SIZE, BP } from '../config/vars.js'
import AdjustingInterval from '../modules/AdjustingInterval'
import TimerStore from '../stores/TimerStore'
import UiState from '../stores/UiState'

@observer
class Timer extends Component {

  componentWillMount() {
    TimerStore.subscribeToTimerUpdates()
    this.calculateTime()
    TimerStore.timer.timerRef = new AdjustingInterval(() => this.calculateTime(), 1000)
    TimerStore.timer.timerRef.start()
  }

  componentWillUnmount() {
    //window.clearTimeout(TimerStore.timer.timerRef)
    if (TimerStore.timer.timerRef) {
      TimerStore.timer.timerRef.stop()
    }
  }

  prependZeroCheck(number) {
    let string = number.toString()
    if (string.length === 1) {
      return '0' + string
    }

    return number
  }

  calculateTime() {
    let currentTime = Date.now()
    if (TimerStore.timer.storeRef) {
      currentTime = TimerStore.timer.storeRef.date()
    }
    let totalSeconds = (new Date(TimerStore.timer.endTime) - currentTime) / 1000
    let hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor((totalSeconds / 60) - (hours * 60))
    let seconds = Math.floor(totalSeconds - (minutes * 60) - (hours * 3600))
    if (hours >= 0) {
      TimerStore.timer.hours = hours
      TimerStore.timer.minutes = minutes
      TimerStore.timer.seconds = seconds
    } else {
      TimerStore.timer.hours = 0
      TimerStore.timer.minutes = 0
      TimerStore.timer.seconds = 0
    }
    document.title = this.generatePageTitle()
  }

  generatePageTitle() {
    if(TimerStore.timer.hours>0){
      return TimerStore.timer.hours + 'h ' + TimerStore.timer.minutes + 'm ' + TimerStore.timer.seconds + 's - ' + APP_NAME
    }else{
      return TimerStore.timer.minutes + 'm ' + TimerStore.timer.seconds + 's - ' + APP_NAME
    }
  }

  getFontSizeProperty() {
    return UiState.fontSize.toString() + '%'
  }

  render() {
    const styles = {
      timer: {
        fontSize: this.getFontSizeProperty(),
        textAlign: 'right',
        marginRight: SIZE.px(4),
        [BP.SMALL]: {
          marginRight: 0,
          textAlign: 'center'
        }
      },
      msg:{
        display: 'inline-block',
        fontSize: SIZE.em(4),
        fontWeight: '300',
        marginBottom: SIZE.px(4),
        position: 'relative',
      },
      h1: {
        display: 'inline-block',
        fontSize: SIZE.em(5),
        fontFamily: "'Roboto Mono', monospace",
        marginBottom: SIZE.px(2),
        marginRight: SIZE.px(4),
        marginTop: 0,
        [BP.MEDIUM] : {
          fontSize: SIZE.em(14),
        },
        [BP.LARGE] : {
          fontSize: SIZE.em(20),
        },
        '-webkit-text-stroke-color': COLOURS.DARK_BLUE,
        '-webkit-text-stroke-width': '1px',
      },
      noMarginRight: {
        marginRight: 0,
      },
      small: {
        color: COLOURS.DARK_BLUE,
        '-webkit-text-stroke-color': COLOURS.WHITE,
        '-webkit-text-stroke-width': '1px',
        fontSize: '50%',
        fontFamily: 'sans-serif',
      },
      spinner: {
        display: 'block',
      },
    }

    if (!UiState.loading) {
      if (TimerStore.timer.hours > 0) {
        return (
          <div>
            <div style={styles.timer}>
              <h1 style={styles.h1}>{TimerStore.timer.hours}<small style={styles.small}>H</small></h1>
              <h1 style={styles.h1}>{TimerStore.timer.minutes}<small style={styles.small}>M</small></h1>
            </div>
          </div>
        )
      }else{
        return (
          <div>
            <div style={styles.timer}>
              <h1 style={styles.h1}>{TimerStore.timer.minutes}<small style={styles.small}>M</small></h1>
              <h1 style={[styles.h1, styles.noMarginRight]}>{TimerStore.timer.seconds}<small style={styles.small}>S</small></h1>
            </div>
          </div>
        )
      }
    }

    return <FontAwesome style={styles.spinner} name='spinner' size='4x' spin />
  }
}

export default Radium(Timer)
