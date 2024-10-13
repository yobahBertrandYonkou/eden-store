const fs = require('fs');

// load data
let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
let offers = JSON.parse(fs.readFileSync('offers.json', 'utf-8'));

// group by seller
let mapped = {}
products.forEach(product => {
    if (!Object.keys(mapped).includes(product['sellerId'])) {
        mapped[product['sellerId']] = [];
    }
    mapped[product['sellerId']].push(product['id']);
});

// verify products in offers to make sure that they match the sellerId
let index = 0;
offers.forEach(offer => {
    // get product list
    let products = offer['products']

    // verify each product
    products.forEach(product => {
        // check whether product is from seller id
        
        if (!Array.from(mapped[offer['sellerId']]).includes(product)) {

            // get new product
            let newProduct = mapped[offer['sellerId']][parseInt(Date.now().toString()[12])]

            while (Array.from(products).includes(newProduct)) {
                newProduct = mapped[offer['sellerId']][parseInt(Date.now().toString()[12])]
            }
            
            // replace seller id
            products[Array.from(products).indexOf(product)] = newProduct;
        }
    });

    // reassign products
    offers[index]['products'] = products;
    index += 1;
});

fs.writeFileSync("offers1.json", JSON.stringify(offers));