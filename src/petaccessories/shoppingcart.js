import { useEffect } from 'react';
import './css/shoppingcart.css'
import Footer from './footer';
import Header from './header'
import { useFetchAll } from './hooks/useFetch';
import ProductCard from './productcard';

var ShoppingCart = ()=>{
    
    const { data: userCart, isLoading, hasData } = useFetchAll("http://localhost:9000/user", "cart", "DSErqrq545dsDh")

    useEffect(() => {
        
        if(localStorage.getItem("recent-action") == "delete"){
            document.querySelector('.show-notification').innerHTML = (
                `<div class="alert alert-success alert-dismissible" role="alert">
                    ${localStorage.getItem("recent-delete")} has been successfully deleted.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                </div>`
            );
            localStorage.removeItem("recent-action");
            localStorage.removeItem("recent-delete");
        }
        if(userCart != null){
            document.querySelector('.sub-total-title').textContent = `Subtotal (${ userCart.products.length } items)`;
            var subTotal = 0
            userCart.products.forEach(item => {
                subTotal += (parseFloat(item.price) * parseFloat(item.quantityNeeded));
            });
            document.querySelector('.sub-total-value').textContent = `Rs. ${ subTotal }`;

            

            setTimeout(() => {
                // cart item action btns
                var deleteItem = document.querySelectorAll('.delete-cart-item');
                
                deleteItem.forEach(btn => {
                    btn.onclick = async (event) => {
                        console.log("Clicked")
                        await fetch("http://localhost:9000/user/cart", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({userId: "DSErqrq545dsDh", itemId: event.target.getAttribute("data-item-id")})
                        })
                        .then(response => response.json())
                        .then(res => {
                            console.log(res);
                            localStorage.setItem("recent-action", "delete");
                            localStorage.setItem("recent-delete", res.name);
                            window.location.reload();
                        })
                        .catch(error => console.error(error));
                    }
                });

            }, 1000);

            
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
                                <div style={{ fontWeight: 'lighter'}} className="col-12 text-center">
                                    Your cart is empty.
                                </div>
                            }

                            {/* items */}
                            { 
                                !isLoading && hasData &&
                                userCart.products.map((productDetails) => {
                                    return (
                                        <div className="col-12 cart-item-card" id={ `card-${ productDetails.id }`}>
                                            <img src={ productDetails.photoUrl }  className="item-photo" alt={ productDetails.id } />
                                            <div className="item-details">
                                                <div className="item-title">{ productDetails.name } ({ productDetails.quantity } { productDetails.unit })</div>
                                                <div className="item-seller">Boltz Accessories</div>
                                                <div className="item-price">Price: Rs { productDetails.price }</div>
                                                <div className="in-stock-status">In stock</div>
                                                <div className="item-category">{ productDetails.category } accessories</div>
                                                <div className="item-quantity">Quantity: <input onChange = { async (event) => {
                                                    console.log(event.target.getAttribute("data-item-id"));
                                                        await fetch("http://localhost:9000/user/cart", {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({ userId: "DSErqrq545dsDh", itemId: event.target.getAttribute("data-item-id"), quantity: parseInt(event.target.value) })
                                                        })
                                                        .then(response => response.json())
                                                        .then(res => {
                                                            console.log(res);
                                                            
                                                            document.querySelector('.show-notification').innerHTML = (
                                                                `<div class="alert alert-info alert-dismissible" role="alert">
                                                                    Please <button style="border: none;, background-color: white;" onclick="window.location.reload()" style="color: blue">reload</button> to reflect changes. Thank you.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                                                                </div>`
                                                            );
                                                        })
                                                        .catch(error => console.error(error)); 
                                                        } 
                                                    } data-item-id = { productDetails.id } min="1" type="number" defaultValue={ `${productDetails.quantityNeeded}` } className="scp-product-detials" /></div>
                                            </div>
                                            <div id="cart-action-btns">
                                                <button className="scp-product-detials" onClick={ ()=> window.open(`/accessories/${ productDetails.category }/products/${ productDetails.id }`, "_self")} type = "button"><i className="fas fa-info scp-action-icons"></i></button>
                                                <button className="scp-product-detials delete-cart-item" data-item-id = { productDetails.id }  type = "button"><i data-item-id = { productDetails.id } className="fas fa-trash-alt scp-action-icons"></i></button>
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
                            {hasData && <button type="button" className="add-to-cart-btn proceed-to-check-out">Proceed to buy</button>}
                            {!hasData && <button style={{ width: "100%", borderRadius: "5px", border: "1px solid #d1d1d5", fontSize: "12px", padding: "3px", color: "#d1d1d5", backgroundColor: "white", cursor: "not-allowed"}} type="button" className="add-to-cart-btn" disabled>Proceed to buy</button>}
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
            <div style={{ position: "fixed", top: "0", width: "100%"}} className="show-notification"></div>
            <Footer />
        </div>
    );
}

export default ShoppingCart;