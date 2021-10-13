/* eslint-disable no-loop-func */
const express = require('express');
const firebase = require('firebase-admin');
var serviceAccount = require("../credentials/serviceAccountKey.json");
const router = express.Router();
const fs = require('fs');
const path = require('path');

// firebase  initialization
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: "login-371ec.appspot.com/",
});
const firestore = firebase.firestore();
const storage = firebase.storage();

// logs every request (generic route)
router.use((req, res, next)=>{
    // console.log(req.body);
    console.log("New request");
    next();
});

var snapShotTracker = null;

// fetches all stocks from the database (firebase/firestore) and handling searches
router.ws('/', (ws, req) => {
    console.log("New Socket created");
    // receiving search filters
    ws.on("message", async (message) => {
        var msg = JSON.parse(message);
        console.log(snapShotTracker)
        console.log(msg)
        // unsubscribe old data
        if (snapShotTracker != null){
            snapShotTracker();
            console.log("Unsubscribed");
        }
        
        // defining filter condition
        var conditions;
        if(msg.from == "" && msg.to == ""){
            conditions = firestore.collection("products").orderBy("updatedOn")
        }else if(msg.from != "" && msg.to == ""){
            conditions = firestore.collection("products")
            .where("updatedOn", ">=", new Date(msg.from + " 12:00:00 AM")).orderBy("updatedOn")
        }else if (msg.from == "" && msg.to != ""){
            conditions = firestore.collection("products")
            .where("updatedOn", "<=", new Date(msg.to + " 11:59:00 PM")).orderBy("updatedOn")
        }else if(msg.from != "" && msg.to != ""){
            conditions = firestore.collection("products")
            .where("updatedOn", ">=", new Date(msg.from + " 12:00:00 AM")).where("updatedOn", "<=", new Date(msg.to + " 11:59:00 PM")).orderBy("updatedOn")
        }
        
        // fetching all stocks according to filter condition
        snapShotTracker = conditions.onSnapshot((docs)=>{
            // console.log(docs.docs);

            // .where("category", "==", msg.category)
            var data = [];
            docs.docs.forEach(doc => {
                // filter category here
                if (msg.search != ""){
                    if (doc.data().category == msg.category && doc.data().name.toLowerCase().includes(msg.search.toLowerCase())){
                        data.unshift(doc.data());
                    }
                }else{
                    if (doc.data().category == msg.category){
                        data.unshift(doc.data());
                    }
                }
                
            });
            ws.send(JSON.stringify({"data": data}));
            // console.log(data);
            // ws.send({"data": data});
        });
        console.log(snapShotTracker)
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

// uploading photos
router.post('/stocks/upload', (req, res) => {
    
});
// adding new stock
router.post('/', async (req, res) => {

    // writing data to database (firestore)
    var data = req.body;
    // console.log(data)

    
    // setting id and rating value

    /*
        Stock id format STK-CATEGORY-DATE-hhmmss 
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

    data["id"] = `STK-${categories[req.body.category]}-${new Date().toJSON().substring(0, 10).split("-").reverse().join("")}-${new Date().toTimeString().substring(0,8).split(":").join("")}`;
    data['createdOn'] = new Date();
    data['updatedOn'] = new Date();

    data['rating'] = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    }

    // handling files
    var files = req.files;
    var filePath;
    // creates a dir for the current stock
    fs.mkdirSync(path.join(__dirname, `temp/${data.id}`));

    for (var file in files){
        
        // creates a temp file
        filePath = path.join(__dirname, `temp/${data.id}/` + file + "." + files[file].name.split(".").reverse()[0]);
        fs.writeFileSync(filePath, new Uint8Array(files[file].data));
        
    }

    // reading all files that have to be uploaded
    fs.readdir(path.join(__dirname, `temp/${data.id}/`), async (error, files) => {
        console.log(files);

        // uploading images
        await Promise.all(
            files.map((filename => {
                console.log("Uploading")
                return storage.bucket().upload(path.join(__dirname, `temp/${data.id}/${filename}`),  { destination: `EDEN/accessories/stocks/${data.id}/${filename}` });
            }))
        )
        .then( async (response) => {
            console.log("Uploaded");

            // putting photo urls together
            var photoUrls = {};
            var count = 1;
            for (var file in response){
                console.log(response[file][0].publicUrl());
                photoUrls[`photo-${count++}`] = response[file][0].publicUrl();
            }

            // add photos to data
            data['photoUrls'] = photoUrls;
            console.log(data)
            // saving data
            await firestore.collection("products").add(data)
            .then(response => {
                console.log(response);
                res.json({"respond": "Stock added successfully."});
            })
            .catch(error => {
                console.log(error);
            });

           // deleteing temp folder
           fs.rmdir(path.join(__dirname, `temp/${data.id}/`), { recursive: true, force: true }, (error) => {
               if (error) throw error;

               console.log("Successfully deleted");
           });


        })
        .catch( error => console.log(error));
    });

    console.log(data);

});

// updating stock
router.put('/', (req, res) => {
    res.json({"respond": "update stock"});
});

// deleting stock
router.delete('/', async (req, res) => {
    // deleting stock
    console.log(req.body.id);
    await firestore.collection("products").where("id", "==", req.body.id).get()
    .then(response => {
        console.log(response);

        response.docs.forEach(async (doc) => {
            await firestore.collection("products").doc(doc.id).delete()
            .then(response => {
                console.log(response);
                res.json({"respond": "Stock successfully deleted stock"});
            })
            .catch(error => {
                console.log(error);
            });
        });
    })
    .catch(error => {
        console.log(error);
    });
    
});

router.all('/', (req, res, next) => {
    res.status(405).json({"respond": "Method not supported"});
});

module.exports = router;