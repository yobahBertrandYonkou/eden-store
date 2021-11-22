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
                    var totalSales = 0;

                    docs.docs.forEach(delivery => {
                        if(delivery.hasOffer){
                            totalSales += delivery.offerPrice;
                        }else{
                            totalSales += (delivery.price * delivery.quantityNeeded) - (delivery.price * delivery.quantityNeeded * delivery.discount / 100).toFixed(2);
                        }
                    });
                    res.json({ stocks: stocks, offers: offers, deliveries: deliveries, activeOffers: activeOffers, orders: orders, totalSales: totalSales });
                })
                .catch( error => console.log(error));
            })
            .catch( error => console.log(error));
        })
        .catch( error => console.log(error));
        })
    .catch( error => console.log(error));
});

router.get('/recent/orders/:sellerId', async (req, res) => {
    await firestore.collection("orders")
    .doc("CompletedAndPending").collection("PendingOrders")
    .where("sellerId", "==", req.params.sellerId)
    .orderBy("timeStamp", "desc")
    .limit(10)
    .get().then((response) => {
        var orders = [];

        response.docs.forEach(order => {
            orders.push(order.data());
        });
        res.json({ orders: orders });
    })
    .catch( error => console.log(error));
});

router.get('/products/topselling/:sellerId', async (req, res) => {
    await firestore.collection("products")
    .where("sellerId", "==", req.params.sellerId)
    .orderBy("purchases")
    .limit(10)
    .get().then((response) => {
        var products = [];

        response.docs.forEach(product => {
            products.push(product.data());
        });
         res.json({ products: products });
    })
    .catch( error => console.log(error));
});

router.get('/daily/:sellerId', async (req, res) => {
    var startDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`);
    var endDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 2}-${new Date().getDate()} 00:00:00`);
    console.log("Daily")
    console.log(startDate)
    // total orders
    await firestore.collection("orders").doc("CompletedAndPending")
    .collection("OrderSummaries")
    .where("timeStamp", ">=", startDate)
    .where("timeStamp", "<", endDate)
    .get().then( async orders => {
        var totalOrders = orders.docs.length;

        // total deliveries
        await firestore.collection("orders").doc("CompletedAndPending")
        .collection("CompletedOrders")
        .where("timeStamp", ">=", startDate)
        .where("timeStamp", "<", endDate)
        .get().then( deliveries => {
            var totalDeliveries = deliveries.docs.length;
            var totalSales = 0;

            if(totalDeliveries != 0){
                deliveries.forEach(delivery => {
                    totalSales += delivery.totalAmount;
                });
            }

            res.json({ totalOrders: totalOrders, totalDeliveries: totalDeliveries, totalSales: totalSales });

        }).catch( error => console.log(error));

    }).catch( error => console.log(error));
});
module.exports = router;

