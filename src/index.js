import ReactDOM from "react-dom";
import Header from  './petaccessories/header'
import Filter from './petaccessories/filter'
import Footer from "./petaccessories/footer";
import ProductCard from "./petaccessories/productcard";
import CategoryCard from "./petaccessories/category";
import HomePage from "./petaccessories/home";
import OneAnimal from "./petaccessories/oneanimal";
import ProdudctPage from "./petaccessories/productpage";
import ShoppingCart from "./petaccessories/shoppingcart";
import CheckOut from "./petaccessories/checkout";
import Dashboard from './sellers/dashboard'
import Stocks from "./sellers/stocks";
import Offers from "./sellers/offers";
import { Switch, BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path={["/", "/dashboard"]} component={Dashboard} />
            <Route exact path="/stocks" component={Stocks} />
            <Route exact path="/offers" component={Offers} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'))

// TODO: delete/add quantity at checkout page

// TODO: Purchases made

