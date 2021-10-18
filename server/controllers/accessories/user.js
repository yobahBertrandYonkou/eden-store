const express = require('express');
const router = express.Router();
const { firestore } = require('../initializers');


// cart count
router.ws("/cart", (ws, req) => {
    ws.on("message", async (msg) => {
        console.log("Cart count")
        await firestore.collection("users")
        .doc("DSErqrq545dsDh").collection("cart")
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
module.exports = router;