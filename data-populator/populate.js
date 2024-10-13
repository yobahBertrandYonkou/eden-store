// required imports
let { firestore } = require('../server/controllers/initializers');
let fs = require('fs');

// read json file
let items = JSON.parse(fs.readFileSync("products1.json", "utf-8"));

// collection
let collectionName = "products";

// loop through data
items.forEach(async item => {
    // temp
    let temp = item;
    try {

        if (collectionName === "products") {
            // cast numbers to float
            temp['price'] = parseFloat(temp['price']);
            temp['discount'] = parseFloat(temp['discount']);
        }else {
            // change time to Date
            temp['startDate'] = new Date(Date(temp['startDate']));
            temp['endDate'] = new Date(Date(temp['endDate']));
        }
        // change time to Date
        temp['createdOn'] = new Date(Date(temp['createdOn']));
        temp['updatedOn'] = new Date(Date(temp['updatedOn']));

        // create document
        let result = await firestore.collection(collectionName).add(item);

        console.log(result['id']);

    } catch (error) {
        console.log(error);
    }
});


