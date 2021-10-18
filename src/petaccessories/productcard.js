import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/productcard.css'
import cardPhoto from './images/product1.png'

var ProductCard = ({ details })=>{
    console.log(details);
    var dots = "";
    if (details.name.length > 25){
        dots = "...";
    }

    useEffect(() => {
        var addToCart = document.querySelectorAll('.pdt-cart-btn');
        
        addToCart.forEach(btn => {
            btn.onclick = async (event) => {
                console.log(event.target.id);
                var quantity = document.getElementById(`quantity-${ event.target.id }`);
                console.log(quantity.value)
                if (parseInt(quantity.value) > 0){
                    var temp = {};
                    temp['quantityNeeded'] = parseInt(quantity.value);
                    temp['id'] = event.target.id;
                    temp['userId'] = "DSErqrq545dsDh";
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
                            `<div class="alert alert-success alert-dismissible" role="alert">
                                ${ event.target.getAttribute('data-pdt-name').substring(0, 25) }... successfully added to cart.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                            </div>`
                        );
                    })
                    .catch(error => console.error(error));
                }
            }
        });

    }, []);
    return (
        <div className="card-container">
            <a href={`/accessories/${ details.category }/products/${ details.id }`} className="card-link">
                <div className="card-photo">
                    <img height="100%" src={details.photoUrls['photo-1']} alt="" />
                </div>
                <div className="card-info">
                    <div className="card-title">{ details.name.substring(0, 25) }{ dots }</div>
                    <div className="pdt-seller-name">by BOLTZ</div>
                    <div className="rating">Rating here</div>
                    <div className="card-price">₹ { details.price }</div>
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