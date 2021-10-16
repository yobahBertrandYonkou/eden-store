import { useEffect } from 'react';
import './css/dashboard.css'
var Offers= ()=>{

    useEffect(()=>{
        var switcher = document.getElementById("drawer-switch");
        var closeDrawer = document.getElementById("close-drawer");
        var sideNav = document.getElementById("sidenav-id");
        var bodyContainer = document.getElementById("body-container");
        var actionBar = document.getElementById('action-bar-id');

        var showSideNav = ()=>{
            closeDrawer.style.display = "block";
            sideNav.style.left = 0;
            actionBar.style.boxShadow = "none";
            actionBar.style.backgroundColor = "transparent";
            localStorage.setItem("side-bar-state", "true");
            if(window.innerWidth > 1200){
                bodyContainer.style.marginLeft = "280px";
                closeDrawer.style.display = "none";
            }
        }

        var hideSideNav = ()=>{
            sideNav.style.left = "-320px";
            bodyContainer.style.marginLeft = "0px"
            actionBar.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.16)";
            actionBar.style.backgroundColor = "white";
            localStorage.setItem("side-bar-state", "false");
        }
        switcher.onclick = ()=>{
            if(sideNav.style.left == "-320px"){
                showSideNav();
            }else{
                hideSideNav();
            }
        }

        closeDrawer.onclick = ()=>{
            hideSideNav();
            closeDrawer.style.display = "none";
        }

        var initSideNav = ()=>{
            if(localStorage.getItem("side-bar-state") == null){
                localStorage.setItem("side-bar-state", "true");
            }

            if(localStorage.getItem("side-bar-state") == "true" && window.innerWidth > 1200){
                showSideNav();
            }else{
                hideSideNav();
            }
        }

        window.onresize = ()=>{
            console.log(sideNav.style.left)
            if (window.innerWidth > 1200 && sideNav.style.left == "0px"){
                bodyContainer.style.marginLeft = "280px";
                closeDrawer.style.display = "none";
            }else if(window.innerWidth < 1200 && sideNav.style.left == "0px"){
                bodyContainer.style.marginLeft = "0px";
                closeDrawer.style.display = "block";
            }
        }
        initSideNav();
    },[]);
    return (
        <div className="main-container">
            <div id="sidenav-id" className="side-nav">
            <div className="title-sec">EDEN <i id="close-drawer" className="fa fa-times"></i></div>
            <hr />
            <div className="side-nav-links">
                <div className="side-nav-link seller-name">Seller's Name</div>
                <hr />
                <div className="side-nav-link dashboard"><a href="/">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                <div className="side-nav-link stocks"><a href="/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                <div className="side-nav-link offers"><a className="active-side-link" href="/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                <div className="side-nav-link orders"><a href=""> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a href=""> <i className="fa fa-chart-line"></i> Reports</a></div>
            </div>
        </div>
        <div id="body-container">
            <div id="action-bar-id" className="action-bar">
                <div id="drawer-switch" style={{width: "fit-content"}}><i className="fa fa-bars"></i></div>
                <div className="title-profile">
                    <div className="page-title">Offers </div>
                    <div className="profile-photo">
                        <img width="100%"  src="" alt="" />
                    </div>
                </div>
            </div>
            <hr style={{border: "0", borderTop: "1px solid #6F62FC"}} />
            <div className="content-container">
                {/* Filters */}
                <div className="top-options-container">
                    <select name="" id="filter-drop">
                        <option value="">All Categories</option>
                        <option value="">Cats</option>
                        <option value="">Dogs</option>
                        <option value="">Birds</option>
                        <option value="">Hamsters</option>
                    </select>
                    <input type="search" placeholder="Search for items" />
                    <div className="date-filter">
                        <input type="date" className="from-date" /> to {' '}
                        <input type="date" className="to-date" />
                    </div>
                    <div className="new-item-btn">New Offer</div>
                </div>

                {/* Offer table */}
                <div className="stock-table-container">
                    <table className="stock-table table">
                        <thead>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Brand</th>
                            <th>Categories</th>
                            <th>Color</th>
                            <th>Last Update</th>
                            <th>Created On</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rice</td>
                                <td>Rs. 40</td>
                                <td>Rs. 549kg</td>
                                <td>BMB Brands</td>
                                <td>Dog, Cats</td>
                                <td>White</td>
                                <td>20-04-2021</td>
                                <td>20-04-2021</td>
                            </tr>
                            <tr>
                                <td>Rice</td>
                                <td>Rs. 40</td>
                                <td>Rs. 549kg</td>
                                <td>BMB Brands</td>
                                <td>Dog, Cats</td>
                                <td>White</td>
                                <td>20-04-2021</td>
                                <td>20-04-2021</td>
                            </tr>
                            <tr>
                                <td>Rice</td>
                                <td>Rs. 40</td>
                                <td>Rs. 549kg</td>
                                <td>BMB Brands</td>
                                <td>Dog, Cats</td>
                                <td>White</td>
                                <td>20-04-2021</td>
                                <td>20-04-2021</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
}


export default Offers;