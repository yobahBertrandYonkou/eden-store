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

module.exports = router;