import { combineReducers } from "redux";

const FILTER_CATS = "FILTER_CATS";
const FILTER_DOGS = "FILTER_DOGS";
const FILTER_BIRDS = "FILTER_BIRDS";
const FILTER_HAMSTERS = "FILTER_HAMSTERS";
const FILTER_OFFERS = "FILTER_OFFERS";
const FILTER_ALL = "FILTER_ALL";

// reducer
var filter = (state={}, action) => {
    switch( action.type ){
        case "FILTER":
            // console.log(action.filters);
            return action.filters;
        default:
            return {};
    }
}

var filterApp = combineReducers({
    filters: filter
});

export { FILTER_ALL, FILTER_BIRDS, FILTER_CATS, FILTER_DOGS, FILTER_OFFERS, FILTER_HAMSTERS, filterApp };