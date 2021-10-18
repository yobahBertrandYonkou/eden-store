import './css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faCat, faDog, faKiwiBird, faGift, faCheese, faBars, faGlobe} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay'
import { useEffect } from 'react';
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
                        <select defaultValue="english" name="language" id="language">
                            <option value="english"> English</option>
                        </select>
                    </div>
                    <a href="/signup" className="signin-btn">Sign in</a>
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
                        <a className="contacts" to="tell:7829073646">Call: +91 7829 073646</a>
                        <a className="contacts" to="mailto:bmbvfx@gmail.com">Email: bmbvfx@gmail.com</a>
                        <div className="gplay-btn"><div>Google Play</div> <FaGooglePlay className="hide" /> </div>
                        <div className="cart-btn"><div>Card</div> <FontAwesomeIcon icon={faShoppingCart}/></div>
                    </div>
                </div>
                {/* Middle row ends */}
                {/* Bottom row with categories */}
                <div id="bottom-menu" className="bottom-row">
                    <div className="bottom-row-links">
                        <a href="/accessories" className="home"><FontAwesomeIcon icon={faHome} className="top-nav-icons"/>Home</a>
                        <a href="/accessories/cats" className="cats"><FontAwesomeIcon icon={faCat} className="top-nav-icons"/>Cats</a>
                        <a href="/accessories/dogs" className="dogs"><FontAwesomeIcon icon={faDog} className="top-nav-icons"/>Dogs</a>
                        <a href="/accessories/birds" className="birds"><FontAwesomeIcon icon={faKiwiBird} className="top-nav-icons"/>Birds</a>
                        <a href="/accessories/hamsters" className="hamsters"><FontAwesomeIcon icon={faCheese} className="top-nav-icons"/>Hamsters</a>
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
