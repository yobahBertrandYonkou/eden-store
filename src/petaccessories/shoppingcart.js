import { useEffect } from 'react';
import './css/shoppingcart.css'
import Footer from './footer';
import Header from './header'
import { useFetchAll } from './hooks/useFetch';
import ProductCard from './productcard';

var ShoppingCart = ()=>{
    
    const { data: userCart, isLoading, hasData } = useFetchAll("http://localhost:9000/user", "cart", "DSErqrq545dsDh")

    useEffect(() => {
        
        if(userCart != null){
            document.querySelector('.sub-total-title').textContent = `Subtotal (${ userCart.products.length } items)`;
            var subTotal = 0
            userCart.products.forEach(item => {
                subTotal += parseFloat(item.price);
            });
            document.querySelector('.sub-total-value').textContent = `Rs. ${ subTotal }`;
        }

        
    }, [userCart]);

    return (
        <div className="shopping-cart-page-container">
            <Header />
            <div className="shopping-cart-page-content">
                <div className="cart-items-container container">
                    <div className="scp-title">Shopping Cart</div>
                    <div className="line scp-line"></div>
                    <div style={{margin: "0"}} className="row">
                        <div style={{margin: "0"}} className="col-lg-9 items-card-container row">
                            

                            { 
                                isLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            
                            {/* no data found */}
                            { 
                                !isLoading && !hasData  && 
                                <div className="col-12 text-center">
                                    Your cart is empty
                                </div>
                            }

                            {/* items */}
                            { 
                                !isLoading && hasData &&
                                userCart.products.map((productDetails) => {
                                    return (
                                        <div className="col-12 cart-item-card">
                                            <img src={ productDetails.photoUrl }  className="item-photo" />
                                            <div className="item-details">
                                                <div className="item-title">{ productDetails.name } ({ productDetails.quantity } { productDetails.unit })</div>
                                                <div className="item-seller">Boltz Accessories</div>
                                                <div className="item-price">Price: Rs { productDetails.price }</div>
                                                <div className="in-stock-status">In stock</div>
                                                <div className="item-category">{ productDetails.category } accessories</div>
                                                <div className="item-quantiy">Quantity: { productDetails.quantityNeeded }</div>
                                            </div>
                                            <div>
                                                <button className="scp-product-detials" onClick={ ()=> window.open(`/accessories/${ productDetails.category }/products/${ productDetails.id }`, "_self")}>More</button>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="col-lg-3 items-summary-container">
                            <div className="items-summary-content">
                            <div className="sub-total-title">Subtotal (0 items)</div>
                            <div className="sub-total-value">Rs. 00</div>
                            <div className="add-to-cart-btn proceed-to-check-out">Proceed to buy</div>
                            </div>
                        </div>
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

export default ShoppingCart;