import { useParams } from 'react-router';
import './css/productpage.css'
import Footer from './footer';
import Header from './header';
import { useFetchOne } from './hooks/useFetch';
import ProductCard from './productcard';

var ProdudctPage = ()=>{
    const { id } = useParams();
    const { data, isLoading } = useFetchOne("http://localhost:9000/products", id);

    return(
        <div className="product-page-container">
            <Header />
            <div className="product-page-content">
                <div className="container product-overview-container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-6 product-photos-container">
                        <div className="product-alternative-photos">
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                            </div>
                            <div className="product-photo-display"></div>
                        </div>
                        <div className="col-lg-4 col-xl-6 product-details-container">
                            <div className="product-detail-item product-title">{ !isLoading && data.name }</div>
                            <div className="product-detail-item product-rating">Rating</div>
                            <div className="product-detail-item product-price">Rs. { !isLoading && data.price }</div>
                            <div className="product-detail-item product-quantity">{ !isLoading && data.quantity } { !isLoading && data.unit }</div>
                            <div className="product-detail-item available-product-colors">Color: { !isLoading && data.color }</div>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Associated products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Often bought with the following</div>
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

                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Related products</div>
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
            </div>
            <Footer />
        </div>
    );
}


export default ProdudctPage;