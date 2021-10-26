import { useEffect } from 'react';
import './css/checkout.css'
import Footer from './footer';
import Header from './header';
import { useFetchAll } from './hooks/useFetch';
import cardPayment from './images/card-payment.png';
import cashOnDelivery from './images/cod.png';

var CheckOut = ()=>{
    const { data: userCart, isLoading, hasData } = useFetchAll("http://localhost:9000/user", "cart", localStorage.getItem("eden-pa-user-uid"));

    return(
        <div className="checkout-page-container">
            <Header />
            <div className="checkout-page-content">
                <div className="container">
                    <div className="scp-title">Checking out { !isLoading && hasData && userCart.products.length } { isLoading || !hasData && 0 } items</div>
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
                                    <input id="shipping-address" type="text" className="form-control" onFocus = { () => document.querySelector(".shipping-address-error-text").textContent = "" }/>
                                    <span className="form-text text-danger shipping-address-error-text"></span>
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="section-card">
                                <div className="section-top">
                                    <div className="section-header">PROMOTIONAL CODE/COUPON</div>
                                    <div className="section-btn">APPLY</div>
                                </div>
                                <div className="section-input">
                                    <input id="coupon-code" type="text" className="form-control" />
                                </div>
                            </div>

                            {/* Payment methods */}
                            <div style={{paddingBottom: "0px"}} className="section-card">
                                <div className="section-top">
                                    <div className="section-header">PAYMENT METHODS</div>
                                </div>
                                <div className="section-payments">
                                    <div className="payment-method-card" onClick = { () => {
                                        document.getElementById("credit-debit-cards").checked = true;
                                    }}>
                                        <label htmlFor="">
                                            <input type="radio" name="payment-option" id="credit-debit-cards" checked />
                                        </label>
                                        <img src= { cardPayment } alt="" />
                                    </div>
                                    <div className="payment-method-card" onClick = { () => {
                                        document.getElementById("cash-on-delivery").checked = true;
                                    }}>
                                        <label htmlFor="">
                                            <input type="radio" name="payment-option" id="cash-on-delivery" />
                                        </label>
                                        <img src= { cashOnDelivery } alt="" />
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
                                { 
                                isLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            
                            {/* no data found */}
                            { 
                                !isLoading && !hasData  && 
                                <div style={{ fontWeight: 'lighter'}} className="col-12 text-center">
                                    Your cart is empty.
                                </div>
                            }

                            {/* items */}
                            { 
                                !isLoading && hasData &&
                                userCart.products.map((productDetails) => {
                                    return (
                                        <div className="col-12 cart-item-card" id={ `card-${ productDetails.id }`}>
                                            <img src={ productDetails.photoUrl }  className="item-photo" alt={ productDetails.id } />
                                            <div className="item-details">
                                                <div className="item-title">{ productDetails.name } ({ productDetails.quantity } { productDetails.unit })</div>
                                                <div className="item-seller">Boltz Accessories</div>
                                                <div className="item-price">Price: Rs { productDetails.price }</div>
                                                <div className="in-stock-status">In stock</div>
                                                <div className="item-category">{ productDetails.category } accessories</div>
                                                <div className="item-quantity">Quantity: <input onChange = { async (event) => {
                                                    console.log(event.target.getAttribute("data-item-id"));
                                                        await fetch("http://localhost:9000/user/cart", {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({ userId: localStorage.getItem("eden-pa-user-uid"), itemId: event.target.getAttribute("data-item-id"), quantity: parseInt(event.target.value) })
                                                        })
                                                        .then(response => response.json())
                                                        .then(res => {
                                                            console.log(res);
                                                            
                                                            document.querySelector('.show-notification').innerHTML = (
                                                                `<div class="alert alert-info alert-dismissible" role="alert">
                                                                    Please <button style="border: none;, background-color: white;" onclick="window.location.reload()" style="color: blue">reload</button> to reflect changes. Thank you.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                                                                </div>`
                                                            );
                                                        })
                                                        .catch(error => console.error(error)); 
                                                        } 
                                                    } data-item-id = { productDetails.id } min="1" type="number" defaultValue={ `${productDetails.quantityNeeded}` } className="scp-product-detials" /></div>
                                            </div>
                                            <div id="cart-action-btns">
                                                <button className="scp-product-detials" onClick={ ()=> window.open(`/accessories/${ productDetails.category }/products/${ productDetails.id }`, "_self")} type = "button"><i className="fas fa-info scp-action-icons"></i></button>
                                                <button className="scp-product-detials delete-cart-item" data-item-id = { productDetails.id }  type = "button"><i data-item-id = { productDetails.id } className="fas fa-trash-alt scp-action-icons"></i></button>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 items-summary-container">
                            <div className="items-summary-content order-summary-content">
                                <div className="sub-total-title order-summary">ORDER SUMMARY</div>
                                <div className="list-item">
                                    <div className="item-name">Items:</div>
                                    <div className="item-value">{ !isLoading && userCart.products.length }</div>
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
                                <div className="add-to-cart-btn proceed-to-check-out" onClick = { async () => {
                                    var address = document.getElementById("shipping-address");
                                    if (address.value.trim() === ""){
                                        document.querySelector(".shipping-address-error-text").textContent = "Your shipping address is required."
                                    }else{
                                        // get razorpay key id
                                        await fetch("http://localhost:9000/user/orders/create", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ uid: localStorage.getItem("eden-pa-user-uid"), amount: 90000 })
                                        })
                                        .then( response => response.json())
                                        .then( response => {
                                            console.log(response);
                                            // calling payment api
                                            if(response.status === 200){
                                                var options = {
                                                    "key_id": response.key_id,
                                                    "amount": 90000,
                                                    "currency": "INR",
                                                    "name": "EDEN - PET ACCESSORIES SHOP",
                                                    "description": "Purchasing products from the EDEN online shop",
                                                    "order_id": response.order.id,
                                                    "notes": {
                                                        "address": address
                                                    },
                                                    "handler": razorpayResponse => {
                                                        console.log(razorpayResponse);
                                                    },
                                                    "theme": {
                                                        "color": "#2F2F5F"
                                                    }
                                                }

                                                var razorpay = new window.Razorpay(options);
                                                razorpay.on("payment.failed", ( error ) => {
                                                    console.log(error);
                                                });
                                                razorpay.open();
                                            }
                                        })
                                        .catch (error => console.log(error));
                                    }
                                }}>Place your order</div>
                                <div className="agreement-text">
                                    By placing this order, you have read, understood and accepted EDEN’s <span className="important-text">Terms and Conditions</span> of use and <span className="important-text">Privacy Policy</span>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%"}} className="show-notification"></div>
            <Footer />
        </div>
    );
}

export default CheckOut;