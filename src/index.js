import ReactDOM from "react-dom";
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

