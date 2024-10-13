// required imports
const { firestore } = require('../server/controllers/initializers');
const { default: axios } = require('axios');
const fs = require('fs');
require("dotenv").config({path: '../.env'});

// read json file
let sellers = JSON.parse(fs.readFileSync("sellers.json", "utf-8"));

// loop through sellers
sellers.forEach(async seller => {

    try {
        // sign user up
        axios({
            method: "POST",
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.WEP_API_KEY}`,
            data: {
                email: seller.email,
                password: seller.password,
                returnSecureToken: false
            }
        }).then(async response => {
            // create document
            let result = await firestore.collection("sellers").doc(seller['id']).set(seller);
            console.log(seller['id']);
        }).catch((error) => { console.log(error) });
    } catch (error) {
        console.log(error);
    }
});