import Header from "../petaccessories/header"
import Footer from "../petaccessories/footer"
import './css/offercardcontainer.css'
import photoUrl from "./images/offers.png";
import photo from "./images/offers.png";
import photo1 from "./images/offers11.png";
import photo2 from "./images/offers12.png";
import Filter from './filter';
import { useFetchAll } from "./hooks/useFetch";
import { useEffect } from "react";
var OfferCard = () => {
    return(
        <div className="carousel slide" data-bs-ride="carousel" id="offer-display-card">
            <div className="carousel-inner" role="listbox">
                <div className="offer-card-container carousel-item active">
                    <img src= { photo } alt="" />
                </div>
                <div className="offer-card-container carousel-item">
                    <img src= { photo1 } alt="" />
                </div>
                <div className="offer-card-container carousel-item">
                    <img src= { photo2 } alt="" />
                </div>
            </div>
            <button className="carousel-control-prev" data-bs-target="#offer-display-card" data-bs-slide="prev">
                <span style={{backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50px" }} className="carousel-control-prev-icon" arial-hidden = { true }></span>
            </button>
            <button href="#offer-display-card" className="carousel-control-next" data-bs-target="#offer-display-card" data-bs-slide="next">
                <span style={{backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50px" }} className="carousel-control-next-icon" arial-hidden = { true }></span>
            </button>
        </div>
    );
}

var Offers = () => {
    const { data: offerList } = useFetchAll("http://localhost:9000", "offers", "offers");
    const { data: offerProductList, isLoading: isOfferLoading, hasData: offerHasData } = useFetchAll("http://localhost:9000", "offers", "products/all");
    
    useEffect(() => {  
        var availableOffers = document.querySelector(".available-offers");
        if (offerList != null && offerList.products.length != 0){
            availableOffers.innerHTML = "";
            offerList.products.forEach( offer => {
                availableOffers.insertAdjacentHTML("beforeend", 
                `
                    <div class="from-group brand-option">
                        <label for="${ offer.id }">
                            <input class="offer-controls" id="${ offer.id }" name="${ offer.id }" type="checkbox" /> ${ offer.title }
                        </label>
                    </div>
                `);
            });
        }

    },[offerList]);

    return (
        <div style={{ position: "relative" }} className="oneanimal-container">
            <Header />
            <div className="one-animal-content-section">
                <div className="home-left-container">
                    <Filter />
                </div>
                
                <div className="home-right-container">
                    <OfferCard photo={photoUrl} />
                    {/* Accessories */}
                    <div className="container-fluid accessories">
                        <div style={{fontWeight: "normal", marginTop: "20px"}}  className="home-section-title">Offers</div>
                        <div style={{marginTop: "20px"}} className="row">

                            {/* Loading... */}
                            { 
                                isOfferLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }

                            {/* no data found */}
                            { 
                                !isOfferLoading && !offerHasData  && 
                                <div className="col-12 text-center">
                                    No offers
                                </div>
                            }

                            {/* outputing accessores from useFetch */}
                            { !isOfferLoading && offerHasData && offerProductList.products.map((productDetails) => {
                                return (
                                    <div style={{ marginBottom: "20px"}} className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                        <a className="card" href={`/accessories/offers/products/${ productDetails.id }`}>
                                            <div style={{height: "200px", display: "flex", justifyContent: "center"}} className="card-img-top">
                                            <img height="200px" width="80%" style={{ objectFit: "contain"}} src={ productDetails.photoUrls['photo-1'] } alt="" />
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title"> { productDetails.name.substring(0, 38) } <span style={{color: "blueviolet"}}>More...</span> </div>
                                                <div style={ { fontSize: "12px", backgroundColor: "orange", textAlign: "center", marginBottom: "10px", color: "black"} } className="offer-name text-black">{ productDetails.offer.title } </div>
                                        
                                                { 
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-1" && 
                                                    productDetails.offer.discountType == "percentage-of" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Buy at least { productDetails.offer.quantity } and get { productDetails.offer.discountValue }% off the total amount.</div>
                                                    
                                                }
                                                { 
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-1" && 
                                                    productDetails.offer.discountType == "fixed-price" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Buy at least { productDetails.offer.quantity } and get Rs. { productDetails.offer.discountValue } off your total amount.</div>
                                                    
                                                }
                                                {
                                                
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-2" && 
                                                    productDetails.offer.discountType == "percentage-of" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Get Rs. { productDetails.offer.discountValue }% off each purchase.</div>
                                                    
                                                }
                                                { 
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-2" && 
                                                    productDetails.offer.discountType == "fixed-price" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Get Rs. { productDetails.offer.discountValue } off each purchase.</div>
                                                    
                                                }

                                                <div className="card-price">Rs. { productDetails.price }</div>
                                                
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                   
                </div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%"}} className="show-notification"></div>
            <Footer />
        </div>
    );
}
export { OfferCard, Offers };