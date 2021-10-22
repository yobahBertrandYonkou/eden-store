const express = require('express');
const firebase = require('firebase-admin');
var serviceAccount = require("../credentials/serviceAccountKey.json");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { firestore, storage } = require('../initializers');


// logs every request (generic route)
router.use((req, res, next)=>{
    // console.log(req.body);
    console.log("New request");
    console.log(req.url)
    next();
});

// get stocks
router.get('/stocks', async (req, res) => {
    console.log("offers")
    console.log(req.params);
    await firestore.collection("products").get()
    .then(docs => {
        // console.log(response);
        var data = [];

        docs.docs.forEach( doc => {
            data.push(doc.data());
        });
        // returning data
        res.json({ products: data});

    })
    .catch(error => {
        console.log(error);
    });
});

// save offers
router.post('/', (req, res) => {
    console.log(req.body)
});

module.exports = router;