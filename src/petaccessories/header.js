import './css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faCat, faDog, faKiwiBird, faGift, faCheese, faBars, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Header component
var Header = ()=>{
    // Running code after component gets rendered
    useEffect(()=>{
        var menuToggler = document.getElementById('menu-toggler');
        var menu = document.getElementById("bottom-menu");

        if(window.innerWidth <= 704){
            menu.classList.toggle('hide');
        }

        menuToggler.onclick = ()=>{
            menu.classList.toggle('hide');
        };
    }, []);
    return (
        <header>
            <div className="top-nav-container">
                {/* Top row with language and signin btn  */}
                <div className="top-row">
                    <div className="language">
                    <FontAwesomeIcon icon={faGlobe}/>
                        <select name="language" id="language">
                            <option value="english" selected> English</option>
                        </select>
                    </div>
                    <Link to="/signup" className="signin-btn">Sign in</Link>
                </div>
                {/* Top row with language and signin btn ends  */}
                {/* Middle row */}
                <div className="middle-row">
                    <div className="middle-row-left">
                    <div className="logo"><FontAwesomeIcon icon={faBars} id="menu-toggler" className="menu-toggler"/> EDEN</div>
                    <div className="search">
                        <select name="search-categories" defaultValue="all" id="search-categories" className="search-categories">
                            <option value="all">All Categories</option>
                            <option value="cats">Cats</option>
                            <option value="dogs">Dogs</option>
                            <option value="birds">Birds</option>
                            <option value="hamsters">Hamsters</option>
                        </select>
                        <input id="product-search" type="search" className="search-box"  placeholder="Search for products" />
                    </div>
                    </div>
                    <div className="middle-row-right">
                        <Link className="contacts" to="tell:7829073646">Call: +91 7829 073646</Link>
                        <Link className="contacts" to="mailto:bmbvfx@gmail.com">Email: bmbvfx@gmail.com</Link>
                        <div className="gplay-btn"><div>Google Play</div> <FaGooglePlay className="hide" /> </div>
                        <div className="cart-btn"><div>Card</div> <FontAwesomeIcon icon={faShoppingCart}/></div>
                    </div>
                </div>
                {/* Middle row ends */}
                {/* Bottom row with categories */}
                <div id="bottom-menu" className="bottom-row">
                    <div className="bottom-row-links">
                        <Link to="/accessories" className="home"><FontAwesomeIcon icon={faHome} className="top-nav-icons"/>Home</Link>
                        <Link to="/accessories/cats" className="cats"><FontAwesomeIcon icon={faCat} className="top-nav-icons"/>Cats</Link>
                        <Link to="/accessories/dogs" className="dogs"><FontAwesomeIcon icon={faDog} className="top-nav-icons"/>Dogs</Link>
                        <Link to="/accessories/birds" className="birds"><FontAwesomeIcon icon={faKiwiBird} className="top-nav-icons"/>Birds</Link>
                        <Link to="/accessories/hamsters" className="hamsters"><FontAwesomeIcon icon={faCheese} className="top-nav-icons"/>Hamsters</Link>
                        <Link to="#" className="offers"><FontAwesomeIcon icon={faGift} className="top-nav-icons"/>Offers</Link>
                    </div>
                    <div className="cut-maker"></div>
                </div>
                {/* Bottom row with categories ends */}
            </div>
        </header>
        
    );
}

export default Header;
