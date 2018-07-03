import firebase from 'firebase';

// Web setup:
const config = {
    apiKey: "AIzaSyBenQZEtrrpR3T02CGsflXQixxATYdkKy4",
    authDomain: "roamer-firebase.firebaseapp.com",
    databaseURL: "https://roamer-firebase.firebaseio.com",
    projectId: "roamer-firebase",
    storageBucket: "roamer-firebase.appspot.com",
    messagingSenderId: "325115678523"
  };
const app_initializer = firebase.initializeApp(config); //initialize the firebase app by its config.
//to provide firebase authentication.
const db = firebase.database(); //to send/retreive data from db
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); //to provide fb auth.


export {db,facebookAuthProvider,app_initializer};
