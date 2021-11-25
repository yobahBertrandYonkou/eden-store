import './landingpage.css';
import topImg from './lp-top.jpg';
import topSmallImg from './lp-top-small.jpg';

var LandingPage = () => {
    return (
        <div className="lp-main-container">
            <header>
                <nav>
                    <div class="container-fluid top-nav">
                        <div class="nav-logo">EDEN<span id="site-section"></span></div>
                        <ul id="nav-links">
                            <button id="get-app"><i className="fab fa-google-play"></i> Get the app</button>
                            <li class="nav-item"><a href="/">Home</a></li>
                            <li class="nav-item"><a href="http://localhost:3000/login">NGOs</a></li>
                            <li class="nav-item"><a href="/Groomers">Groomers</a></li>
                            <li class="nav-item"><a href="/Veterinarians">Veterinarians</a></li>
                            <li class="nav-item"><a href="/accessories/home">Shop</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div style={{ padding: "0px 140px 0px 140px" }} class="container-fluid">
                <div class="row">
                    <div class="col-lg-4 top-left">
                        <div id="lp-top-title" class="lp-title">Caring for your little <br /> Paalatoo Jaanavar <br /> at home </div>
                        <div className="lb-top-subtitle">Providing the ultimate solution for pet care. Grooming, <br /> Incident 
                        report and Shopping in one location.</div>
                        <img style={{ marginTop: "40px"}} width="300px" height="300px" src={ topSmallImg } alt="Dog and Cat sitting down" />
                    </div>
                    <div id="top-vector" class="col-lg-8 top-right">
                        <img width="100%" src={ topImg } alt="Dog and Cat sitting down" />
                    </div>
                </div>
            </div>
            <div class="container who-we-are">
                <div id="wwa-title" class="lsection-title">
                    <div>Our Services</div>
                    <div id="lp-line"></div>
                </div>
                <div className="wwa-text-title">Alerts</div>
                <div id="wwa-text" class="who-we-are-text">
                If you witness suspected abuse to animals, call your local eden control service as soon as possible or dial 100 if you are unfamiliar with local organizations. The responding agency is required to investigate if you make a report of alleged animal cruelty.
                </div>
                <div className="wwa-text-title">Diagnosis</div>
                <div id="wwa-text" class="who-we-are-text">
                There are many health benefits of owning a pet. They can increase opportunities to exercise, get outside, and socialize. Regular walking or playing with pets can decrease blood pressure, cholesterol levels, and triglyceride levels. Pets can help manage loneliness and depression by giving us companionship. Please do same for them when they are sick.
                </div>
                <div className="wwa-text-title">Grooming</div>
                <div id="wwa-text" class="who-we-are-text">
                Grooming refers to behaviors involved in cleaning and maintaining body function and hygiene. ... This behavior is displayed by many different animals, including mammals, insects, fish, and birds
                </div>
                <div className="wwa-text-title">Shopping</div>
                <div id="wwa-text" class="who-we-are-text">
                A food must contain at least 18% protein, 5% fat, and maximum percentages of crude fiber and moisture. Some dog foods guarantee minimum levels of other nutrients such as calcium, phosphorous, sodium, and linoleic acid which are especially important for bone growth in puppies.
                </div>
            </div>
            <footer style={{ marginTop: "50px" }}>
                <div class="container-fluid footer-container">
                    <div class="container ">
                        <div class="row">
                            <div class="col-lg-6">&copy; <i>EDEN - FOR PET CARE</i></div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;