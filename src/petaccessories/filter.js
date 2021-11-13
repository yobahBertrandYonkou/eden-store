import "./css/filter.css"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { useFilters } from "./hooks/useFilters";
import { useDispatch } from "react-redux";

var Filter = ()=>{
    // slider value
    const [price, setPrice] = useState([0, 1000]);
    const [rate, setRate] = useState([0, 100]);
    const [discount, setDiscount] = useState([0, 100]);
    const { filters } = useFilters();
    var dispatch = useDispatch();
    
    var updatePriceSlider = (event, newPrice) => {
        setPrice(newPrice);
        document.querySelector('.low-text').textContent = newPrice[0];
        document.querySelector('.high-text').textContent = newPrice[1];
    }

    var updateRateSlider = (event, newRate) => {
        setRate(newRate);
        document.querySelector('.rate-low').textContent = newRate[0] / 20;
        document.querySelector('.rate-high').textContent = newRate[1] / 20;
    }

    var updateDiscountSlider = (event, newDiscount) => {
        setDiscount(newDiscount);
        document.querySelector('.dis-low').textContent = newDiscount[0];
        document.querySelector('.dis-high').textContent = newDiscount[1];
    }

    var valuetext = (price) => {
        return price;
    }

    useEffect(() => {
        if(filters != null){
            // set default filter values
            setPrice([filters.prices.min, filters.prices.max]);
            setRate([filters.rates.min * 20, filters.rates.max * 20]);
        }

        fetch("http://localhost:9000/products/filters")
        .then( response => response.json() )
        .then( filters =>  {
            // console.log(filters);
        })
        .catch( error => console.log(error) );
    },[filters]);

    return (
        <div style={{top: 0, position: "sticky"}} className="filter-container">
            {/* Title bar */}
            <div className="filter-title-bar">
                <div className="filter-title">Filters</div>
                <div onClick = { () => {
                    setDiscount([filters.discounts.min, filters.discounts.max]);
                    setPrice([filters.prices.min, filters.prices.max]);
                    setRate([0, 100]);
                    document.querySelector('.low-text').textContent = filters.prices.min;
                    document.querySelector('.high-text').textContent = filters.prices.max;
                    document.querySelector('.rate-low').textContent = 0;
                    document.querySelector('.rate-high').textContent = 5;
                    document.querySelector('.dis-low').textContent = filters.discounts.min;
                    document.querySelector('.dis-high').textContent = filters.discounts.max;

                }} className="reset-filter">CLEAR ALL</div>
            </div>
            <hr style={{ margin: "20px 20px 0 20px" }} />

            {/* offers */}
            {window.location.pathname === '/accessories/offers' && <div className="filter-group brand-filter">
                <div className="sub-filter-title">Available Offers</div>
                <div className="brand-options available-offers">
                    No Offers
                </div>
            </div>}

            {/* Price filter */}
            <div className="filter-group price-filter">
                <div className="sub-filter-title">Price (Rs)</div>
                    
                    { 
                        filters === null &&  

                        <div className="col-12 text-center">
                            <div className="spinner-grow text-secondary" role="status"></div>
                        </div>
                    }
                    { filters !== null &&
                        <div className="price-slider">
                            <div className="low-text">{ filters.prices.min }</div>
                                <Box sx={{width: 130 }}>
                                    <Slider
                                        min={ filters.prices.min }
                                        max={ filters.prices.max }
                                        size="small"
                                        getAriaLabel = { () => "Price" } 
                                        value = { price }
                                        onChange = { updatePriceSlider }
                                        getAriaValueText = { valuetext }
                                        valueLabelDisplay = "auto"
                                    />
                                </Box>
                                <div className="high-text">{ filters.prices.max }</div>
                        </div>
                    }
                    
                
            </div>

            {/* Brand filter */}
            <div className="filter-group brand-filter">
                <div className="sub-filter-title">Brands</div>
                    { 
                        filters === null &&  
                        <div className="col-12 text-center">
                            <div className="spinner-grow text-secondary" role="status"></div>
                        </div>
                    }
                    { filters !== null &&
                        <div className="brand-options">
                            {
                                filters.brands.map( (brand) => {
                                    return (
                                        <div key={ brand } className="from-group brand-option">
                                            <label htmlFor={ brand }>
                                                <input className="brand-controls" id={ brand } name= { brand } type="checkbox" /> {' '}
                                                { brand.substring(0,1).toUpperCase() }{ brand.slice(1, ) }
                                            </label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                
            </div>
            {/* Rating filter */}
            <div className="filter-group rating-filter">
                <div className="sub-filter-title">Ratings</div>
                <div className="rating-slider">
                    <div className="low-text rate-low">0</div>
                    { 
                        filters === null &&  

                        <div className="col-12 text-center">
                            <div className="spinner-grow text-secondary" role="status"></div>
                        </div>
                    }
                    { filters !== null &&
                        <Box sx={{width: 130 }}>
                            <Slider 
                                size="small"
                                getAriaLabel = { () => "Price" } 
                                step = { 20 }
                                value = { rate }
                                onChange = { updateRateSlider }
                                getAriaValueText = { valuetext }
                                valueLabelDisplay = "auto"
                            />
                        </Box>
                    }
                    <div className="high-text rate-high">5</div>
                </div>
            </div>
            {/* Sellers filter */}
            <div className="filter-group brand-filter">
                <div className="sub-filter-title">Sellers</div>
                <div className="brand-options">
                    { filters !== null &&
                        filters.sellers.map( (seller) => {
                            return (
                                <div key={ seller } className="from-group brand-option">
                                    <label key={ seller } htmlFor={ seller }>
                                        <input className="seller-controls" id={ seller } name= { seller } type="checkbox" /> {' '}
                                        { seller.substring(0, 10) }
                                    </label>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {/* Discount filter  */}
            <div className="filter-group discount-filter">
                <div className="sub-filter-title">Discount (%)</div>
                <div className="discount-slider">
                    <div className="low-text dis-low">0</div>
                    { 
                        filters === null &&  

                        <div className="col-12 text-center">
                            <div className="spinner-grow text-secondary" role="status"></div>
                        </div>
                    }
                    { filters !== null &&
                        <Box sx={{width: 130 }}>
                            <Slider 
                                min={ filters.discounts.min }
                                max={ filters.discounts.max }
                                size="small"
                                getAriaLabel = { () => "Price" } 
                                value = { discount }
                                onChange = { updateDiscountSlider }
                                getAriaValueText = { valuetext }
                                valueLabelDisplay = "auto"
                            />
                        </Box>
                    }
                    
                    <div className="high-text dis-high">100</div>
                </div>
                <div onClick = { () => {

                    // get filters
                    var brandFilter = Array.from(document.querySelectorAll(".brand-controls")).filter( (brand) => brand.checked ).map( brand => brand.id);
                    var sellerFilter = Array.from(document.querySelectorAll(".seller-controls")).filter( (seller) => seller.checked ).map( seller => seller.id);
                    var offerFilter = Array.from(document.querySelectorAll(".offer-controls")).filter( (offer) => offer.checked ).map( offer => offer.id);
                    var filters = {};

                    // setting check boxes
                    if( brandFilter.length !== 0 )  filters['brands'] = brandFilter;
                    if( sellerFilter.length !== 0 )  filters['sellers'] = sellerFilter;
                    if( offerFilter.length !== 0 )  filters['offers'] = offerFilter;

                    // setting ranges
                    filters['prices'] = price;
                    filters['rates'] = [rate[0] / 20, rate[1] / 20];
                    filters['discounts'] = discount;

                    // disptaching action
                    dispatch({ type: "FILTER", filters: filters });

                } } className="reset-filter">Filter</div>
            </div>
        </div>
    );
}

export default Filter;