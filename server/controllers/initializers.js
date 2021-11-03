const firebase = require('firebase-admin');
const serviceAccount = require('./credentials/serviceAccountKey.json');
const razorpayKeys = require("./credentials/razorpay.json");
const Razorpay = require("razorpay");
const insights = require("search-insights");

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

//  initstantiating razorpay
const razorpay = new Razorpay( razorpayKeys );

// initializing search insights library
insights("init", {
  appId: algoliaKeys.ApplicationId,
  apiKey: algoliaKeys.AdminAPIKey
});

module.exports = { firestore, storage, algoliaClient, algoliaIndex, firebaseAuth, razorpay, insights }