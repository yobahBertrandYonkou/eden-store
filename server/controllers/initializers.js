const firebase = require('firebase-admin');
const serviceAccount = require('./credentials/serviceAccountKey.json');

// firebase  initialization
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: "login-371ec.appspot.com/",
  });
const firestore = firebase.firestore();
const storage = firebase.storage();

module.exports = { firestore, storage }