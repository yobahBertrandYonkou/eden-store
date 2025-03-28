import './css/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faCat, faDog, faKiwiBird, faGift, faCheese, faBars, faGlobe, faTruck} from '@fortawesome/free-solid-svg-icons';
import { FaGooglePlay } from '@react-icons/all-files/fa/FaGooglePlay'
import { useEffect, useState } from 'react';
// Header component
var Header = ()=>{
    // handling small screen
    var isSmallDevice = false;
    if (window.innerWidth <= 740) isSmallDevice = true;
    else isSmallDevice = false;

    const [numberOfItemsInCart, setNumberOfItemsInCart ] = useState(0);
    var searchAlgolia = async () => {
         var searchCategory = document.getElementById("search-categories");
        var searchBox = document.getElementById("product-search"); 
        console.log("Changed")
        await fetch("http://localhost:9000/products/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchText: searchBox.value.trim(),
                category: searchCategory.value
            })
        })
        .then( response => response.json() )
        .then( result => {
            var resultCardHolder = document.querySelector(".search-result");
            if(searchBox.value.trim() === ""){
                resultCardHolder.innerHTML = "";
                document.getElementById("number-of-hits").textContent = "0";
                return
            }
            console.log(result.result);
            document.getElementById("number-of-hits").textContent = result.result.nbHits;
            
            if (result.result.nbHits === 0){
                resultCardHolder.textContent = "No items found";
            }else{
                resultCardHolder.innerHTML = "";
                result.result.hits.forEach( hit => {
                    if (hit.name === undefined){
                        resultCardHolder.insertAdjacentHTML('beforeend', 
                        `
                        <div style="margin-bottom: 20px" className="col-xs-6 col-sm-5 col-md-4 col-lg-4 col-xl-3">
                            <a href="/accessories/${ hit.category }/products/${ hit.objectID.trim() }" className="card">
                                <div className="card-photo card-img-top">
                                    <img style="object-fit: contain;" height="200px; width: 70%" src="https://storage.googleapis.com/login-371ec.appspot.com/EDEN/accessories/stocks/STK-ALL-20102021-145535/photo-1.jpg" alt="" />
                                </div>
                                <div className="card-body">
                                    <div className="card-title">${ hit.title }</div>
                                </div>
                            </a>
                        </div>
                        `);
                    }else{
                        var name = hit.name;
                        if (hit.name.length > 20){
                            name = hit.name.substring(0 , 20) + "...";
                        }
                        resultCardHolder.insertAdjacentHTML('beforeend', 
                        `
                        <div style="margin-bottom: 20px" className="col-xs-6 col-sm-5 col-md-4 col-lg-4 col-xl-3">
                            <a href="/accessories/${ hit.category }/products/${ hit.objectID.trim() }" className="card">
                                <div className="card-photo card-img-top">
                                    <img style="object-fit: contain;" height="200px; width: 70%" src="${ hit.photoUrl }" alt="" />
                                </div>
                                <div className="card-body">
                                    <div className="card-title">${ name }</div>
                                    <div className="card-price">Rs ${ hit.price }</div>
                                </div>
                            </a>
                        </div>
                        `);
                    }
                });
            }

        } )
        .catch( error => console.log(error));
    }

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

        // updating cart count
        (async () => {
            var socket = new WebSocket("ws:localhost:9000/user/cart");
            socket.onopen = () => {
                socket.send(JSON.stringify({uid: localStorage.getItem("eden-pa-user-uid")}))
            };
            socket.onmessage = (msg) => {
                
                setNumberOfItemsInCart(msg.data)
            } 

            document.onclose = () => socket.close();
        })();

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
                    <div>
                        
                        {localStorage.getItem('eden-pa-user-logged-in') !== "true" && <a href="/accessories/signin" className="signin-btn">User Sign in</a> }
                        {localStorage.getItem('eden-pa-user-logged-in') === "true" && <div>Hello, {localStorage.getItem("eden-pa-user-name").split(' ')[0] }  <button onClick = { () => {
                            localStorage.removeItem("eden-pa-user-name");
                            localStorage.removeItem("eden-pa-user-email");
                            localStorage.removeItem("eden-pa-user-uid");
                            localStorage.removeItem("eden-pa-user-photo");
                            localStorage.setItem("eden-pa-user-logged-in", "false");

                            if(localStorage.getItem("eden-sl-user-logged-in") === "true"){
                                localStorage.removeItem("eden-sl-user-store");
                                localStorage.removeItem("eden-sl-user-email");
                                localStorage.removeItem("eden-sl-user-uid");
                                localStorage.setItem("eden-sl-user-logged-in", "false");
                            }
                            window.location = "/accessories/home";
                        }} className="signin-btn">Sign Out</button> </div> }
                        {localStorage.getItem('eden-pa-user-logged-in') !== "true" && <a style={{ marginLeft: "5px"}} href="/seller/signin" className="signin-btn">Seller Sign In</a> }

                    </div>
                </div>
                {/* Top row with language and signin btn ends  */}
                {/* Middle row */}
                <div className="middle-row">
                    <div className="middle-row-left">
                    <div onClick= { () => window.location = "/" } className="logo"><FontAwesomeIcon icon={faBars}  id="menu-toggler" className="menu-toggler"/>EDEN</div>
                    <div className="search">
                        <select onChange = { searchAlgolia } name="search-categories" defaultValue="all" id="search-categories" className="search-categories">
                            <option value="all">All Categories</option>
                            <option value="cats">Cats</option>
                            <option value="dogs">Dogs</option>
                            <option value="birds">Birds</option>
                            <option value="hamsters">Hamsters</option>
                        </select>
                        <input onFocus = { () => {
                            var searchResult = document.querySelector(".search-result");
                            console.log(document.querySelector(".search-result-container").style.display)
                            if (document.querySelector(".search-result-container").style.display !== "block"){
                                searchResult.innerHTML= "";
                                document.querySelector(".search-result-container").style.display = "block";
                            }

                            if(window.innerWidth <= 450){
                                console.log("yes")
                                document.querySelector(".search-result-container").style.marginTop = "30px";
                            }else{
                                document.querySelector(".search-result-container").style.marginTop = "auto";
                            }
                        }} onChange = { searchAlgolia } id="product-search" type="search" className="search-box"  placeholder="Search for products" />
                    </div>
                    </div>
                    <div className="middle-row-right">
                        <a className="contacts" href="tell:7829073646">Call: +91 7829 073646</a>
                        <a className="contacts" href="mailto:bmbvfx@gmail.com">Email: bmbvfx@gmail.com</a>
                        <div className="gplay-btn"><div>Google Play</div> <FaGooglePlay className="hide" /> </div>
                        <button onClick={ ()=> window.open("/accessories/cart", "_self") } className="cart-btn"> <FontAwesomeIcon icon={faShoppingCart}/><div id="num-items-in-cart">{ numberOfItemsInCart }</div><div style={{fontSize: "16px"}}>Cart</div></button>
                    </div>
                </div>
                {/* Middle row ends */}
                {/* search results */}
                    <div className="search-result-container">
                        <div style={{ fontSize: "16px", marginBottom: "20px" }} className="card-title">Search Results (<span id="number-of-hits">0</span>)</div>
                        <div className="container">
                            <div className="row search-result">
                            </div>
                        </div>
                        <div title="Close search results" className="close-search-result" onClick = { () => {
                            document.getElementById("number-of-hits").textContent = "0";
                            document.querySelector(".search-result").innerHTML = "";
                            document.querySelector(".search-result-container").style.display = "none";

                        }}><i className="fa fa-times"></i></div>
                    </div>
                {/* Bottom row with categories */}
                <div id="bottom-menu" className="bottom-row">
                    <div className="bottom-row-links">
                        <a href="/accessories/home" className="home"><FontAwesomeIcon icon={faHome} className="top-nav-icons"/>Home</a>
                        <a href="/accessories/cats" className="cats"><FontAwesomeIcon icon={faCat} className="top-nav-icons"/>Cats</a>
                        <a href="/accessories/dogs" className="dogs"><FontAwesomeIcon icon={faDog} className="top-nav-icons"/>Dogs</a>
                        <a href="/accessories/birds" className="birds"><FontAwesomeIcon icon={faKiwiBird} className="top-nav-icons"/>Birds</a>
                        <a href="/accessories/hamsters" className="hamsters"><FontAwesomeIcon icon={faCheese} className="top-nav-icons"/>Hamsters</a>
                        <a href="/accessories/offers" className="offers"><FontAwesomeIcon icon={faGift} className="top-nav-icons"/>Offers</a>
                        { localStorage.getItem("eden-pa-user-uid") && <a href="/accessories/orders" className="orders"><FontAwesomeIcon icon={faTruck} className="top-nav-icons"/>Orders</a> }
                        { isSmallDevice && <a href="/accessories/orders" className="orders"><FontAwesomeIcon icon={ faShoppingCart } className="top-nav-icons"/>Cart ({numberOfItemsInCart})</a> }
                    </div>
                    <div className="cut-maker"></div>
                </div>
                {/* Bottom row with categories ends */}
            </div>
        </header>
        
    );
}

export default Header;
