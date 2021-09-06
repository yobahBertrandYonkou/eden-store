import './css/footer.css'

var Footer = ()=>{
    return(
        <div className="footer-container container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div style={{ fontWeight: "bold", fontSize: "36px"}} className="section-title">PETBIOS</div>
                        <div className="normal-string">The one-stop solution for you pet’s needs. Giving your pet a happy life</div>
                    </div>
                    <div className="footer-section col-lg-4">
                        <div className="section-title">Quick Links</div>
                        <a href="#" className="home">Home</a>
                        <a href="#" className="cats">Cats</a>
                        <a href="#" className="dogs">Dogs</a>
                        <a href="#" className="birds">Birds</a>
                        <a href="#" className="hamsters">Hamsters</a>
                    </div>
                    <div className="footer-section col-lg-4">
                        <div className="section-title">Legal</div>
                        <a href="#">Terms and Conditions</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className="col-sm-12 extra-info">
                        <div className="copy-write">© 2021 PETBIOS. All rights reserved.</div>
                        <a href="#" className="back-to-top">Back to top</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;