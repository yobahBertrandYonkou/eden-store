import CategoryCard from "./category";
import Filter from "./filter";
import Footer from "./footer";
import Header from "./header";
import ProductCard from "./productcard";
import './css/oneanimal.css'
import { useState } from "react";
import useFetch from "./hooks/useFetch";

var OneAnimal = ({animal})=>{
    console.log(animal);
    let title = animal + " Supplies";

    // fetching data for accessories
    const { data: accessories, isLoading, hasData: hasAccessories } = useFetch("http://localhost:9000/products", animal, "accessories");
    const { data: food, isLoading: isFoodLoading, hasData: hasFood } = useFetch("http://localhost:9000/products", animal, "food");

    // fetc
    return(
        <div className="oneanimal-container">
            <Header />
            <div className="one-animal-content-section">
                <div className="home-left-container">
                    <Filter />
                </div>
                <div className="home-right-container">
                    {/* one animal title */}
                    <div className="one-animal-title">
                        <div className="title">{ title }</div>
                        <div className="record-count">Showing 20,000 of 10,00,000 products</div>
                    </div>

                    {/* Offers you cant run from */}
                    <div className="container-fluid offers-you-cant-run-from">
                        <div style={{fontWeight: "normal", marginTop: "20px"}} className="home-section-title">Offers you can’t escape form</div>
                        <div className="row offer-cards">
                            <div className="col-lg-3 col-sm-6 col-6 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-lg-3 col-sm-6  col-6 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-lg-3 col-sm-6  col-6 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-lg-3 col-sm-6 col-6 category-card-container">
                                <CategoryCard />
                            </div>
                        </div>
                    </div>

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
            <Footer />
        </div>
    );
}

export default OneAnimal;