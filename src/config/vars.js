export const APP_NAME = 'TCA Clock'

export const COLOURS = {
  BLUE: '#636363',
  DARK_BLUE: '#4a4a4a',
  GREEN: '#2ecc71',
  RED: '#e74c3c',
  GREY: '#e6e6e6',
  WHITE: '#fff',
}

export const SIZE = {
  BASE_PX: '5',
  BASE_EM: '1',
  px(multiple) {
    return (this.BASE_PX * multiple).toString() + 'px'
  },
  em(multiple) {
    return (this.BASE_EM * multiple).toString() + 'em'
  },
}

export const BP = {
  SMALL: '@media screen and (min-width: 768px)',
  MEDIUM: '@media screen and (min-width: 992px)',
  LARGE: '@media screen and (min-width: 1200px)',
}

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCSShkiA7y-6CoqNYwv45LdjCnOdvRp6Fg",
  authDomain: "tca-timer.firebaseapp.com",
  projectId: "tca-timer",
  storageBucket: "tca-timer.appspot.com",
  messagingSenderId: "551931464028",
  appId: "1:551931464028:web:9fc72950f2e08168e29999",
  measurementId: "G-LXHKF0XXEE",
}
