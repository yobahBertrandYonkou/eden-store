const express = require('express');
const router = express.Router();
const { firestore } = require('../initializers');


// logs every request (generic route)
router.use((req, res, next)=>{
    // console.log(req.body);
    console.log("New order request");
    console.log(req.url)
    next();
});

// get data
// get cart items
router.get('/:type/:sellerId', async (req, res) => {
    var conditions;
    if(req.params.type == "pending"){
        conditions = firestore.collection("orders/CompletedAndPending/PendingOrders")
        .where("sellerId", "==", req.params.sellerId).limit(2)
        
    }else{
        conditions = firestore.collection("orders/CompletedAndPending/CompletedOrders")
        .where("sellerId", "==", req.params.sellerId).limit(2)
    }

    await conditions.get()
    .then(docs => {
        var data = [];

        docs.docs.forEach(doc => {
            data.push(doc.data());
        });
        // console.log(data)
        res.json({ orders: data});
    })
    .catch( error => console.error(error));
});


module.exports = router;