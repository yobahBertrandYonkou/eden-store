const express = require('express');
const router = express.Router();
const { firestore } = require('../initializers');

// logging
router.use((req, res, next) => {
    console.log("product request");
    next();
});

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

// fetching data
router.get('/:category/:type', async (req, res) => {
    console.log(req.params);

    // fetching data
    await firestore.collection("products")
    .where("category", "in", [req.params.category.toLowerCase(), "all"])
    .where("type" , "==", req.params.type.toLowerCase() )
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

router.get('/:id', async (req, res) => {
    console.log("Product detail request")
    // fetching data
    await firestore.collection("products")
    .where("id" , "==", req.params.id )
    .get()
    .then(docs => {
        // console.log(data)
        res.json(docs.docs[0].data());
    })
    .catch( error => console.error(error));
});

router.post('/cart', async (req, res) => {
    console.log("Adding to cart");
    await firestore.collection("users")
    .doc(req.body.sellerId).collection("cart")
    .add(req.body)
    .then( response =>{
        console.log("added to card")
         res.json({ status: "item added" });
    })
    .catch( error => console.error(error));

});

module.exports = router;