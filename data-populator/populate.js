// required imports
let { firestore } = require('../server/controllers/initializers');
let fs = require('fs');

// read json file
let products = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// loop through data
products.forEach(async product => {
    // temp
    let temp = product;

    // change time to Date
    temp['createdOn'] = Date(temp['createdOn']);
    temp['updatedOn'] = Date(temp['createdOn']);

    // cast numbers to float
    temp['price'] = parseFloat(temp['price']);
    temp['discount'] = parseFloat(temp['discount']);

    try {
        // create document
        let result = await firestore.collection('products').add(product);

        console.log(result['id']);

    } catch (error) {
        console.log(error);
    }
});

