import { useEffect } from 'react';
import './css/productcard.css'
import { Rating } from '@mui/material';

var ProductCard = ({ details })=>{
    
    useEffect(() => {
        var addToCart = document.querySelectorAll('.pdt-cart-btn');
        
        addToCart.forEach(btn => {
            btn.onclick = async (event) => {
                if (!localStorage.getItem("eden-pa-user-uid")){
                    window.location = "signin";
                    return
                }
                console.log(event.target.id);
                var quantity = document.getElementById(`quantity-${ event.target.id }`);
                console.log(quantity.value)
                if (parseInt(quantity.value) > 0){
                    var temp = {};
                    temp['quantityNeeded'] = parseInt(quantity.value);
                    temp['id'] = event.target.id;
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
                        document.querySelector('.show-notification').innerHTML = (
                            `
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${ event.target.getAttribute('data-pdt-name').substring(0, 25) }...</strong> successfully added to cart.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                    
                                </button>
                            </div>   
                           `
                        );
                    })
                    .catch(error => console.error(error));
                }
            }
        });

    }, []);
    return (
        <div className="card-container card">
            <a href={`/accessories/${ details.category }/products/${ details.id }`} className="card-link">
                <div className="card-photo card-img-top">
                    <img width="100%" height="200px" style={{objectFit: "cover", borderRadius: '5px'}} src={details.photoUrls['photo-1']} alt="" />
                </div>
                <div className="card-info ">
                    <div className="card-title">{ details.name.substring(0, 15) } <span style={{ color: "blueviolet"}}>More...</span></div>
                    <div className="pdt-seller-name">by { details.brand.toUpperCase() }</div>
                    <div style={{ display: "flex", alignItems: "center" }} className="rating">
                        <Rating value={parseInt(details.topRating)} size='small' readOnly/>
                        {/* edit={false}
                            value= {  }
                            count={ 5 }
                            activeColor="orange" 
                            color="#d1d1d5" */}
                         <span style={{marginLeft: "5px", fontSize: "12px"}}>  { details.rating[details.topRating] > 0 ? `(${details.rating[details.topRating]})` : "" } </span>
                    </div>
                    {details.discount !== 0 && <div className="card-price"><strike>₹ { details.price }</strike> <br /><span>₹ { (details.price - details.price * details.discount / 100).toFixed(2) } ({ details.discount }% off)</span></div>}
                    {details.discount === 0 && <div className="card-price"><strike>₹ { details.price }</strike></div>}
                </div>
            </a>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}} className="row">
                    <div className="col-4 pdt-qty">
                        <input min="1" defaultValue="1" id={`quantity-${ details.id }`} type="number" name="" />
                    </div>
                    <div className="col-8 add-to-cart-btn">
                        <input className="pdt-cart-btn" id={ details.id } data-pdt-name={ details.name } type="button" value="Add to Cart" />
                    </div>
                </div>
        </div>
    );
}

export default ProductCard;