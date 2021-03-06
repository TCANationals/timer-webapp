import React, { Component } from 'react'
import Radium from 'radium'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { COLOURS, SIZE } from '../config/vars.js'
import AdjustingInterval from '../modules/AdjustingInterval'

@observer
class Clock extends Component {
  @observable time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  constructor() {
    super()
    this.timer = null
  }

  componentWillMount() {
    this.getTime()
    this.timer = new AdjustingInterval(() => this.getTime(), 1000)
    this.timer.start()
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
    if (this.timer) {
      this.timer.stop()
    }
  }

  getTime() {
    let now = new Date()
    this.time.hours = this.prependZeroCheck(now.getHours())
    this.time.minutes = this.prependZeroCheck(now.getMinutes())
    this.time.seconds = this.prependZeroCheck(now.getSeconds())
  }

  prependZeroCheck(number) {
    let string = number.toString()
    if (string.length === 1) {
      return '0' + string
    }

    return number
  }

  render() {
    const styles = {
      clock: {
        backgroundColor: COLOURS.DARK_BLUE,
        borderRadius: SIZE.px(2),
        fontSize: SIZE.em(2),
        left: SIZE.px(4),
        padding: SIZE.px(2),
        position: 'absolute',
        top: SIZE.px(4),
      }
    }

    return (
      <div style={styles.clock}>
        {this.time.hours}:{this.time.minutes}:{this.time.seconds}
      </div>
    )
  }
}

export default Radium(Clock)
