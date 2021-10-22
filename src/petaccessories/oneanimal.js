import CategoryCard from "./category";
import Filter from "./filter";
import Footer from "./footer";
import Header from "./header";
import ProductCard from "./productcard";
import Offers from "./images/offers.png";
import './css/oneanimal.css'
import { useState } from "react";
import { useFetchAll } from "./hooks/useFetch";
import { OfferCard } from "./offer";

var OneAnimal = ({animal})=>{
    console.log(animal);
    let title = animal + " Supplies";

    // fetching data for accessories
    const { data: accessories, isLoading, hasData: hasAccessories } = useFetchAll("http://localhost:9000/products", animal, "accessories");
    const { data: food, isLoading: isFoodLoading, hasData: hasFood } = useFetchAll("http://localhost:9000/products", animal, "food");
    const { data: offerProductList, isLoading: isOfferLoading, hasData: offerHasData } = useFetchAll("http://localhost:9000", "offers", "products/" + animal);

    // fetc
    return(
        <div style={{ position: "relative" }} className="oneanimal-container">
            <Header />
            <div className="one-animal-content-section">
                <div className="home-left-container">
                    <Filter />
                </div>
                
                <div className="home-right-container">
                    <OfferCard photo={Offers} />
                    {/* one animal title */}
                    <div className="one-animal-title">
                        <div className="title">{ title }</div>
                        <div className="record-count">Showing 20,000 of 10,00,000 products</div>
                    </div>

                    {/* Offers you cant run from */}
                    <div className="container-fluid offers-you-cant-run-from">
                        <div style={{fontWeight: "normal", marginTop: "20px"}} className="home-section-title">Offers you can’t escape form</div>
                        <div className="row offer-cards">
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
                                            <div style={{height: "200px", display: "flex", justifyContent: "center"}} className="card-img-top">
                                                <img style={{objectFit: "contain"}} height="200px" width="80%" src={ productDetails.photoUrls['photo-1'] } alt="" />
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title"> { productDetails.name.substring(0, 25) }... </div>
                                                <div style={ { fontSize: "12px", backgroundColor: "orange", textAlign: "center", marginBottom: "10px", color: "black"} } className="offer-name text-black">{ productDetails.offer.title } </div>
                                        
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
                    <br />
                    <br />

                    {/* Accessories */}
                    <div className="container-fluid accessories">
                        <div style={{fontWeight: "normal"}}  className="home-section-title">Accessories</div>
                        <div className="row accessories-cards">

                            {/* Loading... */}
                            { 
                                isLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            
                            {/* no data found */}
                            { 
                                !isLoading && !hasAccessories  && 
                                <div className="col-12 text-center">
                                    No accessories
                                </div>
                            }

                            {/* outputing accessores from useFetch */}
                            { 
                                !isLoading && hasAccessories &&
                                accessories.products.map((productDetails) => {
                                    return (
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                            <ProductCard details = { productDetails } />
                                        </div>
                                    );
                                })
                            }
                            
                        </div>
                    </div>
                    {/* Food supplies */}
                    <div className="container-fluid accessories">
                        <div style={{fontWeight: "normal", marginTop: "50px"}} className="home-section-title">Food supplies</div>
                        <div className="row accessories-cards">
                            
                            {/* Loading... */}
                            { 
                                isFoodLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }

                            {/* no data found */}
                            { 
                                !isLoading && !hasFood  && 
                                <div className="col-12 text-center">
                                    No food supplies
                                </div>
                            }

                            {/* outputing accessores from useFetch */}
                            { !isFoodLoading && hasFood &&food.products.map((productDetails) => {
                                return (
                                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                        <ProductCard details = { productDetails } />
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

export default OneAnimal;