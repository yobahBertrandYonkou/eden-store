const express = require('express');
// creating express object
var app = express();
// websocket
const expressWS = require('express-ws')(app);
const stocks = require("./controllers/sellers/stocks");
const products = require("./controllers/accessories/products");
const user = require("./controllers/accessories/user");
const offers = require("./controllers/sellers/offers");
const orders = require("./controllers/sellers/orders");
const seller = require("./controllers/sellers/seller");
const statistics = require("./controllers/sellers/statistics");
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

// users
app.use("/user", user);

// sellers
app.use("/seller", seller);

// offers
app.use("/offers", offers);

// orders
app.use("/orders", orders);

// statistics
app.use("/stats", statistics);

// starting server
app.listen(9000, () => {
    console.log(`Server started on 9000`);
});