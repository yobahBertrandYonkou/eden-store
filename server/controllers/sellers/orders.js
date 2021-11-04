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
        .where("sellerId", "==", req.params.sellerId).limit(5)
        
    }else{
        conditions = firestore.collection("orders/CompletedAndPending/CompletedOrders")
        .where("sellerId", "==", req.params.sellerId).limit(5)
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

router.get('/filter/:uid/:category/:search/:from/:to/', async (req, res) => {
    var msg = req.params
        console.log(msg.search == " ")
        var collection = "PendingOrders";
        if (msg.category === "delivered") collection = "CompletedOrders";
        // defining filter condition
        var conditions;
        if(msg.from == " " && msg.to == " "){
            conditions = firestore.collection("orders").doc("CompletedAndPending")
            .collection(collection).where("sellerId", "==", msg.uid).orderBy("timeStamp")
        }else{
            conditions = firestore.collection("orders").doc("CompletedAndPending")
            .collection(collection)
            .where("timeStamp", ">=", new Date(msg.from + " 12:00:00 AM")).where("timeStamp", "<=", new Date(msg.to + " 11:59:00 PM"))
            .where("sellerId", "==", msg.uid).orderBy("timeStamp")
        }
        
        // fetching all stocks according to filter condition
        await conditions.get().then((docs)=>{
            // console.log(docs.docs);

            // .where("condition", "==", msg.condition)
            var data = [];
            if (msg.category == "all"){
                docs.docs.forEach(doc => {
                    // filter category here
                    if (msg.search != " "){
                        if (doc.data().name.toLowerCase().includes(msg.search.toLowerCase())){
                            data.push(doc.data());
                        }
                    }else{
                        
                        data.push(doc.data());
                    }
                    
                });
            }else{
                docs.docs.forEach(doc => {
                    // filter category here
                    if (msg.search != " "){
                        if (doc.data().status == msg.category && doc.data().name.toLowerCase().includes(msg.search.toLowerCase())){
                            data.push(doc.data());
                        }
                    }else{
                        if (doc.data().status == msg.category){
                            data.push(doc.data());
                        }
                    }
                    
                });
            }
            res.json({ orders: data });
            // console.log(data);
            // ws.send({"data": data});
        }).catch( error => console.log(error));
});


module.exports = router;