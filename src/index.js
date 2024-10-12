import { createRoot } from "react-dom/client";
import HomePage from "./petaccessories/home";
import OneAnimal from "./petaccessories/oneanimal";
import ProdudctPage from "./petaccessories/productpage";
import Dashboard from './sellers/dashboard'
import Stocks from "./sellers/stocks";
import Offers from "./sellers/offers";
import { Offers as PgOffers } from "./petaccessories/offer";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import ShoppingCart from "./petaccessories/shoppingcart";
import SignIn from "./petaccessories/signin";
import CheckOut from "./petaccessories/checkout";
import Orders from "./petaccessories/orders";
import SOrders from "./sellers/orders"
import SignUp from "./sellers/seller_signup";
import SSignIn from "./sellers/seller_signin";
import React from "react";
import { createStore } from "redux"
import { Provider } from "react-redux";
import { filterApp } from "./store/filter";
import Reports from "./sellers/reports";
import LandingPage from "./LandingPage";

var store = createStore(filterApp);

// filters: {
//     price: { min: -1, max: -1 },
//     brands: [],
//     ratings: { min: -1,  max: -1 },
//     sellers: [],
//     discount: { min: -1, max: -1 }
// },
// filterFields: {
//     price: {},
//     brands: [],
//     ratings: {},
//     sellers: [],
//     discount: {}
// }

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage/> }/>
                    <Route exact path="/seller/" element={<Dashboard/>} />
                    <Route exact path="/seller/dashboard" element={<Dashboard/>} />
                    <Route exact path="/seller/stocks" element={<Stocks/>} />
                    <Route exact path="/seller/offers" element={<Offers/>} />
                    <Route exact path="/seller/orders" element={ <SOrders/> }/>
                    <Route exact path="/seller/signup" element={ <SignUp/> }/>
                    <Route exact path="/seller/signin" element={ <SSignIn/> }/>
                    <Route exact path="/seller/reports" element={ <Reports/> }/>
                    <Route exact path="/accessories/signin" element={<SignIn/> }/>
                    <Route exact path="/accessories/home" element={<HomePage/>} />
                    <Route exact path="/accessories" element={<HomePage/>} />
                    <Route exact path="/accessories/cats" element={ <OneAnimal animal="Cats"/> }/>
                    <Route exact path="/accessories/dogs" element = { <OneAnimal animal="Dogs" /> }/>
                    <Route exact path="/accessories/birds" element={<OneAnimal animal="Birds" /> }/>
                    <Route exact path="/accessories/hamsters" element={<OneAnimal animal="Hamsters" /> }/>
                    <Route exact path="/accessories/:category/products/:id" element={<ProdudctPage/> }/>
                    <Route exact path="/accessories/cart" element={ <ShoppingCart/> }/>
                    <Route exact path="/accessories/offers" element={ <PgOffers/> }/>
                    <Route exact path="/accessories/orders" element={ <Orders/> }/>
                    <Route exact path="/accessories/checkout" element={ <CheckOut/> }/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>);

// TODO: delete/add quantity at checkout page

// TODO: Purchases made

