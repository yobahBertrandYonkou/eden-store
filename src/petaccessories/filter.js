import "./css/filter.css"

var Filter = ()=>{
    return (
        <div className="filter-container">
            {/* Title bar */}
            <div className="filter-title-bar">
                <div className="filter-title">Filters</div>
                <div className="reset-filter">CLEAR ALL</div>
            </div>
            <hr />
            {/* Price filter */}
            <div className="filter-group price-filter">
                <div className="sub-filter-title">Price</div>
                <div className="price-slider">
                    <input type="range" />
                </div>
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
                    <input type="range" min="0" max="5" />
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
                <div className="sub-filter-title">Discount</div>
                <div className="discount-slider">
                    <input type="range" min="0" max="5" />
                </div>
            </div>
        </div>
    );
}

export default Filter;