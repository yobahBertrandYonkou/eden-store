const express = require('express');
const router = express.Router();
const { firestore } = require('../initializers');

// logging
router.use((req, res, next) => {
    console.log("product request");
    next();
});

// fetching data
router.get('/:category/:type', async (req, res) => {
    console.log(req.params);

    // fetching data
    await firestore.collection("products")
    .where("category", "==", req.params.category.toLowerCase())
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



module.exports = router;