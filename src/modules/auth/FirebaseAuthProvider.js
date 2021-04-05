import * as React from "react";
import createReactContext from 'create-react-context';
import { initializeFirebaseApp } from "./initialize-firebase-app";

const e = React.createElement;

const firebaseAuthProviderDefaultProps = {
  isSignedIn: false,
  providerId: null,
  user: null
};

const FirebaseAuthContext = createReactContext(firebaseAuthProviderDefaultProps);
const FirebaseAuthContextProvider = FirebaseAuthContext.Provider;
const FirebaseAuthContextConsumer = FirebaseAuthContext.Consumer;

export class FirebaseAuthProvider extends React.PureComponent {
  listenToAuth() {
    const { firebase } = this.props;
    this.stopListeningToAuth = firebase
      .app()
      .auth()
      .onAuthStateChanged(user => {
        let authEmission = null;
        if (user === null) {
          authEmission = {
            isSignedIn: false,
            providerId: "none",
            user
          };
        } else if (user.isAnonymous === true) {
          authEmission = {
            isSignedIn: true,
            providerId: "anonymous",
            user
          };
        } else if (user.providerData && user.providerData[0]) {
          authEmission = {
            isSignedIn: true,
            providerId: user.providerData[0].providerId,
            user
          };
        }
        if (authEmission !== null) {
          this.setState(() => authEmission);
        } else {
          console.warn("Something unexpected happened with ", user);
        }
      });
  }
  constructor(props) {
    super(props);
    initializeFirebaseApp(Object.assign({}, props));
    this.state = {
      isSignedIn: false,
      providerId: null,
      user: null
    };
  }
  componentDidMount() {
    this.listenToAuth();
  }

  componentWillUnmount() {
    this.stopListeningToAuth && this.stopListeningToAuth();
  }

  render() {
    const { children } = this.props;
    return e(
      FirebaseAuthContextProvider,
      { value: this.state },
      children
    );
  }
}

export const IfFirebaseAuthed = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === true
        ? children
        : null
  );
};

export const IfFirebaseUnAuthed = ({ children }) => {
  return e(
    FirebaseAuthContextConsumer,
    null,
    authState =>
      authState.isSignedIn === false
        ? children
        : null
  );
};
