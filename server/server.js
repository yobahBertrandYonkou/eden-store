const express = require('express');
// creating express object
var app = express();
// websocket
const expressWS = require('express-ws')(app);
const stocks = require("./controllers/sellers/stocks")
const cors = require('cors');
const router = express.Router();


router.ws("/");

// enabling cross-origin resource sharing (cors)
app.use(cors());

// using body parser
app.use(express.json({extended: true}));

// setting a controller for sellers
app.use("/stocks", stocks);

// starting server
app.listen(9000, () => {
    console.log(`Server started on 9000`);
});