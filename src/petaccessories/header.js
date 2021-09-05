import './css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faCat, faDog, faKiwiBird, faGift, faCheese} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay'
// Header component
var Header = ()=>{
    return (
        <header>
            <div className="top-nav-container">
                {/* Top row with language and signin btn  */}
                <div className="top-row">
                    <div className="language">English</div>
                    <a className="signin-btn">Sign in</a>
                </div>
                {/* Top row with language and signin btn ends  */}
                {/* Middle row */}
                <div className="middle-row">
                    <div className="middle-row-left">
                    <div className="logo">PETBIOS</div>
                    <div className="search">
                        <select name="search-categories" id="search-categories" className="search-categories">
                            <option value="all">All Categories</option>
                            <option value="cats">Cats</option>
                            <option value="dogs">Dogs</option>
                            <option value="birds">Birds</option>
                            <option value="hamsters">Hamsters</option>
                        </select>
                        <input type="search" className="search-box"  placeholder="Search for products" />
                    </div>
                    </div>
                    <div className="middle-row-right">
                        <a className="contacts" href="tell:7829073646">Call: +91 7829 073646</a>
                        <a className="contacts" href="mailto:bmbvfx@gmail.com">Email: bmbvfx@gmail.com</a>
                        <div className="gplay-btn"><div>Google Play</div> <FaGooglePlay className="hide" /> </div>
                        <div className="cart-btn"><div>Card</div> <FontAwesomeIcon icon={faShoppingCart}/></div>
                    </div>
                </div>
                {/* Middle row ends */}
                {/* Bottom row with categories */}
                <div className="bottom-row">
                    <div className="bottom-row-links">
                        <a href="#" className="home"><FontAwesomeIcon icon={faHome} className="top-nav-icons"/>Home</a>
                        <a href="#" className="cats"><FontAwesomeIcon icon={faCat} className="top-nav-icons"/>Cats</a>
                        <a href="#" className="dogs"><FontAwesomeIcon icon={faDog} className="top-nav-icons"/>Dogs</a>
                        <a href="#" className="birds"><FontAwesomeIcon icon={faKiwiBird} className="top-nav-icons"/>Birds</a>
                        <a href="#" className="hamsters"><FontAwesomeIcon icon={faCheese} className="top-nav-icons"/>Hamsters</a>
                        <a href="#" className="offers"><FontAwesomeIcon icon={faGift} className="top-nav-icons"/>Offers</a>
                    </div>
                    <div className="cut-maker"></div>
                </div>
                {/* Bottom row with categories ends */}
            </div>
        </header>
    );
}

export default Header;
