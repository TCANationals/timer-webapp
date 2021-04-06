import React, { Component } from 'react'
import Radium from 'radium'

import { COLOURS, SIZE, BP } from '../config/vars.js'

class StyleWrapper extends Component {

  render() {
    const { children } = this.props;
    const styles = {
      wrapper: {
        //backgroundColor: 'transparent',
        [BP.SMALL] : {
          backgroundColor: COLOURS.BLUE,
          marginTop: SIZE.px(20),
        },
        width: '100%',
        height: '100%',
      },
    }

    return (
      <div style={styles.wrapper}>
        {children}
      </div>
    )

  }
}

export default Radium(StyleWrapper)
