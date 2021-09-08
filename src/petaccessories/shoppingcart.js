import './css/shoppingcart.css'
import Footer from './footer';
import Header from './header'
import ProductCard from './productcard';

var ShoppingCart = ()=>{
    return (
        <div className="shopping-cart-page-container">
            <Header />
            <div className="shopping-cart-page-content">
                <div className="cart-items-container container">
                    <div className="scp-title">Shopping Cart</div>
                    <div className="line scp-line"></div>
                    <div style={{margin: "0"}} className="row">
                        <div style={{margin: "0"}} className="col-lg-9 items-card-container row">
                            {/* Item card */}
                            <div className="col-12 cart-item-card">
                                <div className="item-photo"></div>
                                <div className="item-details">
                                    <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                    <div className="item-seller">Boltz Accessories</div>
                                    <div className="item-price">Rs 300</div>
                                    <div className="in-stock-status">In stock</div>
                                    <div className="item-category">Cats accessories</div>
                                    <div className="item-quantiy">Quantity</div>
                                </div>
                            </div>
                            {/* Item card */}
                            <div className="col-12 cart-item-card">
                                <div className="item-photo"></div>
                                <div className="item-details">
                                    <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                    <div className="item-seller">Boltz Accessories</div>
                                    <div className="item-price">Rs 300</div>
                                    <div className="in-stock-status">In stock</div>
                                    <div className="item-category">Cats accessories</div>
                                    <div className="item-quantiy">Quantity</div>
                                </div>
                            </div>
                            {/* Item card */}
                            <div className="col-12 cart-item-card">
                                <div className="item-photo"></div>
                                <div className="item-details">
                                    <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                    <div className="item-seller">Boltz Accessories</div>
                                    <div className="item-price">Rs 300</div>
                                    <div className="in-stock-status">In stock</div>
                                    <div className="item-category">Cats accessories</div>
                                    <div className="item-quantiy">Quantity</div>
                                </div>
                            </div>
                            {/* Item card */}
                            <div className="col-12 cart-item-card">
                                <div className="item-photo"></div>
                                <div className="item-details">
                                    <div className="item-title">Boltz Bird Food for Budgies - Mix Seeds (1.2 KG)</div>
                                    <div className="item-seller">Boltz Accessories</div>
                                    <div className="item-price">Rs 300</div>
                                    <div className="in-stock-status">In stock</div>
                                    <div className="item-category">Cats accessories</div>
                                    <div className="item-quantiy">Quantity</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 items-summary-container">
                            <div className="items-summary-content">
                            <div className="sub-total-title">Subtotal (4 items)</div>
                            <div className="sub-total-value">Rs. 400</div>
                            <div className="add-to-cart-btn proceed-to-check-out">Proceed to buy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Related products</div>
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
            </div>
            <Footer />
        </div>
    );
}

export default ShoppingCart;