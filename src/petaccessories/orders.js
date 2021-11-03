import { useEffect } from 'react';
import './css/shoppingcart.css'
import Footer from './footer';
import Header from './header'
import { useFetchAll } from './hooks/useFetch';

var Orders = ()=>{
    
    const { data: pendingOrders, isLoading, hasData } = useFetchAll("http://localhost:9000/user", "orders/pending", localStorage.getItem("eden-pa-user-uid"));

    // useEffect(() => {
    //     var cardContainer = document.getElementById('items-card-container');
    //     if(pendingOrders != null){
    //         console.log("in here");
    //         pendingOrders.products.forEach((orders) => {
    //             orders.items.forEach( productDetails => {
    //                 var priceHTML;
    //                 if(productDetails.hasOffer){
    //                     priceHTML = `<div class="item-price">Price: <strike style="margin-right: 5px">Rs. ${ productDetails.quantityNeeded * productDetails.price }</strike> Rs ${ productDetails.offerPrice.toFixed(2) }</div>`;
    //                 }else{
    //                     priceHTML = `<div class="item-price">Price: <strike style="margin-right: 5px">Rs. ${ productDetails.price }</strike> Rs. ${ (productDetails.price * productDetails.quantityNeeded) - (productDetails.price * productDetails.quantityNeeded * productDetails.discount / 100)} <span style={{fontSize: "11px"}}>(${ productDetails.discount }% off)</span></div>`;
    //                 }

    //                 cardContainer.insertAdjacentHTML("beforebegin", 
    //                 `
    //                 <div class="col-12 cart-item-card" id=card-${ productDetails.id }>
    //                     <img src="${ productDetails.photoUrl }"  class="item-photo" alt="${ productDetails.id }" />
    //                     <div class="item-details">
    //                         <div class="item-title">${ productDetails.name } (${ productDetails.quantity } ${ productDetails.unit })</div>
    //                         <div class="item-seller">Boltz Accessories</div>
    //                         ${ priceHTML }
    //                         <div class="in-stock-status">In stock</div>
    //                         <div class="item-category">${ productDetails.category } accessories</div>
    //                         <div class="item-quantity">Quantity: ${ productDetails.quantityNeeded }</div>
    //                     </div>
    //                 </div>
    //                 `);
                
    //             });
    //         })
    //     }
    // }, [pendingOrders]);

    return (
        <div className="shopping-cart-page-container">
            <Header />
            <div className="shopping-cart-page-content">
                <div className="cart-items-container container">
                    <div style={{fontWeight: "normal", textAlign: 'left'}} className="home-section-title">Pending Orders</div>
                    <div className="line scp-line"></div>
                    <div style={{margin: "0"}} className="row">
                        <div style={{margin: "0"}} className="col-lg-12 items-card-container row" id="items-card-container">
                            
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
                                    No orders.
                                </div>
                            }

                            {/* items */}
                            { 
                                !isLoading && hasData &&
                                pendingOrders.products.map((productDetails) => {
                                    
                                    return (
                                        <div className="col-12 cart-item-card" id={ `card-${ productDetails.id }`}>
                                            <img src={ productDetails.photoUrl }  className="item-photo" alt={ productDetails.id } />
                                            <div className="item-details">
                                                <div className="item-title">{ productDetails.name } ({ productDetails.quantity } { productDetails.unit })</div>
                                                <div className="item-seller">Boltz Accessories</div>
                                                { productDetails.hasOffer && <div className="item-price">Price: <strike style={{marginRight: "5px"}}>Rs. { productDetails.quantityNeeded * productDetails.price }</strike> Rs. { productDetails.offerPrice.toFixed(2) }</div>}
                                                { !productDetails.hasOffer && <div className="item-price">Price: <strike style={{marginRight: "5px"}}>Rs. { productDetails.price }</strike> Rs. { (productDetails.price * productDetails.quantityNeeded) - (productDetails.price * productDetails.quantityNeeded * productDetails.discount / 100)} <span style={{fontSize: "11px"}}>({ productDetails.discount }% off)</span></div>}
                                                <div className="in-stock-status">In stock</div>
                                                <div className="item-category">{ productDetails.category } accessories</div>
                                                <div className="item-quantity">Quantity: <input onChange = { async (event) => {
                                                    console.log(event.target.getAttribute("data-item-id"));
                                                        await fetch("http://localhost:9000/user/cart", {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({ userId: localStorage.getItem("eden-pa-user-uid"), itemId: event.target.getAttribute("data-item-id"), quantity: parseInt(event.target.value) })
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
                                        </div>
                                    );
                                })
                            }

                            
                        </div>
                    </div>
                </div>
 
                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Completed Orders</div>
                    <div className="row best-selling-cards">
                        Comming soon
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

export default Orders;