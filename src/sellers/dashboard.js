import { useEffect } from 'react';
import './css/dashboard.css'
var Dashboard= ()=>{

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
            <div className="title-sec">EDEN<i id="close-drawer" className="fa fa-times"></i></div>
            <hr />
            <div className="side-nav-links">
                <div className="side-nav-link seller-name">{ localStorage.getItem("eden-sl-user-store") }</div>
                <hr />
                <div className="side-nav-link dashboard"><a className="active-side-link" href="/seller/dashboard">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                <div className="side-nav-link stocks"><a href="/seller/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                <div className="side-nav-link offers"><a href="/seller/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                <div className="side-nav-link orders"><a href="/seller/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a href=""> <i className="fa fa-chart-line"></i> Reports</a></div>
            </div>
            </div>
            <div id="body-container">
                <div id="action-bar-id" className="action-bar">
                    <div id="drawer-switch" style={{width: "fit-content"}}><i className="fa fa-bars"></i></div>
                    <div className="title-profile">
                        <div className="page-title">Dashboard </div>
                        <div className="profile-photo">
                            <div className="logout-seller fa fa-shopping-cart" onClick = { () => window.open("/accessories/home", "_blank")}></div>
                            <div title="Log out of your account" className="logout-seller fa fa-sign-out-alt" onClick = { () => {
                                localStorage.removeItem("eden-sl-user-store");
                                localStorage.removeItem("eden-sl-user-email");
                                localStorage.removeItem("eden-sl-user-uid");
                                localStorage.setItem("eden-sl-user-logged-in", "false");
                                localStorage.removeItem("eden-pa-user-name");
                                localStorage.removeItem("eden-pa-user-email");
                                localStorage.removeItem("eden-pa-user-uid");
                                localStorage.removeItem("eden-pa-user-photo");
                                localStorage.setItem("eden-pa-user-logged-in", "false");
                                window.location = "/seller/signin";
                            }}></div>
                    </div>
                    </div>
                </div>
                <hr style={{border: "0", borderTop: "1px solid #6F62FC"}} />
                <div className="content-container dashboard-content-container">
                    
                    <div className="top-stats-bar">
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-cubes"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Items Sold</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-truck"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Deliveries</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-rupee-sign"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Sales</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-coins"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Gross Sales</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-users"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Customers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-layer-group"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Stock</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon far fa-hourglass"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Out of Stock</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-gifts"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Total Offers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-gift"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Active Offers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-search"></div>
                            <div className="stats-values">
                                <div className="stats-value">4</div>
                                <div className="stats-name">Searches</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                    </div>
                    {/* graph section */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 left-side row">
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Daily Statistics</div>
                                        <div className="daily-stats-title">12-09-2021</div>
                                    </div>
                                    <div className="stats-content">
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total sales for today</div>
                                            <div className="stats-value today-stats-value">4</div>
                                        </div>
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total sales for today</div>
                                            <div className="stats-value today-stats-value">4</div>
                                        </div>
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total sales for today</div>
                                            <div className="stats-value today-stats-value">4</div>
                                        </div>
                                    </div>
                                </div>
                                {/* sales graph */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales graphs</div>
                                        <div className="daily-stats-title">
                                            <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        
                                    </div>
                                </div>
                                {/* top selling categeries */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Top selling categories</div>
                                        <div className="daily-stats-title">
                                            <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 right-side row">
                                <div className="recent-card" >
                                    <div className="recent-title">Recent Orders</div>
                                    <div className="recent-content">
                                        <div className="recent-item"></div>
                                        <div className="recent-item"></div>
                                        <div className="recent-item"></div>
                                    </div>
                                </div>
                                <div className="top-selling recent-card" >
                                    <div className="recent-title">Top 10 selling products</div>
                                    <div className="recent-content">
                                        <div className="ts-item"></div>
                                        <div className="ts-item"></div>
                                        <div className="ts-item"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Dashboard;