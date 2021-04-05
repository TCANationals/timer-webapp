import React, { Component } from 'react'
import Radium from 'radium'
import firebase from 'firebase'

import { COLOURS, SIZE } from '../config/vars.js'
import Button from './Button'

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../modules/auth/FirebaseAuthProvider'

class Footer extends Component {

  constructor(props){
    super(props);
    this.firebase = firebase;
  }

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
        <div>
          <IfFirebaseAuthed>
            <Button text='Sign Out' onClick={() => { this.firebase.app().auth().signOut() }} />
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            <div>
              <Button text='Sign In - Google' icon='google' onClick={() => {
                const authProv = new this.firebase.auth.GoogleAuthProvider();
                this.firebase.auth().signInWithPopup(authProv);
              }} />
              <Button text='Sign In - GitHub' icon='github' onClick={() => {
                const authProv = new this.firebase.auth.GithubAuthProvider();
                this.firebase.auth().signInWithPopup(authProv);
              }} />
            </div>
          </IfFirebaseUnAuthed>
        </div>
      </footer>
    )

  }
}

export default Radium(Footer)
