import "./css/filter.css"
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from "react";

var Filter = ()=>{
    // slider value
    const [price, setPrice] = useState([0, 100]);
    const [rate, setRate] = useState([0, 100]);
    const [discount, setDiscount] = useState([0, 100]);

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


    return (
        <div className="filter-container">
            {/* Title bar */}
            <div className="filter-title-bar">
                <div className="filter-title">Filters</div>
                <div className="reset-filter">CLEAR ALL</div>
            </div>
            <hr style={{ margin: "20px 20px 0 20px" }} />
            {/* Price filter */}
            <div className="filter-group price-filter">
                <div className="sub-filter-title">Price (Rs)</div>
                <div className="price-slider">
                    <div className="low-text">0</div>
                    <Box sx={{width: 120 }}>
                        <Slider 
                            getAriaLabel = { () => "Price" } 
                            value = { price }
                            onChange = { updatePriceSlider }
                            getAriaValueText = { valuetext }
                            valueLabelDisplay = "auto"
                        />
                    </Box>
                    <div className="high-text">100</div>
                </div>
            </div>

            <div>
                
            </div>
            {/* Brand filter */}
            <div className="filter-group brand-filter">
                <div className="sub-filter-title">Brands</div>
                <div className="brand-options">
                    <div className="from-group brand-option">
                        <label htmlFor="brand1">
                            <input id="brand1" name="brand1" type="checkbox" /> Brand 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand12">
                            <input id="brand12" name="brand1" type="checkbox" /> Brand 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand13">
                            <input id="brand13" name="brand1" type="checkbox" /> Brand 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand14">
                            <input id="brand14" name="brand1" type="checkbox" /> Brand 1
                        </label>
                    </div>
                </div>
            </div>
            {/* Rating filter */}
            <div className="filter-group rating-filter">
                <div className="sub-filter-title">Ratings</div>
                <div className="rating-slider">
                    <div className="low-text rate-low">0</div>
                    <Box sx={{width: 120 }}>
                        <Slider 
                            getAriaLabel = { () => "Price" } 
                            step = { 20 }
                            value = { rate }
                            onChange = { updateRateSlider }
                            getAriaValueText = { valuetext }
                            valueLabelDisplay = "auto"
                        />
                    </Box>
                    <div className="high-text rate-high">5</div>
                </div>
            </div>
            {/* Sellers filter */}
            <div className="filter-group brand-filter">
                <div className="sub-filter-title">Sellers</div>
                <div className="brand-options">
                    <div className="from-group brand-option">
                        <label htmlFor="brand1">
                            <input id="brand1" name="brand1" type="checkbox" /> Seller 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand12">
                            <input id="brand12" name="brand1" type="checkbox" /> Seller 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand13">
                            <input id="brand13" name="brand1" type="checkbox" /> Seller 1
                        </label>
                    </div>
                    <div className="from-group brand-option">
                        <label htmlFor="brand14">
                            <input id="brand14" name="brand1" type="checkbox" /> Seller 1
                        </label>
                    </div>
                </div>
            </div>
            {/* Discount filter  */}
            <div className="filter-group discount-filter">
                <div className="sub-filter-title">Discount (%)</div>
                <div className="discount-slider">
                    <div className="low-text dis-low">0</div>
                    <Box sx={{width: 120 }}>
                        <Slider 
                            getAriaLabel = { () => "Price" } 
                            value = { discount }
                            onChange = { updateDiscountSlider }
                            getAriaValueText = { valuetext }
                            valueLabelDisplay = "auto"
                        />
                    </Box>
                    <div className="high-text dis-high">100</div>
                </div>
            </div>
        </div>
    );
}

export default Filter;