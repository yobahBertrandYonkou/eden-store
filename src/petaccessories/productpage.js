/* eslint-disable eqeqeq */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import './css/productpage.css'
import Footer from './footer';
import Header from './header';
import { useFetchOne } from './hooks/useFetch';
import ProductCard from './productcard';
import RatingStars from 'react-rating-stars-component';

var ProdudctPage = ()=>{
    const { id } = useParams();
    const { data, related, isLoading, offer, hasOffer } = useFetchOne("http://localhost:9000/products/details", id, localStorage.getItem("eden-pa-user-uid"));
    
    useEffect(() => {
        var thumbnails = document.querySelectorAll('.photo-thumbnail');
        var photoPreview = document.getElementById('photo-preview');
        // display thumb to preview container
        thumbnails.forEach(thumbnail => {
            console.log("sdf")
            thumbnail.onclick = (event) => {
                console.log(event)
                if (event.target.src != "" && event.target.nodeName == "IMG"){
                    photoPreview.src = event.target.src;
                }
                
            }
        });

        
        setTimeout(() => {
            console.log("ok")
            var addToCart = document.querySelector('.product-add-to-cart-btn');
            var quantity = document.querySelector('.onea-pdt-qty');

            // adding to cart
            addToCart.onclick = async () => {
                if (parseInt(quantity.value) > 0){
                    var temp = {};
                    temp['quantityNeeded'] = parseInt(quantity.value);
                    temp['id'] = data.id;
                    temp['userId'] = localStorage.getItem("eden-pa-user-uid");

                    // offer calculation
                    temp['hasOffer'] = false;
                    if(hasOffer){
                        console.log("Has offer")
                        console.log(offer.condition)
                        if(Object.keys(offer.condition)[0] == "cond-1"){
                            if(offer.discountType == "percentage-of" && temp['quantityNeeded'] >= offer.quantity){
                                temp['hasOffer'] = true;
                                temp['condition'] = "cond-1";
                                temp['minQuantity'] = offer.quantity;
                                temp['discountType'] = "percentage-of";
                                temp['offerPrice'] = (temp.quantityNeeded * data.price) -  ((temp.quantityNeeded * data.price) * (offer.discountValue / 100));
                            }else if(offer.discountType == "fixed-price" && temp['quantityNeeded'] >= offer.quantity){
                                temp['hasOffer'] = true;
                                temp['condition'] = "cond-1";
                                temp['minQuantity'] = offer.quantity;
                                temp['discountType'] = "fixed-price";
                                temp['offerPrice'] = (temp.quantityNeeded * data.price) -  offer.discountValue;
                            }
                        }else{
                            if(offer.discountType == "percentage-of"){
                                temp['hasOffer'] = true;
                                temp['condition'] = "cond-2";
                                temp['discountType'] = "percentage-of";
                                temp['offerPrice'] = (temp.quantityNeeded * data.price) -  (((temp.quantityNeeded * data.price) * (offer.discountValue / 100)) * temp.quantityNeeded);
                            }else{
                                temp['hasOffer'] = true;
                                temp['condition'] = "cond-2";
                                temp['discountType'] = "fixed-price";
                                temp['offerPrice'] = (temp.quantityNeeded * data.price) -  (offer.discountValue * temp.quantityNeeded);
                            }
                        }
                    }
                    console.log(temp)
                    await fetch("http://localhost:9000/user/cart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(temp)
                    })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res);
                        var status;
                        if(res.status == "added"){
                            status = "added to";
                        }else{
                            status = "updated in";
                        }
                        document.querySelector('.product-overview-container').insertAdjacentHTML('afterbegin',
                            `<div class="alert alert-success alert-dismissible" role="alert">
                                ${ data.name.substring(0, 25) }... successfully ${ status } cart.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                            </div>`
                        );
                    })
                    .catch(error => console.error(error));
                }
            }
        }, 1000);
    }, [data, offer, hasOffer]);

    return(
       data && <div className="product-page-container">
            <Header />
            <div className="product-page-content">
                <div className="container product-overview-container">
                    <div className="row">
                        {/* <div className="col-lg-8 col-xl-6 product-photos-container">
                            <div className="product-alternative-photos">
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                            </div>
                            <div className="product-photo-display"></div>
                        </div> */}
                        <div className="col-lg-8 col-xl-6 item-photos-container">
                            <div className="photo-preview-div" style={{ padding: "20px" }}>
                                <img id="photo-preview" src={ data.photoUrls['photo-1'] } className="photo-preview" alt="preview" />
                            </div>
                            <div className="photo-thumbnails">
                                <img width="60px" height="60px" src = { data.photoUrls['photo-1'] } id="photo-th-1" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-2'] } id="photo-th-2" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-3'] } id="photo-th-3" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-4'] } id="photo-th-4" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-5'] } id="photo-th-5" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-6'] } id="photo-th-6" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-7'] } id="photo-th-7" className="photo-thumbnail" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-6 product-details-container">
                            <div className="product-detail-item product-title">{ !isLoading && data.name }</div>
                            <div style={{display: 'flex', alignItems: "center"}} className="product-detail-item product-rating">Rating: <span style={{width: "5px"}}></span> 
                            {<RatingStars
                                value= { parseInt(data.topRating) }
                                size={24}
                                count={ 5 }
                                color="#d1d1d5"
                                activeColor="orange"
                                edit= {false}
                                emptyIcon={<i className="far fa-star"></i>}
                                /> }
                            </div>


                            {/* offer details */}
                            {!isLoading && hasOffer && 
                               
                                <div style={{ marginBottom: "10px" }}>
                                    <span style={ { padding: "2px",  fontSize: "12px", backgroundColor: "orange", textAlign: "center", marginBottom: "10px", color: "black"} } className="offer-name text-black">{ offer.title } </span>
                            
                                    { 
                                        Object.keys(offer.condition)[0] == "cond-1" && 
                                        offer.discountType == "percentage-of" &&
                                        <span style={{ fontSize: "12px", marginLeft: "5px", color: "blue"}} className="text-black text-center" > Buy at least { offer.quantity } and get { offer.discountValue }% off the total amount.</span>
                                        
                                    }
                                    { 
                                        Object.keys(offer.condition)[0] == "cond-1" && 
                                        offer.discountType == "fixed-price" &&
                                        <span style={{ fontSize: "12px", marginLeft: "5px", color: "blue"}} className="text-black text-center" > Buy at least { offer.quantity } and get Rs. { offer.discountValue } off your total purchase.</span>
                                        
                                    }
                                    {
                                    
                                        Object.keys(offer.condition)[0] == "cond-2" && 
                                        offer.discountType == "percentage-of" &&
                                        <span style={{ fontSize: "12px", marginLeft: "5px", color: "blue"}} className="text-black text-center" > Get Rs. { offer.discountValue }% off each purchase.</span>
                                        
                                    }
                                    { 
                                        Object.keys(offer.condition)[0] == "cond-2" && 
                                        offer.discountType == "fixed-price" &&
                                        <span style={{ fontSize: "12px", marginLeft: "5px", color: "blue"}} className="text-black text-center" > Get Rs. { offer.discountValue } off each purchase.</span>
                                        
                                    }
                                </div>
                            }


                            {!hasOffer && <div className="product-detail-item product-price">Price: <strike>₹ { !isLoading && data.price }</strike> <span style={{ marginLeft: "10px" }}>₹ { (data.price - data.price * data.discount / 100).toFixed(2) } </span></div>}
                            {hasOffer && <div className="product-detail-item product-price">Price: ₹ { !isLoading && data.price }</div>}
                            {!hasOffer && <div className="product-detail-item product-price">Discount: { !isLoading && data.discount }%. Saving Rs. { !isLoading && (data.price * (data.discount/100)).toFixed(2) }</div>}
                            <div className="product-detail-item product-quantity">Weight: { !isLoading && data.quantity } { !isLoading && data.unit }</div>
                            <div className="product-detail-item available-product-colors">Color: { !isLoading && data.color }</div>
                            <div className="product-detail-item">
                                Quantity: <input className="onea-pdt-qty" style={{ width: "100px" }} min="1" defaultValue="1" id="pdt-quantity" type="number" name="" />
                            </div>
                            <div className="product-detail-item buy-add-to-cart-btns">
                                <div className="product-add-to-cart-btn">Add to cart</div>
                                <div className="buy-now-btn">Buy now</div>
                            </div>
                            <div className="product-detail-item return-policy-section">
                                <div className="return-policy-title">Return policy</div>
                                <div className="return-policy-description">Free replacement will be provided within 7 days if the product is delivered in defective/damaged condition or different from the ordered item. </div>
                            </div>
                            <div className="share-on-social-media-options">
                                Share: 
                            </div><br />
                            <div className="product-description">
                                <span style={{fontWeight: "bold"}}>About this Product</span><br />
                                <span style={{ fontSize: "12px" }}>{ !isLoading && data.description}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Associated products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Often bought with the following</div>
                    <div className="row best-selling-cards">
                        <div className="col-12">Comming Soon ...</div>
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

                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Related products</div>
                    <br />

                    <div className="row best-selling-cards">
                        {/* Loading... */}
                        { 
                                isLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            
                            {/* no data found */}
                            { 
                                !isLoading && related.length == 0  && 
                                <div className="col-12 text-center">
                                    No accessories
                                </div>
                            }

                            {/* outputing accessores from useFetch */}
                            { 
                                !isLoading && related.length != 0 &&
                                related.map((productDetails) => {
                                    return (
                                        <div key={ productDetails.id } className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                            <ProductCard details = { productDetails } />
                                        </div>
                                    );
                                })
                            }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default ProdudctPage;