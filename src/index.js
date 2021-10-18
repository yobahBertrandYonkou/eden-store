import ReactDOM from "react-dom";
import HomePage from "./petaccessories/home";
import OneAnimal from "./petaccessories/oneanimal";
import ProdudctPage from "./petaccessories/productpage";
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
            <Route exact path="/accessories" component={HomePage} />
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
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'))

// TODO: delete/add quantity at checkout page

// TODO: Purchases made

