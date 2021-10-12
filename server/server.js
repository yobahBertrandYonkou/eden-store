const express = require('express');
const bodyParser = require('body-parser');
const stocks = require("./controllers/sellers/stocks")
// creating express object
var app = express();

// using body parser
app.use(bodyParser.urlencoded({extended: true}));

// setting a controller for sellers
app.use("/stocks", stocks);

// starting server
app.listen(9000, () => {
    console.log(`Server started on 9000`);
});