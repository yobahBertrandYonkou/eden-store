
import './css/offercardcontainer.css'
var OfferCard = ( { photo }) => {
    return(
        <div className="offer-card-container">
            <img src= { photo } alt="" />
        </div>
    );
}


export default OfferCard;