import React, { Component } from 'react'
import Radium from 'radium'
import { COLOURS, SIZE } from '../config/vars.js'

class Footer extends Component {
  render() {
    const styles = {
      footer: {
        marginTop: SIZE.px(4),
      },
      a: {
        color: COLOURS.DARK_BLUE,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    }

    return (
      <footer style={styles.footer}>
      </footer>
    )
  }
}

export default Radium(Footer)
