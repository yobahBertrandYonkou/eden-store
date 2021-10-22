import Header from "../petaccessories/header"
import Footer from "../petaccessories/footer"
import './css/offercardcontainer.css'
import photoUrl from "./images/offers.png";
import Filter from './filter';
import { useFetchAll } from "./hooks/useFetch";
import { useEffect } from "react";
var OfferCard = ( { photo }) => {
    return(
        <div className="offer-card-container">
            <img src= { photo } alt="" />
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
                    <div className="from-group brand-option">
                        <label htmlFor="${ offer.id }">
                            <input id="${ offer.id }" name="${ offer.id }" type="checkbox" /> ${ offer.title }
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
                        <div style={{fontWeight: "normal"}}  className="home-section-title">Offers</div>
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
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                        <a className="card" href={`/accessories/offers/products/${ productDetails.id }`}>
                                            <div className="card-img-top">
                                            <img width="100%" src={ productDetails.photoUrls['photo-1'] } alt="" />
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title"> { productDetails.name } </div>
                                                <div style={ { fontSize: "12px", backgroundColor: "orange", textAlign: "center", marginBottom: "10px"} } className="offer-name text-black">{ productDetails.offer.title } </div>
                                        
                                                { 
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-1" && 
                                                    productDetails.offer.discountType == "percentage-of" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Buy { productDetails.offer.quantity } and get { productDetails.offer.discountValue }% off the total amount.</div>
                                                    
                                                }
                                                { 
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-1" && 
                                                    productDetails.offer.discountType == "fixed-price" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Get Rs. { productDetails.offer.discountValue } off each purchase.</div>
                                                    
                                                }
                                                {
                                                
                                                    Object.keys(productDetails.offer.condition)[0] == "cond-2" && 
                                                    productDetails.offer.discountType == "percentage-of" &&
                                                    <div style={{color: "blue"}} className="text-black text-center" > Buy { productDetails.offer.quantity } and get { productDetails.offer.discountValue }% off the total amount.</div>
                                                    
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