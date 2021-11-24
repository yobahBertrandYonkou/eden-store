import ReactDOM from "react-dom";
import HomePage from "./petaccessories/home";
import OneAnimal from "./petaccessories/oneanimal";
import ProdudctPage from "./petaccessories/productpage";
import Dashboard from './sellers/dashboard'
import Stocks from "./sellers/stocks";
import Offers from "./sellers/offers";
import { Offers as PgOffers } from "./petaccessories/offer";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import ShoppingCart from "./petaccessories/shoppingcart";
import SignIn from "./petaccessories/signin";
import CheckOut from "./petaccessories/checkout";
import Orders from "./petaccessories/orders";
import sOrders from "./sellers/orders"
import SignUp from "./sellers/seller_signup";
import sSignIn from "./sellers/seller_signin";
import React from "react";
import { createStore } from "redux"
import { Provider } from "react-redux";
import { filterApp } from "./store/filter";
import Reports from "./sellers/reports";

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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <BrowserRouter>
                <Switch>
                    <Route exact path={["/seller/", "/seller/dashboard"]} component={Dashboard} />
                    <Route exact path="/seller/stocks" component={Stocks} />
                    <Route exact path="/seller/offers" component={Offers} />
                    <Route exact path="/seller/orders" component={ sOrders }/>
                    <Route exact path="/seller/signup" component={ SignUp }/>
                    <Route exact path="/seller/signin" component={ sSignIn }/>
                    <Route exact path="/seller/reports" component={ Reports }/>
                    <Route exact path="/accessories/signin" component={SignIn}/>
                    <Route exact path={["/accessories/home", "/accessories"]} component={HomePage} />
                    <Route exact path="/accessories/cats">
                        <OneAnimal animal="Cats" />
                    </Route>
                    <Route exact path="/accessories/dogs">
                        <OneAnimal animal="Dogs" />
                    </Route>
                    <Route exact path="/accessories/birds">
                        <OneAnimal animal="Birds" />
                    </Route>
                    <Route exact path="/accessories/hamsters">
                        <OneAnimal animal="Hamsters" />
                    </Route>
                    <Route exact path="/accessories/:category/products/:id" component={ProdudctPage}/>
                    <Route exact path="/accessories/cart" component={ ShoppingCart }/>
                    <Route exact path="/accessories/offers" component={ PgOffers }/>
                    <Route exact path="/accessories/orders" component={ Orders }/>
                    
                    <Route exact path="/accessories/checkout" component={ CheckOut }/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));

// TODO: delete/add quantity at checkout page

// TODO: Purchases made

