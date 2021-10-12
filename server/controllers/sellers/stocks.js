const express = require('express');
const router = express.Router();

// logs every request (generic route)
router.use((req, res, next)=>{
    console.log(req.params);
    next();
});

// fetches all stocks from the database (firebase/firestore)
router.get('/', (req, res) => {
    res.json({"respond": "all stocks"});
});

// adding new stock
router.post('/', (req, res) => {
    res.json({"respond": "new stock"});
});

// updating stock
router.put('/', (req, res) => {
    res.json({"respond": "update stock"});
});

// deleting stock
router.delete('/', (req, res) => {
    res.json({"respond": "delete stock"});
});

router.all('/', (req, res, next) => {
    res.status(405).json({"respond": "Method not supported"});
});

module.exports = router;