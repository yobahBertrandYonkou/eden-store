const firebase = require('firebase-admin');
const serviceAccount = require('./credentials/serviceAccountKey.json');

// firebase  initialization
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: "login-371ec.appspot.com/",
  });
const firestore = firebase.firestore();
const storage = firebase.storage();
const firebaseAuth = firebase.auth();

// initializing algolia
const algoliasearch = require('algoliasearch');
const algoliaKeys = require('./credentials/algolia.json');
const algoliaClient = algoliasearch(algoliaKeys.ApplicationId, algoliaKeys.AdminAPIKey);
const algoliaIndex = algoliaClient.initIndex("eden_products");


module.exports = { firestore, storage, algoliaClient, algoliaIndex, firebaseAuth }