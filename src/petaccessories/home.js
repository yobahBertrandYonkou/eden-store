import Filter from "./filter";
import Header from "./header";
import './css/home.css'
import CategoryCard from "./category";
import ProductCard from "./productcard";
import Footer from "./footer";

var HomePage = ()=>{
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
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 best-selling-card-container">
                                <ProductCard />
                            </div>
                        </div>
                    </div>

                    {/* Grooming and Accessories */}
                    <div className="container accessories-title">
                        <div className="home-section-title">Grooming and Accessories</div>
                    </div>

                    {/* Accessories */}
                    <div className="container accessories">
                        <div className="home-section-title">Accessories</div>
                        <div className="row accessories-cards">
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                <ProductCard />
                            </div>
                        </div>
                    </div>
                    {/* Grooming */}
                    <div className="container grooming">
                        <div className="home-section-title">Grooming</div>
                        <div className="row grooming-cards">
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 col-xl-2 grooming-card-container">
                                <ProductCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default HomePage;