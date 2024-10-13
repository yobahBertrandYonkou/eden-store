const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();


const { firestore, firebaseAuth, razorpay, insights } = require('../initializers');
require("dotenv").config();

// signup users
router.post('/signup', (req, res) => {
    axios({
        method: "POST",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ process.env.WEP_API_KEY }`,
        data: {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: false
        }
    })
   .then( async response => {

        console.log(response.data)
        await firestore.collection("sellers").doc(response.data.localId).set({ ...req.body, customers: [], searches: 0 })
        .then( docResponse => {
             res.json({ status: 200, uid: response.data.localId });
        })
        .catch( error => console.log(error));
        
   }).catch( error => {
       console.log(error.response.data)
        res.json({
            status: error.response.data.error.code,
            message: error.response.data.error.message
        });
   });
    
});

// login
router.post('/signin', async (req, res) => {
    console.log(req.body)
    axios({
        method: "POST",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ process.env.WEP_API_KEY }`,
        data: {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: false
        }
    })
   .then( async response => {
       console.log(response.data)
       await firestore.collection("sellers").where('email', '==', response.data.email).get()
       .then( userData => {
            console.log(userData.docs[0].data())
            res.json({ status: 200, data: userData.docs[0].data(), uid: userData.docs[0].data()['id'] });
       })
       .catch( error => console.log(error) );
   })
   .catch( error => {
       console.log(error.response.data)
        res.json({
            status: error.response.data.error.code,
            message: error.response.data.error.message
        });
   });
});


module.exports = router;