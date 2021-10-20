const express = require('express');
const router = express.Router();
const { firestore, algoliaIndex } = require('../initializers');

// logging
router.use((req, res, next) => {
    console.log("product request");
    next();
});

// fetching data
router.get('/:category/:type', async (req, res) => {
    console.log(req.params);

    var conditions;

    if(req.params.category == "all"){
        conditions = firestore.collection("products")
        .where("type", "==", req.params.type.toLowerCase());
    }else{
        conditions = firestore.collection("products")
        .where("category", "array-contains", req.params.category)
        .where("type" , "==", req.params.type.toLowerCase() );
        
    }
    
    // fetching data
    await conditions.get()
    .then(docs => {
        var data = [];

        docs.docs.forEach(doc => {
            data.push(doc.data());
        });
        // console.log(data)
         res.json({ products: data});
    })
    .catch( error => console.error(error));

});

// details of a particular product
router.get('/:id', async (req, res) => {
    console.log("Product detail request")
    // fetching data
    await firestore.collection("products")
    .where("id" , "==", req.params.id )
    .get()
    .then(docs => {
        // console.log(data)
        res.json(docs.docs[0].data());
    })
    .catch( error => console.error(error));
});

// search
router.post('/search', (req, res) => {
    
    // for all categories
    if (req.body.category == "all"){
        algoliaIndex.search(req.body.searchText)
        .then( hits => {
            console.log(hits);
             res.json({ result: hits });
        })
        .catch( error => console.log(error));
    }else{
        algoliaIndex.search(req.body.searchText, { filters: `category:${ req.body.category }`})
        .then( hits => {
            console.log(hits);
             res.json({ result: hits });
        })
        .catch( error => console.log(error));
    }
});

module.exports = router;