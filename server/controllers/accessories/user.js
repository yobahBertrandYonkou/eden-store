const { conditionalExpression } = require('@babel/types');
const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const now= require('nano-time');
const razorpayKeys = require('../credentials/razorpay.json');


const { firestore, razorpay, insights } = require('../initializers');
require("dotenv").config();



// cart count
router.ws("/cart", (ws, req) => {
    ws.on("message", async (msg) => {
        console.log("Cart count")
        console.log(msg)
        if(JSON.parse(msg).uid == null) return;

        await firestore.collection("users")
        .doc(JSON.parse(msg).uid).collection("cart")
        .onSnapshot((docs) => {
            var count = 0;
            docs.docs.forEach(doc => {
                count += doc.data().quantityNeeded;
            });
            ws.send(JSON.stringify(count))
        });
    });
});


// add to cart
router.post('/cart', async (req, res) => {
    var data = req.body;

    // sending click event
    insights("clickedObjectIDsAfterSearch", {
        userToken: req.body.userId,
        index: "eden_products",
        eventName: "Clicked Item",
        objectIDs: [req.body.id]
    });

    // increment quantity if user already has it in cart
    console.log("Started");
    await firestore.collection("users")
    .doc(req.body.userId).collection("cart")
    .where("id", "==", req.body.id).get()
    .then( async response => { 
        console.log("Checking");
        if(response.docs.length > 0){console.log("exists");
            var newQuantity = response.docs[0].data().quantityNeeded;
            newQuantity += req.body.quantityNeeded;

            // update quantity needed
            await firestore.collection("users")
            .doc(req.body.userId).collection("cart")
            .doc(response.docs[0].id).update({ quantityNeeded: newQuantity })
            .then(  docs => {
                console.log("Updated");
                res.json({ status: "updated" });
            }).catch( error => console.error(error));;
        }else{
            console.log("new item");
            // make new entry
            await firestore.collection("products")
            .where("id", "==", req.body.id).get()
            .then( async docs => {
                var data = {
                    ...docs.docs[0].data(),
                    ...req.body
                }
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
                    res.json({ status: "added" });
                })
                .catch( error => console.error(error));
            })
            .catch( error => console.error(error));
        }
    })
    .catch( error => console.error(error));

    console.log("Event registered");

    console.log("Adding to cart");
    
    
});

// get cart items
router.get('/cart/:userId', async (req, res) => {
    console.log("user cart")
    await firestore.collection("users")
    .doc(req.params.userId).collection("cart")
    .orderBy('updatedOn', 'desc').limit(2)
    .get()
    .then(async docs => {
        var data = [];
        var categories = [];
        var itemIds = [];

        docs.docs.forEach(doc => {
            data.push(doc.data());
            categories.push(...doc.data().category);
            itemIds.push(doc.data().id)
        });
        categories = [...new Set(categories)];
        console.log(categories);
        // console.log(data)
        if (categories.length == 0) categories = [null]
        await firestore.collection('products')
        .where("category", "array-contains-any", categories)
        .limit(12)
        .get()
        .then( docs => {
            var related = [];
            
            docs.docs.forEach(doc => {
                if (!itemIds.includes(doc.data().id)) related.push(doc.data());
            });
            res.json({ products: data, related: related });
        })
        .catch( error => console.error(error));
        
    })
    .catch( error => console.error(error));
});

// get orders items
router.get('/orders/:type/:userId', async (req, res) => {
    var conditions;
    if(req.params.type == "pending"){
        conditions = firestore.collection("orders/CompletedAndPending/PendingOrders")
        .where("userId", "==", req.params.userId).limit(2)
        
    }else{
        conditions = firestore.collection("orders/CompletedAndPending/CompletedOrders")
        .where("userId", "==", req.params.userId)
    }

    await conditions.get()
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
            var userData = {
                ...data.data(),
                "uid": user.uid
            }
            // userData['uid'] = user.uid;
            res.json(userData);
        })
        .catch( error => console.log(error));
        
    });
    
});

router.post('/orders/create', async (req, res) => {
    console.log(req.body);

    var conditions;

    if(req.body.userType === "seller") conditions = firestore.collection("sellers").doc(req.body.uid)
    else conditions = firestore.collection("users").doc(req.body.uid)
    // checks whether user exist    
    await conditions
    .get().then( response => {
        
        if (response.exists){
            console.log("creating order")

            // creating order
            razorpay.orders.create({
                amount: 100 * parseFloat(req.body.amount),
                currency: "INR",
                receipt: "order_rcptid_" + now()
            }, (error, order) => {

                if (error) throw error;

                console.log("order")
                console.log(order)

                res.json({ key_id: razorpayKeys.key_id, order: order, status: 200 });
            });
        }else{
            res.json({"key_id": null, status: 404});
        }
    }).catch( error => console.log(error));
});

router.post('/orders/save', async (req, res) => {
    var data = req.body;
    data['timeStamp'] = new Date();
    console.log(data);

    var itemIds = [];
    var sellerIds = [];
    var tempData = {...data};
    var idFrequencies = {};
    delete tempData["items"];


    await firestore.collection("orders")
    .doc("CompletedAndPending")
    .collection("OrderSummaries")
    .add(tempData)
    .then( response => {
        console.log("Order summary saved");
    }).catch( error => console.log(error));

    req.body.items.forEach( async item => {
        itemIds.push(item.id);
        sellerIds.push(item.sellerId);
        console.log(req.body.userId)
        console.log(item.id);
        idFrequencies[item.id] = item.quantityNeeded;

        // save item to pending orders
        await firestore.collection("orders")
        .doc("CompletedAndPending")
        .collection("PendingOrders")
        .add({...item, orderId: data.orderId, timeStamp: new Date(), shippingAddress: data.shippingAddress, status: "pending" })
        .then( response => {
            console.log(item.id + " saved");
        }).catch( error => console.log(error));

        // deleting item from cart
        await firestore.collection("users")
        .doc(req.body.userId)
        .collection('cart')
        .where("id", "==", item.id)
        .get()
        .then( async docs => {
            await firestore.collection("users").doc(req.body.userId).collection("cart").doc(docs.docs[0].id).delete();
        })
        .catch( error => console.log(error));
    });


    // sending click event
    insights("convertedObjectIDsAfterSearch", {
        userToken: req.body.userId,
        index: "eden_products",
        eventName: "Clicked Item",
        objectIDs: itemIds
    });

    // increase product purchase count

    for( var itemId in idFrequencies){
        await firestore.collection("products").where("id", "==", itemId).get()
        // eslint-disable-next-line no-loop-func
        .then( async doc => {
            if (doc.docs[0].data().purchases === undefined) await firestore.collection("products").doc(doc.docs[0].id).update({ purchases: idFrequencies[itemId] })
            else await firestore.collection("products").doc(doc.docs[0].id).update({ purchases: doc.docs[0].data().purchases + idFrequencies[itemId] })
        }).catch( error => console.log(error));
    }

    // register customer count
    sellerIds = Array.from(new Set(sellerIds));
    sellerIds.forEach( async (seller) => {
        await firestore.collection("sellers")
        .doc(seller).get()
        .then( async (doc) => {
            var newCustomerSet = [
                ...doc.data().customers,
                data.userId
            ]
            await firestore.collection("sellers")
            .doc(seller).update({ customers: Array.from(newCustomerSet)});
        })
        .catch( error => console.log(error))
    });

    console.log("Event registered")

    res.json({ status: 200, message: "Order completed" });
});



module.exports = router;