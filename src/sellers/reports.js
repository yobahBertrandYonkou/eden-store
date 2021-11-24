import { useEffect } from 'react';
import './css/dashboard.css'
var Reports= ()=>{

    useEffect(()=>{
        // doc title
        document.title = "EDEN - Reports";

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
            if(sideNav.style.left === "-320px"){
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

            if(localStorage.getItem("side-bar-state") === "true" && window.innerWidth > 1200){
                showSideNav();
            }else{
                hideSideNav();
            }
        }

        window.onresize = ()=>{
            console.log(sideNav.style.left)
            if (window.innerWidth > 1200 && sideNav.style.left === "0px"){
                bodyContainer.style.marginLeft = "280px";
                closeDrawer.style.display = "none";
            }else if(window.innerWidth < 1200 && sideNav.style.left === "0px"){
                bodyContainer.style.marginLeft = "0px";
                closeDrawer.style.display = "block";
            }
        }
        initSideNav();


        // chart.js library
        // var chartLibrary = document.createElement("script");
        // chartLibrary.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js");
        // window.document.body.appendChild( chartLibrary );
        
        // handling chart
        var salesChartContext = document.getElementById("sales-canvas").getContext("2d");

        var salesChart = new window.Chart(salesChartContext, {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    type: "line",
                    label: "Sales",
                    data: [36781.0905, 58374.74, 22815.2085, 32766.216, 42503.3595, 42050.3055, 11573.982, 52101.782, 42074.672, 71178.514,51749.46, 99057.364],
                    borderColor: 'rgb(0,169,157)',
                    fill: false,
                    tension: 0.5
                },{
                type: "bar",
                label: "Orders",
                data: [1466, 1864, 2330, 1398,  5699, 1398, 2097, 2330,  7932, 10466, 19830, 40876],
                backgroundColor: 'rgb(51,122,183)',
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    y:{
                        beginAtZero: true
                    }
                }
            }
        });
        salesChart.draw();
        var salesChart2 = new window.Chart(document.getElementById("month-canvas").getContext("2d"), {
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30', 'Day 31'],
                datasets: [{
                    type: "line",
                    label: "Sales",
                    data: [36781.0905, 58374.74, 22815.2085, 32766.216, 42503.3595, 42050.3055, 11573.982, 52101.782, 36781.0905, 58374.74, 22815.2085, 32766.216, 42503.3595, 42050.3055, 11573.982, 52101.782, 42074.672, 71178.514,51749.46, 99057.364, 71178.514,51749.46, 99057.364, 52101.782, 42074.672, 71178.514,51749.46, 99057.364],
                    borderColor: 'rgb(0,169,157)',
                    fill: false,
                    tension: 0.5
                },{
                type: "bar",
                label: "Orders",
                data: [1466, 1864, 2330, 1398,  5699, 1398, 2097, 1864, 2330, 1398,  5699, 1398, 2097, 1864, 2330, 2330,  7932, 10466, 864, 2330, 2330,  7932, 19830, 40876, 1398,  5699, 1398, 2097, 1864, 49330],
                backgroundColor: 'rgb(51,122,183)',
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    y:{
                        beginAtZero: true
                    }
                }
            }
        });
        salesChart2.draw();
        var salesChart3 = new window.Chart(document.getElementById("week-canvas").getContext("2d"), {
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    type: "line",
                    label: "Sales",
                    data: [3781.0905, 5374.74, 2815.2085, 3766.216, 4503.3595, 4050.3055, 1573.982],
                    borderColor: 'rgb(0,169,157)',
                    fill: false,
                    tension: 0.5
                },{
                type: "bar",
                label: "Orders",
                data: [466, 864, 330, 398,  699, 398, 997],
                backgroundColor: 'rgb(51,122,183)',
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    y:{
                        beginAtZero: true
                    }
                }
            }
        });
        salesChart3.draw();

        // graphs
        var percentageStocksContext = document.getElementById("percentage-stocks").getContext("2d");
        var percentageStocksChart = new window.Chart(percentageStocksContext, {
        type: "doughnut",
        data: {
            labels: ['Cats', 'Dogs', 'Birds', 'Hamsters'],
            datasets: [{
                label: "Proportions of each animal category in total sales",
                data: [345, 634, 867, 123],
                backgroundColor: ['rgb(51,122,183)', 'rgb(226,142,65)', 'rgb(0,169,157)', 'rgb(217,83,79)']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
        
    });
    percentageStocksChart.draw();

    var percentageSalesContext = document.getElementById("percentage-sales").getContext("2d");
        var percentageSalesChart = new window.Chart(percentageSalesContext, {
            type: "doughnut",
            data: {
                labels: ['Cats', 'Dogs', 'Birds', 'Hamsters'],
                datasets: [{
                    label: "Proportions of each animal category in total sales",
                    data: [69092, 34521, 5634, 97243],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels:{
                        display: true,
                        color: "black",
                        formatter: (value) => {
                            return value + " %";
                        }
                    },
                }
            }
        });
        percentageSalesChart.draw();

        new window.Chart(document.getElementById("brand-sales").getContext("2d"), {
            type: "doughnut",
            data: {
                labels: ['Eukanuba', 'Purina', 'Hill\'s Pet Nutrition'],
                datasets: [{
                    label: "Proportions of each animal category in total sales",
                    data: [345, 634, 867],
                    backgroundColor: ['rgb(51,122,183)', 'rgb(226,142,65)', 'rgb(0,169,157)', 'rgb(217,83,79)']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
            
        });

        new window.Chart(document.getElementById("percentage-brand").getContext("2d"), {
            type: "pie",
            data: {
                labels: ['Eukanuba', 'Purina', 'Hill\'s Pet Nutrition'],
                datasets: [{
                    label: "Proportions of each animal category in total sales",
                    data: [69092, 34521, 5634],
                    backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels:{
                        display: true,
                        color: "black",
                        formatter: (value) => {
                            return value + " %";
                        }
                    },
                }
            }
        });
    },[]);
    return (
        <div className="main-container">
            <div id="sidenav-id" className="side-nav">
            <div className="title-sec">EDEN<i id="close-drawer" className="fa fa-times"></i></div>
            <hr />
            <div className="side-nav-links">
                <div className="side-nav-link seller-name">{ localStorage.getItem("eden-sl-user-store") }</div>
                <hr />
                <div className="side-nav-link dashboard"><a href="/seller/dashboard">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                <div className="side-nav-link stocks"><a href="/seller/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                <div className="side-nav-link offers"><a href="/seller/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                <div className="side-nav-link orders"><a href="/seller/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a className="active-side-link" href="/seller/reports"> <i className="fa fa-chart-line"></i> Reports</a></div>
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
                    {/* graph section */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 left-side row">
                                {/* sales graph */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales in a year</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400"  id="sales-canvas"></canvas>
                                    </div>
                                </div>
                                {/* sales graph */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales in a month</div>
                                        <div className="daily-stats-title">
                                            <select defaultValue="november" className="select-duration" name="sales" id="">
                                                <option value="october">October</option>
                                                <option value="november">November</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400"  id="month-canvas"></canvas>
                                    </div>
                                </div>
                                {/* sales graph */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales in a week</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400"  id="week-canvas"></canvas>
                                    </div>
                                </div>
                                {/* top selling categeries */}
                                <div className="daily-stats">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales in a week</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400"  id="week-canvas"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 right-side row">
                                        <div style={{ backgroundColor: "white" }} className="daily-stats recent-card">
                                            <div className="daily-stats-header">
                                                <div className="daily-stats-title">Sales per category</div>
                                                <div className="daily-stats-title">
                                                    {/* <select className="select-duration" name="sales" id="">
                                                        <option value="">Monthly</option>
                                                        <option value="">Weekly</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="stats-content sales-graph">
                                                <canvas height="400" id="percentage-sales"></canvas>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: "white" }} className="daily-stats recent-card">
                                            <div className="daily-stats-header">
                                                <div className="daily-stats-title">Stocks per category</div>
                                                <div className="daily-stats-title">
                                                    {/* <select className="select-duration" name="sales" id="">
                                                        <option value="">Monthly</option>
                                                        <option value="">Weekly</option>
                                                    </select> */}
                                                </div>
                                            </div>
                                            <div className="stats-content sales-graph">
                                                <canvas height="400" id="percentage-stocks"></canvas>
                                            </div>
                                        </div>
                                <div style={{ backgroundColor: "white" }} className="daily-stats recent-card">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales per brand</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400" id="brand-sales"></canvas>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "white" }} className="daily-stats recent-card">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Stocks per brand</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400" id="percentage-brand"></canvas>
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


export default Reports;