import { useEffect, useState } from 'react';
import './css/shoppingcart.css'
import Footer from './footer';
import Header from './header';
import RatingStars from "react-rating-stars-component";
import { useFetchAll } from './hooks/useFetch';

var Orders = ()=>{
    
    const { data: pendingOrders, isLoading, hasData } = useFetchAll("http://localhost:9000/user", "orders/pending", localStorage.getItem("eden-pa-user-uid"));
    const [ reviewProduct, setReviewProduct] = useState(null);
    const [ reviewProductStars, setReviewProductStars ] = useState(1);
    useEffect(() => {
        // doc title
        document.title = "EDEN - Orders";
    }, []);

    return (
        <div className="shopping-cart-page-container">
            <Header />
            <div className="shopping-cart-page-content">
                <div className="cart-items-container container">
                    <div style={{fontWeight: "normal", textAlign: 'left'}} className="home-section-title">Pending Orders</div>
                    <div className="line scp-line"></div>
                    <div style={{margin: "0"}} className="row">
                        <div style={{margin: "0"}} className="col-lg-12 items-card-container row" id="items-card-container">
                            
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
                                    No orders.
                                </div>
                            }

                            {/* items */}
                            { 
                                !isLoading && hasData &&
                                pendingOrders.products.map((productDetails) => {
                                    
                                    return (
                                        <div key={ productDetails.id } className="col-12 cart-item-card" id={ `card-${ productDetails.id }`}>
                                            <img src={ productDetails.photoUrl }  className="item-photo" alt={ productDetails.id } />
                                            <div className="item-details">
                                                <div className="item-title">{ productDetails.name } ({ productDetails.quantity } { productDetails.unit })</div>
                                                <div className="item-seller">Boltz Accessories</div>
                                                { productDetails.hasOffer && <div className="item-price">Price: <strike style={{marginRight: "5px"}}>Rs. { productDetails.quantityNeeded * productDetails.price }</strike> Rs. { productDetails.offerPrice.toFixed(2) }</div>}
                                                { !productDetails.hasOffer && <div className="item-price">Price: <strike style={{marginRight: "5px"}}>Rs. { productDetails.price }</strike> Rs. { (productDetails.price * productDetails.quantityNeeded) - (productDetails.price * productDetails.quantityNeeded * productDetails.discount / 100)} <span style={{fontSize: "11px"}}>({ productDetails.discount }% off)</span></div>}
                                                <div className="in-stock-status">In stock</div>
                                                <div className="item-category">{ productDetails.category } accessories</div>
                                                <div style={{display: "flex", justifyContent: "space-between"}} >
                                                    <div className="item-quantity">Quantity: {productDetails.quantityNeeded}</div>
                                                    { !productDetails.reviewed && <div style={{width: "fit-content"}} data-item-id={ productDetails.id } data-item-url={ productDetails.photoUrl } className="review-btn proceed-to-check-out" onClick={ (event) => {
                                                        setReviewProduct({ photoUrl: event.target.dataset.itemUrl, id: event.target.dataset.itemId });
                                                        document.querySelector(".review-modal-container").style.display = "flex";
                                                    } }>Review item</div> }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            
                        </div>
                    </div>
                </div>
 
                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Completed Orders</div>
                    <div className="row best-selling-cards">
                        Comming soon
                        {/* <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                            <ProductCard />
                        </div> */}
                    </div>
                </div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%"}} className="show-notification"></div>
            <div className="review-modal-container">
                <div className="review-content">
                    <div className="review-control review-title">Thanks for shopping with us</div>
                    <div className="review-control review-subtitle">Please rate and review this product.</div>
                    <div className="product">
                        {reviewProduct != null && <img src={ reviewProduct.photoUrl }  className="item-photo" alt="" />}
                    </div>
                    <div className="review-control rating-stars">
                        <RatingStars
                        value= { 1 }
                            count={ 5 }
                            size={ 50 }
                            color="#d1d1d5"
                            activeColor="#2F2F5F"
                            emptyIcon={<i className="far fa-star"></i>}
                            onChange= { (newRating) => setReviewProductStars(newRating) }
                        />
                    </div>
                    <textarea placeholder={"Comment if any..."} rows={5} className="review-control review-comment-box form-control">
                    
                    </textarea>
                    <button className="review-control form-control btn btn-danger" onClick={ () => document.querySelector(".review-modal-container").style.display = "none" }>Cancel</button>
                    <button className="review-control form-control btn btn-success" onClick = { async () => {
                        await fetch("http://localhost:9000/products/rating", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ 
                                rating: reviewProductStars, 
                                id: reviewProduct.id, 
                                comment: document.querySelector('.review-comment-box').value,
                                uid: localStorage.getItem("eden-pa-user-uid")
                         })
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            window.location.reload();
                        }).catch(error => console.error(error));
                    }}>Submit Review</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Orders;