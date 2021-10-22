/* eslint-disable eqeqeq */
/* eslint-disable no-loop-func */
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
            if (msg.category == "all"){
                docs.docs.forEach(doc => {
                    // filter category here
                    if (msg.search != ""){
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
                    if (msg.search != ""){
                        if (doc.data().category.includes(msg.category.substring(0, 1).toUpperCase() + msg.category.slice(1)) && doc.data().name.toLowerCase().includes(msg.search.toLowerCase())){
                            data.push(doc.data());
                        }
                    }else{
                        if (doc.data().category.includes(msg.category.substring(0, 1).toUpperCase() + msg.category.slice(1))){
                            data.push(doc.data());
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

// fetches the details of one stock
router.get('/:id', async(req, res) => {
    console.log("here")
    console.log(req.params);
    await firestore.collection("products").where("id", "==", req.params.id).get()
    .then(response => {
        // console.log(response);

        // returning data
        res.json(response.docs[0].data());

    })
    .catch(error => {
        console.log(error);
    });
});

// adding new stock
router.post('/', async (req, res) => {

    // writing data to database (firestore)
    var data = req.body;
    console.log(data.products)

    
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
    data['category'] = data.category.split(", ");

    var idCat = "";

    if (data.category.length == 1){
        idCat = categories[data.category[0].toLowerCase()];
    }else if(data.category.length == 4){
        idCat = "ALL";
    }else {
        data.category.forEach( cat => {
            idCat += cat.substring(0,1);
        });
    }

    data["id"] = `STK-${idCat}-${new Date().toJSON().substring(0, 10).split("-").reverse().join("")}-${new Date().toTimeString().substring(0,8).split(":").join("")}`;
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
            await firestore.collection("products").add(data)
            .then(response => {
                // console.log(response);
                // saving data to algolia
                var algoliaData = data;
                algoliaData['photoUrl'] = algoliaData['photoUrls']['photo-1'];
                delete algoliaData['createdOn'];
                delete algoliaData['color'];
                delete algoliaData['photoUrls'];
                delete algoliaData['rating'];
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

// updating stock
router.put('/', async (req, res) => {
    var data = req.body;
    // getting stock ref
    await firestore.collection("products").where("id", "==", req.body.id).get()
    .then(async (docs) => {
        // console.log(data);

        // handling files
        var files = req.files;
        var filePath;
        // creates a dir for the current stock
        try{
            fs.mkdirSync(path.join(__dirname, `temp/${data.id}`));
        }catch(e){
            if (e.code == "EEXIST"){
                fs.rmdir(path.join(__dirname, `temp/${data.id}/`), { recursive: true, force: true }, (error) => {
                    if (error) throw error;

                    console.log("Successfully deleted");
                    fs.mkdirSync(path.join(__dirname, `temp/${data.id}`));
                });
            }
        }

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
                var count = 0;
                for (var file in response){
                    console.log(response[file][0].publicUrl());
                    photoUrls[files[count++].split(".")[0]] = response[file][0].publicUrl();
                }

                // adding photo urls to data
                var newPhotoUrls = docs.docs[0].data().photoUrls;
                for (var key in photoUrls){
                    newPhotoUrls[key] = photoUrls[key];
                }
                data.photoUrls = newPhotoUrls;
                
                // adjusting data
                var tempFolder = data.id;
                delete data.sellerId;
                delete data.rating;
                delete data.createdOn;
                delete data.id;
                data['updatedOn'] = new Date();
                data['category'] = data.category.split(", ")
                // updating document
                await firestore.collection('products').doc(docs.docs[0].id)
                .update(data).then(response => {
                    res.json({"respond": "update stock"});
                    console.log("updated")
                })
                .catch( error => console.log(error))
                
                // deleteing temp folder
                fs.rmdir(path.join(__dirname, `temp/${tempFolder}/`), { recursive: true, force: true }, (error) => {
                    if (error) throw error;

                    console.log("Successfully deleted");
                });


            })
            .catch( error => console.log(error));
        });


        
    })
    .catch(error => {
        console.log(error);
    });
    
});

// deleting stock
router.delete('/', async (req, res) => {
    // deleting stock
    console.log(req.body.id);
    await firestore.collection("products").where("id", "==", req.body.id).get()
    .then(response => {
        // console.log(response);

        //deleting files for the current stock item
        response.docs.forEach(async (doc) => {
            await firestore.collection("products").doc(doc.id).delete()
            .then(response => {
                // console.log(response);
                // delete from algolia
                algoliaIndex.deleteObject(req.body.id)
                .then( response => console.log(response))
                .catch( error => console.log(error));

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