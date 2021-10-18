import Filter from "./filter";
import Header from "./header";
import './css/home.css'
import CategoryCard from "./category";
import ProductCard from "./productcard";
import Footer from "./footer";
import { useFetchAll } from "./hooks/useFetch";

var HomePage = ()=>{
    // fetching data for accessories
    const { data: accessories, isLoading, hasData: hasAccessories } = useFetchAll("http://localhost:9000/products", "all", "accessories");
    const { data: grooming, isLoading: isGroomingLoading, hasData: hasGrooming } = useFetchAll("http://localhost:9000/products", "all", "grooming");

    return (
        <div className="homepage-container">
            <Header />
            <div className="home-content-section">
                <div className="home-left-container">
                    <Filter />
                </div>
                <div className="home-right-container">
                    {/* We provide their needs */}
                    <div className="what-we-provide container">
                        <div className="home-section-title">We provide their needs</div>
                        <div className="line"></div>
                        <div className="row category-cards">
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard />
                            </div>
                        </div>
                    </div>

                    {/* Offers you cant run from */}
                    <div className="container offers-you-cant-run-from">
                        <div className="home-section-title">Offers you can’t escape form</div>
                        <div className="row offer-cards">
                            <div className="col-lg-4 col-sm-6 col-6 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-lg-4 col-sm-6  col-6 category-card-container">
                                <CategoryCard />
                            </div>
                            <div className="col-lg-4 col-sm-6  col-6 category-card-container">
                                <CategoryCard />
                            </div>
                        </div>
                    </div>

                    {/* Best selling products */}
                    <div className="container best-selling">
                        <div className="home-section-title">Best selling items</div>
                        <div className="row best-selling-cards">

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

                    {/* Grooming and Accessories */}
                    <div className="container accessories-title">
                        <div className="home-section-title">Grooming and Accessories</div>
                    </div>

                    {/* Accessories */}
                    { hasAccessories && <div className="container accessories">
                        <div className="home-section-title">Accessories</div>
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
                    </div>}

                    {/* Grooming */}
                    { hasGrooming && <div className="container grooming">
                        <div className="home-section-title">Grooming</div>
                        <div className="row grooming-cards">
                            {/* Loading... */}
                            { 
                                isGroomingLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            

                            {/* outputing accessores from useFetch */}
                            { 
                                !isGroomingLoading && hasGrooming &&
                                grooming.products.map((productDetails) => {
                                    return (
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                            <ProductCard details = { productDetails } />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>}
                </div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%"}} className="show-notification"></div>
            <Footer />
        </div>
    );

}

export default HomePage;