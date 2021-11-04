const express = require('express');
const { firestore } = require('../initializers');
const router = express.Router();

router.get('/totals', async (req, res) => {
    // total stocks
    await firestore.collection("products").get()
    .then( async docs => {
        var stocks = docs.docs.length;
        // offers stocks
        await firestore.collection("offers")
        .get()
        .then( async docs => {
            var offers = docs.docs.length;
            var activeOffers = 0;
            docs.docs.forEach(element => {
                console.log(new Date(element.data().endDate._seconds * 1000) )
                if (element.data().startDate._seconds * 1000 <= new Date() && element.data().endDate._seconds * 1000 >= new Date()){
                    activeOffers += 1;
                }
            });
            // offers stocks
            await firestore.collection("orders")
            .doc("CompletedAndPending").collection("PendingOrders")
            .get()
            .then( async docs => {
                var orders = docs.docs.length;
                // deliveries stocks
                await firestore.collection("orders")
                .doc("CompletedAndPending").collection("CompletedOrders").get()
                .then( async docs => {
                    var deliveries = docs.docs.length;
                    res.json({ stocks: stocks, offers: offers, deliveries: deliveries, activeOffers: activeOffers, orders: orders });
                })
                .catch( error => console.log(error));
            })
            .catch( error => console.log(error));
        })
        .catch( error => console.log(error));
        })
    .catch( error => console.log(error));
});

module.exports = router;

