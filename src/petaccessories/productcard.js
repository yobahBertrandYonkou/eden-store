import { Link } from 'react-router-dom';
import './css/productcard.css'
import cardPhoto from './images/product1.png'

var ProductCard = ({ details })=>{
    console.log(details)
    return (
        <a href={`/accessories/${ details.category }/products/${ details.id }`}>
            <div className="card-container">
            <div className="card-photo">
                <img height="100%" src={cardPhoto} alt="" />
            </div>
            <div className="card-info">
                <div className="card-title">{ details.name.substring(0, 45) }...</div>
                <div className="pdt-seller-name">by BOLTZ</div>
                <div className="rating">Rating here</div>
                <div className="card-price">₹ { details.price }</div>
                {/* <div className="add-to-cart-btn">Add to Cart</div> */}
            </div>
        </div>
        </a>
    );
}

export default ProductCard;