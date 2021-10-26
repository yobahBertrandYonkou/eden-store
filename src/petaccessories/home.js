import Filter from "./filter";
import Header from "./header";
import './css/home.css'
import CategoryCard from "./category";
import ProductCard from "./productcard";
import Footer from "./footer";
import { useFetchAll } from "./hooks/useFetch";
import Cats from "./images/cats.jpg"
import Dogs from "./images/dogs.jpg"
import Birds from "./images/birds.jpg"
import Hamsters from "./images/hamsters.jpg"
import offer1 from "./images/p1.png"
import offer2 from "./images/p2.png"
import offer3 from "./images/p3.png"
import offers3 from "./images/offers3.png"
import offers4 from "./images/offers4.png"
import offers2 from "./images/offers2.png"
import offers1 from "./images/offers1.png"
import howItsDone from "./images/how-its-done.png"
import { useLocation, useParams } from "react-router";
import querystring from "query-string";
import { useEffect } from "react";

var HomePage = ()=>{
    // fetching data for accessories
    const { data: accessories, isLoading, hasData: hasAccessories } = useFetchAll("http://localhost:9000/products", "all", "accessories");
    const { data: grooming, isLoading: isGroomingLoading, hasData: hasGrooming } = useFetchAll("http://localhost:9000/products", "all", "grooming");
    
    useEffect( () => {
        const parsed = querystring.parse(window.location.search);
        console.log(parsed);

    if (Object.keys(parsed).length === 2){
        fetch(`http://localhost:9000/user/accessories/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {
                token: parsed.token,
                key: parsed.key
            })
        })
        .then( response => response.json())
        .then( response => {
            console.log(response);
            // save user data
            localStorage.setItem("eden-pa-user-name", response.name);
            localStorage.setItem("eden-pa-user-email", response.email);
            localStorage.setItem("eden-pa-user-uid", response.uid);
            localStorage.setItem("eden-pa-user-photo", response.photoURL);
            localStorage.setItem("eden-pa-user-logged-in", "true");
            window.location = "/accessories/home";
        })
        .catch( error => console.log(error));
    }
    }, []);
    return (
        <div className="homepage-container">
            <Header />
            <br />
            <div className="home-top-carousel carousel slide" data-bs-ride="carousel" id="home-top-carousel">
                <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                        <img width="100%" src={ offers4 } alt="" />
                    </div>
                    <div className="carousel-item">
                        <img width="100%" src={ offers3 } alt="" />
                    </div>
                    <div className="carousel-item">
                        <img width="100%" src={ offers2 } alt="" />
                    </div>
                    <div className="carousel-item">
                        <img width="100%" src={ offers1 } alt="" />
                    </div>
                </div>
                <button className="carousel-control-prev" data-bs-slide="prev" data-bs-target="#home-top-carousel">
                    <span className="carousel-control-prev-icon" aria-hidden= { true }></span>
                </button>
                <button className="carousel-control-next" data-bs-slide="next" data-bs-target="#home-top-carousel">
                    <span className="carousel-control-next-icon" aria-hidden= { true }></span>
                </button>
            </div>
            <div style={{marginBottom: "40px"}} className="how-its-done">
                <img width="100%" src={ howItsDone } alt="" />
            </div>
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
                                <CategoryCard name="Cats" photoURL={Cats} />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard name="Dogs" photoURL={Dogs} />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard name="Birds" photoURL={Birds} />
                            </div>
                            <div className="col-sm-6 col-6 col-lg-3 col-md-4 category-card-container">
                                <CategoryCard name="Hamsters" photoURL={Hamsters} />
                            </div>
                        </div>
                    </div>

                    {/* Offers you cant run from */}
                    <div className="container offers-you-cant-run-from">
                        <div className="home-section-title">Offers you can’t escape form</div>
                        <div className="row offer-cards">
                            <div className="col-lg-4 col-sm-6 col-6 category-card-container">
                                <CategoryCard photoURL = { offer1 } />
                            </div>
                            <div className="col-lg-4 col-sm-6  col-6 category-card-container">
                                <CategoryCard photoURL = { offer2 } />
                            </div>
                            <div className="col-lg-4 col-sm-6  col-6 category-card-container">
                                <CategoryCard photoURL = { offer3 } />
                            </div>
                        </div>
                    </div>

                    {/* Best selling products */}
                    <div className="container best-selling">
                        <div className="home-section-title">Best selling items</div>
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