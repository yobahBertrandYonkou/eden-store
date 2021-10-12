const express = require('express');
const firebase = require('firebase-admin');
var serviceAccount = require("../credentails/serviceAccountKey.json");
const router = express.Router();

// firebase  initialization
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
const firestore = firebase.firestore();


// logs every request (generic route)
router.use((req, res, next)=>{
    console.log(req.body);
    next();
});

// fetches all stocks from the database (firebase/firestore)
router.ws('/', async (ws, req) => {
    console.log("New Socket created");
    // fetching all stocks
    await firestore.collection("products").orderBy("updatedOn").onSnapshot((docs)=>{
        console.log(docs.docs);
        var data = [];
        docs.docs.forEach(doc => {
            data.unshift(doc.data());
        });
        ws.send(JSON.stringify({"data": data}));
        // console.log(data);
        // ws.send({"data": data});
    });

    // logging socket closed
    ws.on("close", (ws)=>{
        console.log("One socket closed");
    })
});

// search for stock record
router.get('/search/:category/:from/:to/:text', (req, res) => {
    res.json({"respond": "all stocks"});
});

// adding new stock
router.post('/', async (req, res) => {

    // writing data to database (firestore)
    var data = req.body;
    // setting id and rating value

    /*
        Stock id format STK-CATEGORY-DATE 
        CATEGORY can take (CT - CATS, HT - HAMSTERS, BD - BIRDS, - ALL - ALL, DG - DOGS)
        DATE(ddmmyyy) without separators
    */
    var categories = {
        "cats": "CT",
        "hamsters": "HT",
        "birds": "BD",
        "dogs": "DG",
        "all": "ALL" 
    }

    data["id"] = `STK-${categories[req.body.category]}-${new Date().toJSON().substring(0, 10).split("-").reverse().join("")}`;
    data['createdOn'] = new Date();
    data['updatedOn'] = new Date();

    data['rating'] = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    }

    await firestore.collection("products").add(data)
    .then(response => {
        console.log(response);
        res.json({"respond": "Stock added successfully."});
    })
    .catch(error => {
        console.log(error);
    });

    
});

// updating stock
router.put('/', (req, res) => {
    res.json({"respond": "update stock"});
});

// deleting stock
router.delete('/', (req, res) => {
    res.json({"respond": "delete stock"});
});

router.all('/', (req, res, next) => {
    res.status(405).json({"respond": "Method not supported"});
});

module.exports = router;