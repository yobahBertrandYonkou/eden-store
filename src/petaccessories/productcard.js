import { Link } from 'react-router-dom';
import './css/productcard.css'
import cardPhoto from './images/product1.png'

var ProductCard = ({ details })=>{
    console.log(details)
    return (
        <Link to={`/products/${ details.id }`}>
            <div className="card-container">
            <div className="card-photo">
                <img height="100%" src={cardPhoto} alt="" />
            </div>
            <div className="card-info">
                <div className="card-title">Boltz Premium Guinea Pig Food, Nutritionist...</div>
                <div className="seller-name">by BOLTZ</div>
                <div className="rating">Rating here</div>
                <div className="card-price">₹ 600</div>
                {/* <div className="add-to-cart-btn">Add to Cart</div> */}
            </div>
        </div>
        </Link>
    );
}

export default ProductCard;