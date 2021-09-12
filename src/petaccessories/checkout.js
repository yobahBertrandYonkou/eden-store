import './css/checkout.css'
import Footer from './footer';
import Header from './header';

var CheckOut = ()=>{
    return(
        <div className="checkout-page-container">
            <Header />
            <div className="checkout-page-content">
                <div className="container">
                    <div className="scp-title">Checking out 6 items</div>
                    <div className="line scp-line"></div>
                    <div className="row">
                        <div className="col-lg-8 section-container">
                            {/* Shipping */}
                            <div className="section-card">
                                <div className="section-top">
                                    <div className="section-header">SHIPPING ADDRESS</div>
                                    <div className="section-btn">EDIT</div>
                                </div>
                                <div className="section-input">
                                    <input id="shipping-address" type="text" className="form-control" />
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="section-card">
                                <div className="section-top">
                                    <div className="section-header">PROMOTIONAL CODE/COUPON</div>
                                    <div className="section-btn">APPLY</div>
                                </div>
                                <div className="section-input">
                                    <input id="shipping-address" type="text" className="form-control" />
                                </div>
                            </div>

                            {/* Payment methods */}
                            <div style={{paddingBottom: "0px"}} className="section-card">
                                <div className="section-top">
                                    <div className="section-header">PAYMENT METHODS</div>
                                </div>
                                <div className="section-payments">
                                    <div className="payment-method-card">
                                        <label htmlFor="">
                                            <input type="radio" name="payment-option" id="" /> PAYTM
                                        </label>
                                    </div>
                                    <div className="payment-method-card">
                                        <label htmlFor="">
                                            <input type="radio" name="payment-option" id="" /> PAYTM
                                        </label>
                                    </div>
                                    <div className="payment-method-card">
                                        <label htmlFor="">
                                            <input type="radio" name="payment-option" id="" /> PAYTM
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Items summary */}
                            <div className="section-card">
                                <div className="section-top">
                                    <div className="section-header">ITEMS SUMMARY</div>
                                </div>
                                <div className="section-item-summary">
                                    {/* Item card */}
                                    <div className="col-12 cart-item-card">
                                        <div className="item-photo"></div>
                                        <div className="item-details">
                                            <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                            <div className="item-seller">Boltz Accessories</div>
                                            <div className="item-price">Rs 300</div>
                                            <div className="in-stock-status">In stock</div>
                                            <div className="item-category">Cats accessories</div>
                                            <div className="item-quantiy">Quantity</div>
                                        </div>
                                    </div>
                                    {/* Item card */}
                                    <div className="col-12 cart-item-card">
                                        <div className="item-photo"></div>
                                        <div className="item-details">
                                            <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                            <div className="item-seller">Boltz Accessories</div>
                                            <div className="item-price">Rs 300</div>
                                            <div className="in-stock-status">In stock</div>
                                            <div className="item-category">Cats accessories</div>
                                            <div className="item-quantiy">Quantity</div>
                                        </div>
                                    </div>
                                    {/* Item card */}
                                    <div className="col-12 cart-item-card">
                                        <div className="item-photo"></div>
                                        <div className="item-details">
                                            <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                            <div className="item-seller">Boltz Accessories</div>
                                            <div className="item-price">Rs 300</div>
                                            <div className="in-stock-status">In stock</div>
                                            <div className="item-category">Cats accessories</div>
                                            <div className="item-quantiy">Quantity</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 items-summary-container">
                            <div className="items-summary-content order-summary-content">
                                <div className="sub-total-title order-summary">ORDER SUMMARY</div>
                                <div className="list-item">
                                    <div className="item-name">Items:</div>
                                    <div className="item-value">7</div>
                                </div>
                                <div className="list-item">
                                    <div className="item-name">Shipping:</div>
                                    <div className="item-value">Rs. 97</div>
                                </div>
                                <div className="list-item">
                                    <div className="item-name">Discount:</div>
                                    <div className="item-value">Rs. 500</div>
                                </div>
                                <div className="list-item">
                                    <div className="item-name">Total before tax:</div>
                                    <div className="item-value">Rs. 7</div>
                                </div>
                                <div className="list-item">
                                    <div className="item-name">Estimated tax amount:</div>
                                    <div className="item-value">Rs. 7</div>
                                </div>
                                <hr />
                                <div style={{fontWeight: "bold"}} className="list-item">
                                    <div className="item-name">Order total:</div>
                                    <div className="item-value">Rs. 7</div>
                                </div>
                                <div className="add-to-cart-btn proceed-to-check-out">Place your order</div>
                                <div className="agreement-text">
                                    By placing this order, you have read, understood and accepted PETBIOS’s <span className="important-text">Terms and Conditions</span> of use and <span className="important-text">Privacy Policy</span>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CheckOut;