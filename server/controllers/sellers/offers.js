const express = require('express');
const firebase = require('firebase-admin');
var serviceAccount = require("../credentials/serviceAccountKey.json");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { firestore, storage, algoliaIndex } = require('../initializers');


// logs every request (generic route)
router.use((req, res, next)=>{
    // console.log(req.body);
    console.log("New request");
    console.log(req.url)
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
            conditions = firestore.collection("offers").orderBy("updatedOn")
        }else if(msg.from != "" && msg.to == ""){
            conditions = firestore.collection("offers")
            .where("updatedOn", ">=", new Date(msg.from + " 12:00:00 AM")).orderBy("updatedOn")
        }else if (msg.from == "" && msg.to != ""){
            conditions = firestore.collection("offers")
            .where("updatedOn", "<=", new Date(msg.to + " 11:59:00 PM")).orderBy("updatedOn")
        }else if(msg.from != "" && msg.to != ""){
            conditions = firestore.collection("offers")
            .where("updatedOn", ">=", new Date(msg.from + " 12:00:00 AM")).where("updatedOn", "<=", new Date(msg.to + " 11:59:00 PM")).orderBy("updatedOn")
        }
        
        // fetching all stocks according to filter condition
        snapShotTracker = conditions.onSnapshot((docs)=>{
            // console.log(docs.docs);

            // .where("condition", "==", msg.condition)
            var data = [];
            if (msg.condition == "all"){
                docs.docs.forEach(doc => {
                    // filter condition here
                    if (msg.search != ""){
                        if (doc.data().title.toLowerCase().includes(msg.search.toLowerCase())){
                            data.unshift(doc.data());
                        }
                    }else{
                        
                        data.unshift(doc.data());
                    }
                    
                });
            }else{
                docs.docs.forEach(doc => {
                    // filter condtion here
                    if (msg.search != ""){
                        if (Object.keys(doc.data().condition).includes(msg.condition) && doc.data().title.toLowerCase().includes(msg.search.toLowerCase())){
                            data.unshift(doc.data());
                        }
                    }else{
                        if (Object.keys(doc.data().condition).includes(msg.condition)){
                            data.unshift(doc.data());
                        }
                    }
                    
                });
            }
            ws.send(JSON.stringify({"data": data}));
            // console.log(data);
            // ws.send({"data": data});
        });
        // console.log(snapShotTracker)
    });

    // logging socket closed
    ws.on("close", (ws)=>{
        console.log("One socket closed");
    })
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

// all products associated with offers
router.get('/products/:animal', async (req, res) => {
    console.log(req.params)
    await firestore.collection("offers").get()
    .then(async offers => {
        
        var conditions;
        if (req.params.animal == "all"){
            conditions = firestore.collection("products");
        }else{
            conditions = firestore.collection("products").where("category", "array-contains", req.params.animal);
        }
        
        await conditions.limit(2).get()
        .then(async products => {
            
            var offerProductList = [];
            offers.docs.forEach( offer => {
                offer.data().products.forEach(async productId => {

                    products.docs.forEach( productDoc => {
                        if (productDoc.data().id == productId){
                            var tempOfferObj = offer.data();
                            delete tempOfferObj["createdOn"];
                            delete tempOfferObj["updatedOn"];
                            delete tempOfferObj["startDate"];
                            delete tempOfferObj["endDate"];
                            delete tempOfferObj["serllerId"];
                            delete tempOfferObj["photoUrls"];

                            var product = productDoc.data();
                            product["offer"] = tempOfferObj;

                            offerProductList.push(product);
                        }
                    });
                });
            });
            console.log(offerProductList.length)
            res.json({ products: offerProductList });
            
        })
        .catch(error => console.log(error));
        
    })
    .catch(error => console.log(error));
    
});

// get stocks
router.get('/offers', async (req, res) => {
    console.log("offers")
    console.log(req.params);
    await firestore.collection("offers").get()
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

// fetches the details of one stock
router.get('/:id', async(req, res) => {
    console.log("here")
    console.log(req.params);
    await firestore.collection("offers").where("id", "==", req.params.id).get()
    .then(async response => {
        // console.log(response);
        // getting all stocks
        await firestore.collection("products").get()
        .then(docs => {
            // console.log(response);
            var data = [];

            docs.docs.forEach( doc => {
                data.push(doc.data());
            });
            // returning data
            res.json({ products: data, product: response.docs[0].data() });

        })
        .catch(error => {
            console.log(error);
        });

    })
    .catch(error => {
        console.log(error);
    });
});



// save offers
router.post('/', (req, res) => {
    // writing data to database (firestore)
    var data = req.body;
    // console.log(data)

    // setting id and rating value
    console.log(data.products)
    data['products'] = data.products.split(",");
    data['startDate'] = new Date(data.startDate);
    data['endDate'] = new Date(data.endDate);
    data["id"] = `OFR-${new Date().getMilliseconds()}-${new Date().toJSON().substring(0, 10).split("-").reverse().join("")}-${new Date().toTimeString().substring(0,8).split(":").join("")}`;
    data['createdOn'] = new Date();
    data['updatedOn'] = new Date();

    var offerConditions = {
        "cond-1": "At least N quantity of items.",
        "cond-2": "For each product."
    }
    var tempObj = {};
    tempObj[data.condition] = offerConditions[data.condition];
    data["condition"] = tempObj;

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
                return storage.bucket().upload(path.join(__dirname, `temp/${data.id}/${filename}`),  { destination: `EDEN/accessories/offers/${data.id}/${filename}` });
            }))
        )
        .then( async (response) => {
            console.log("Uploaded");

            // putting photo urls together
            var photoUrls = {};
            var count = 0;
            for (var file in response){
                console.log(response[file][0].publicUrl());
                photoUrls[files[count++].split(".")[0]] = response[file][0].publicUrl();
            }

            // add photos to data
            data['photoUrls'] = photoUrls;
            var folderName = data.id;
            // console.log(data)
            // saving data
            await firestore.collection("offers").add(data)
            .then(response => {
                // console.log(response);
                // saving data to algolia
                var algoliaData = data;
                algoliaData['photoUrl'] = algoliaData['photoUrls']['photo-1'];
                delete algoliaData['createdOn'];
                delete algoliaData['photoUrls'];
                delete algoliaData['sellerId'];
                delete algoliaData['updatedOn'];
                algoliaData['objectID'] = algoliaData['id'];
                delete algoliaData['id'];

                algoliaIndex.saveObject(data)
                .then( response => {
                    console.log(response);
                    console.log("Algolia saved")
                })
                .catch( error => console.error(error));
                res.json({"respond": "Stock added successfully."});
            })
            .catch(error => {
                console.log(error);
            });
           // deleteing temp folder
           fs.rmdir(path.join(__dirname, `temp/${folderName}/`), { recursive: true, force: true }, (error) => {
               if (error) throw error;

               console.log("Successfully deleted");
           });


        })
        .catch( error => console.log(error));
    });

    // console.log(data);
});

// deleting offer
router.delete('/', async (req, res) => {
    // deleting offer
    console.log(req.body.id);
    await firestore.collection("offers").where("id", "==", req.body.id).get()
    .then(response => {
        // console.log(response);

        //deleting files for the current offer item
        response.docs.forEach(async (doc) => {
            await firestore.collection("offers").doc(doc.id).delete()
            .then(response => {
                // console.log(response);
                // delete from algolia
                algoliaIndex.deleteObject(req.body.id)
                .then( response => console.log(response))
                .catch( error => console.log(error));

                res.json({"respond": "Stock successfully deleted offer"});
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
module.exports = router;