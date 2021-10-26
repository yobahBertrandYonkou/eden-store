/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './css/productpage.css'
import Footer from './footer';
import Header from './header';
import { useFetchOne } from './hooks/useFetch';
import ProductCard from './productcard';

var ProdudctPage = ()=>{
    const { id } = useParams();
    const { data, related, isLoading } = useFetchOne("http://localhost:9000/products", id);
    const [ itemAddedToCartStatus, setItemAddedToCartStatus ] = useState(false);
    
    useEffect(() => {
        var thumbnails = document.querySelectorAll('.photo-thumbnail');
        var photoPreview = document.getElementById('photo-preview');

        // display thumb to preview container
        thumbnails.forEach(thumbnail => {
            console.log("sdf")
            thumbnail.onclick = (event) => {
                console.log(event)
                if (event.target.src != "" && event.target.nodeName == "IMG"){
                    photoPreview.src = event.target.src;
                }
                
            }
        });

        
        setTimeout(() => {
            console.log("ok")
            var addToCart = document.querySelector('.product-add-to-cart-btn');
            var quantity = document.querySelector('.onea-pdt-qty');

            // adding to cart
            addToCart.onclick = async () => {
                if (parseInt(quantity.value) > 0){
                    var temp = {};
                    temp['quantityNeeded'] = parseInt(quantity.value);
                    temp['id'] = data.id;
                    temp['userId'] = localStorage.getItem("eden-pa-user-uid");
                    await fetch("http://localhost:9000/user/cart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(temp)
                    })
                    .then(response => response.json())
                    .then(res => {
                        console.log(res);
                        document.querySelector('.product-overview-container').insertAdjacentHTML('afterbegin',
                            `<div class="alert alert-success alert-dismissible" role="alert">
                                ${ data.name.substring(0, 25) }... successfully added to cart.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                            </div>`
                        );
                    })
                    .catch(error => console.error(error));
                }
            }
        }, 1000);
    }, [data]);

    return(
       data && <div className="product-page-container">
            <Header />
            <div className="product-page-content">
                <div className="container product-overview-container">
                    <div className="row">
                        {/* <div className="col-lg-8 col-xl-6 product-photos-container">
                            <div className="product-alternative-photos">
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                                <div className="photo-thumb"></div>
                            </div>
                            <div className="product-photo-display"></div>
                        </div> */}
                        <div className="col-lg-8 col-xl-6 item-photos-container">
                            <div className="photo-preview-div" style={{ padding: "20px" }}>
                                <img id="photo-preview" src={ data.photoUrls['photo-1'] } className="photo-preview" alt="preview" />
                            </div>
                            <div className="photo-thumbnails">
                                <img width="60px" height="60px" src = { data.photoUrls['photo-1'] } id="photo-th-1" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-2'] } id="photo-th-2" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-3'] } id="photo-th-3" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-4'] } id="photo-th-4" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-5'] } id="photo-th-5" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-6'] } id="photo-th-6" className="photo-thumbnail" alt=""/>
                                <img src = { data.photoUrls['photo-7'] } id="photo-th-7" className="photo-thumbnail" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-6 product-details-container">
                            <div className="product-detail-item product-title">{ !isLoading && data.name }</div>
                            <div className="product-detail-item product-rating">Rating: </div>
                            <div className="product-detail-item product-price">Price: ₹ { !isLoading && data.price }</div>
                            <div className="product-detail-item product-price">Discount: { !isLoading && data.discount }%. Saving Rs. { !isLoading && data.price * (data.discount/100) }</div>
                            <div className="product-detail-item product-quantity">Weight: { !isLoading && data.quantity } { !isLoading && data.unit }</div>
                            <div className="product-detail-item available-product-colors">Color: { !isLoading && data.color }</div>
                            <div className="product-detail-item">
                                Quantity: <input className="onea-pdt-qty" style={{ width: "100px" }} min="1" defaultValue="1" id="pdt-quantity" type="number" name="" id=""/>
                            </div>
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
                            </div><br />
                            <div className="product-description">
                                <span style={{fontWeight: "bold"}}>About this Product</span><br />
                                { !isLoading && data.description}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Associated products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Often bought with the following</div>
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

                {/* related products */}
                <div className="container best-selling">
                    <div style={{fontWeight: "normal", marginTop: "60px"}} className="home-section-title">Related products</div>
                    <br />

                    <div className="row best-selling-cards">
                        {/* Loading... */}
                        { 
                                isLoading &&  

                                <div className="col-12 text-center">
                                    <div className="spinner-grow text-secondary" role="status"></div>
                                </div>
                            }
                            
                            {/* no data found */}
                            { 
                                !isLoading && related.length == 0  && 
                                <div className="col-12 text-center">
                                    No accessories
                                </div>
                            }

                            {/* outputing accessores from useFetch */}
                            { 
                                !isLoading && related.length != 0 &&
                                related.map((productDetails) => {
                                    return (
                                        <div className="col-6 col-md-4 col-lg-3 col-xl-2 accessories-card-container">
                                            <ProductCard details = { productDetails } />
                                        </div>
                                    );
                                })
                            }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default ProdudctPage;