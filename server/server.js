const express = require('express');
// creating express object
var app = express();
// websocket
const expressWS = require('express-ws')(app);
const stocks = require("./controllers/sellers/stocks")
const products = require("./controllers/accessories/products")
const cors = require('cors');
const fileUpload = require("express-fileupload");


// enabling cross-origin resource sharing (cors)
app.use(cors());

// file upload middleware
app.use(fileUpload());

// using body parser
app.use(express.json({extended: true}));

// setting a controller for sellers
app.use("/stocks", stocks);

// accessories / products
app.use("/products", products);

// starting server
app.listen(9000, () => {
    console.log(`Server started on 9000`);
});