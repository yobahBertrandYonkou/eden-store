const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { firestore, firebaseAuth } = require('../initializers');
require("dotenv").config();



// cart count
router.ws("/cart", (ws, req) => {
    ws.on("message", async (msg) => {
        console.log("Cart count")
        console.log(msg)
        await firestore.collection("users")
        .doc(JSON.parse(msg).uid).collection("cart")
        .onSnapshot((docs) => {
            console.log(docs.docs.length );
            ws.send(JSON.stringify(docs.docs.length))
        });
    });
});


// add to cart
router.post('/cart', async (req, res) => {
    var data = req.body;
    console.log("Adding to cart");
    await firestore.collection("products")
    .where("id", "==", req.body.id).get()
    .then( async docs => {
        var data = docs.docs[0].data();
        data['photoUrl'] = data.photoUrls['photo-1'];
        delete data.photoUrls;
        data['createdOn'] = new Date();
        data['updatedOn'] = new Date();
        data['quantityNeeded'] = req.body.quantityNeeded;

        await firestore.collection("users")
        .doc(req.body.userId).collection("cart")
        .add(data)
        .then( response =>{
            console.log("added to card")
             res.json({ status: "item added" });
        })
        .catch( error => console.error(error));
    })
    .catch( error => console.error(error));
    
});

// get cart items
router.get('/cart/:userId', async (req, res) => {
    console.log("user cart")
    await firestore.collection("users")
    .doc(req.params.userId).collection("cart")
    .orderBy('updatedOn', 'desc')
    .get()
    .then(docs => {
        var data = [];

        docs.docs.forEach(doc => {
            data.push(doc.data());
        });
        // console.log(data)
         res.json({ products: data});
    })
    .catch( error => console.error(error));
});

// delete cart items
router.delete('/cart', async (req, res) => {
    console.log("deleting item")
    await firestore.collection("users")
    .doc(req.body.userId).collection("cart")
    .where("id", "==", req.body.itemId)
    .get()
    .then(async docs => {
        console.log("here");
        await firestore.collection("users")
        .doc(req.body.userId).collection("cart")
        .doc(docs.docs[0].id)
        .delete()
        .then(async response => {
            console.log(docs.docs[0].data().name)
            res.json({ status: "item deleted", name: docs.docs[0].data().name });
        })
        .catch( error => console.error(error)); 

    })
    .catch( error => console.error(error)); 
});

// update cart item
router.put('/cart', async (req, res) => {
    console.log("updating item")
    console.log(req.body)
    await firestore.collection("users")
    .doc(req.body.userId).collection("cart")
    .where("id", "==", req.body.itemId)
    .get()
    .then(async docs => {
        console.log("here");
        await firestore.collection("users")
        .doc(req.body.userId).collection("cart")
        .doc(docs.docs[0].id)
        .update({ quantityNeeded: req.body.quantity })
        .then(async response => {
            console.log(docs.docs[0].data().name)
            res.json({ status: "quanity updated" });
        })
        .catch( error => console.error(error)); 

    })
    .catch( error => console.error(error)); 
});

// authenticate users
router.post('/authentication', async (req, res) => {
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
   .then( response => {
       var data = response.data;

       // creating jwt
       const accessToken = jwt.sign({
           email: data.email,
           uid: data.localId,
       }, data.idToken, {
           expiresIn: "10m"
       });
    
    //    sending token
       res.json({
           token: accessToken,
           secretKey: data.idToken,
           status: 200
       });
       console.log("token sent");
   })
   .catch( error => {
       console.log(error.response.data)
        res.json({
            status: error.response.data.error.code,
            message: error.response.data.error.message
        });
   });
});

// login in users
router.post('/accessories/login', (req, res) => {
    jwt.verify(req.body.token, req.body.key, async (error, user) => {
        if (error) throw error;

        await firestore.collection("users")
        .doc(user.uid).get()
        .then( data => {
            console.log(data.data());
            var userData = data.data();
            userData['uid'] = user.uid;
            res.json(userData);
        })
        .catch( error => console.log(error));
        
    });
    
});

// TODO: Firebase Auth REST API
module.exports = router;