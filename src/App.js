import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { StyleRoot, Style } from 'radium'
import firebase from 'firebase'

import { COLOURS, SIZE, FIREBASE_CONFIG } from './config/vars.js'

import { FirebaseAuthProvider } from "./modules/auth/FirebaseAuthProvider";

import Home from './pages/Home'
import Live from './pages/Live'
import View from './pages/View'

class App extends Component {
  render() {
    const styles = {
      html: {
        backgroundColor: COLOURS.BLUE,
      },
      body: {
        color: COLOURS.WHITE,
        fontFamily: 'sans-serif',
        marginBottom: SIZE.px(20),
        marginLeft: 0,
        marginRight: 0,
        marginTop: SIZE.px(20),
        padding: 0,
        textAlign: 'center',
      },
      a: {
        color: COLOURS.WHITE,
        textDecoration: 'none',
      }
    }

    return (
      <StyleRoot>
        <Style rules={styles} />
        <FirebaseAuthProvider {...FIREBASE_CONFIG} firebase={firebase}>
          <Router history={browserHistory}>
            <Route path='/' component={Home} />
            <Route path='/:path' component={View} />
            <Route path='/admin/:path' component={Live} />
          </Router>
        </FirebaseAuthProvider>
      </StyleRoot>
    )
  }
}

export default App
