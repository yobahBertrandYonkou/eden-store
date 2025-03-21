import { useEffect } from 'react';
import './css/dashboard.css'
var Dashboard = () => {

    useEffect(() => {
        // doc title
        document.title = "EDEN - Dashboard";

        var switcher = document.getElementById("drawer-switch");
        var closeDrawer = document.getElementById("close-drawer");
        var sideNav = document.getElementById("sidenav-id");
        var bodyContainer = document.getElementById("body-container");
        var actionBar = document.getElementById('action-bar-id');

        // get daily stats
        fetch("http://localhost:9000/stats/daily/" + localStorage.getItem("eden-sl-user-uid"))
            .then(response => response.json())
            .then(totals => {
                console.log(totals);
                document.querySelector(".daily-order").textContent = totals.totalOrders;
                document.querySelector(".daily-sales").textContent = totals.totalSales;
                document.querySelector(".daily-delivery").textContent = totals.totalDeliveries;
            }).catch(error => console.log(error));

        // get totals
        fetch("http://localhost:9000/stats/totals")
            .then(response => response.json())
            .then(totals => {
                console.log(totals);
                document.querySelector(".total-offers").textContent = totals.offers;
                document.querySelector(".deliveries").textContent = totals.deliveries;
                document.querySelector(".total-orders").textContent = totals.orders;
                document.querySelector(".total-stocks").textContent = totals.stocks;
                document.querySelector(".active-offers").textContent = totals.activeOffers;
                document.querySelector(".total-sales").textContent = totals.totalSales;

                if (window.Chart.getChart("percentage-stocks") === undefined) {
                    // graphs
                    var percentageStocksContext = document.getElementById("percentage-stocks").getContext("2d");
                    var percentageStocksChart = new window.Chart(percentageStocksContext, {
                        type: "doughnut",
                        data: {
                            labels: Object.keys(totals.frequecies),
                            datasets: [{
                                label: "Proportions of each animal category in total sales",
                                data: Object.values(totals.frequecies),
                                backgroundColor: ['rgb(51,122,183)', 'rgb(226,142,65)', 'rgb(0,169,157)', 'rgb(217,83,79)']
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                        }

                    });
                    percentageStocksChart.draw();
                }

                if (window.Chart.getChart("percentage-sales") === undefined) {
                    var percentageSalesContext = document.getElementById("percentage-sales").getContext("2d");
                var percentageSalesChart = new window.Chart(percentageSalesContext, {
                    type: "doughnut",
                    data: {
                        labels: Object.keys(totals.orderPercentages),
                        datasets: [{
                            label: "Proportions of each animal category in total sales",
                            data: Object.values(totals.orderPercentages),
                            backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
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
                }
            }).catch(error => console.log(error));

        // recent orders
        fetch("http://localhost:9000/stats/recent/orders/" + localStorage.getItem("eden-sl-user-uid"))
            .then(response => response.json())
            .then(orders => {
                console.log(orders);
                if (orders.orders.length === 0) {
                    document.querySelector(".recent-orders").insertAdjacentHTML("afterbegin",
                        `<div style="display: flex; justify-content: center; align-items: center;" className="recent-item">No Orders</div>`)
                }
                orders.orders.forEach(productDetails => {
                    var priceHTML;
                    if (productDetails.hasOffer) {
                        priceHTML = `<div style="font-size: 12px;" className="item-price">Price: Rs. ${productDetails.offerPrice.toFixed(2)}</div>`;
                    } else {
                        priceHTML = `<div style="font-size: 12px;" className="item-price">Price: Rs. ${(productDetails.price * productDetails.quantityNeeded) - (productDetails.price * productDetails.quantityNeeded * productDetails.discount / 100)} <span style={{fontSize: "11px"}}>(${productDetails.discount}% off)</span></div>`;
                    }

                    document.querySelector(".recent-orders").insertAdjacentHTML("afterbegin",
                        `
                <div style="color: white; border-top: 1px solid white; display: flex; align-items: center; padding: 5px" className="col-12 recent-item" id=card-${productDetails.id}>
                    <img width="56px" height="56px" style="object-fit: contain; margin-right: 10px; margin-top: 7px" src="${productDetails.photoUrl}" alt="${productDetails.id}" />
                    <div className="item-details">
                        <div style="font-size: 12px;" className="item-title">${productDetails.name} (${productDetails.quantity} ${productDetails.unit})</div>
                        ${priceHTML}
                        <div style="font-size: 12px;" className="item-category">${productDetails.category} accessories</div>
                        <div style="font-size: 12px;" className="item-quantity">Quantity: ${productDetails.quantityNeeded} <br>Date: ${new Date(productDetails.timeStamp._seconds * 1000).toDateString()} ${new Date(productDetails.timeStamp._seconds * 1000).toLocaleTimeString()}</div>
                    </div>
                </div>
                `);

                });
            })
            .catch(error => console.log(error));

        // top 10 selling items
        fetch("http://localhost:9000/stats/products/topselling/" + localStorage.getItem("eden-sl-user-uid"))
            .then(response => response.json())
            .then(products => {
                console.log(products);
                if (products.products.length === 0) {
                    document.querySelector(".top-selling-items").insertAdjacentHTML("afterbegin",
                        `<div style="display: flex; justify-content: center; align-items: center;" className="recent-item">No Orders</div>`)
                }
                products.products.forEach(productDetails => {
                    document.querySelector(".top-selling-items").insertAdjacentHTML("afterbegin",
                        `
                <div style="color: white; border-top: 1px solid white; display: flex; align-items: center; padding: 5px" className="col-12 recent-item" id=card-${productDetails.id}>
                    <img width="56px" height="56px" style="object-fit: contain; margin-right: 10px; margin-top: 7px" src="${productDetails.photoUrls["photo-1"]}" alt="${productDetails.id}" />
                    <div className="item-details">
                        <div style="font-size: 12px;" className="item-title">${productDetails.name} (${productDetails.quantity} ${productDetails.unit})</div>
                        <div style="font-size: 12px;" className="item-price">Price: Rs. ${productDetails.price - (productDetails.price * productDetails.discount / 100)} <span style={{fontSize: "11px"}}>(${productDetails.discount}% off)</span></div>
                        <div style="font-size: 12px;" className="item-category">${productDetails.category} accessories</div>
                        <div style="font-size: 12px;" className="item-category">Purchases: ${productDetails.purchases}</div>
                    </div>
                </div>
                `);

                });
            })
            .catch(error => console.log(error));


        var showSideNav = () => {
            closeDrawer.style.display = "block";
            sideNav.style.left = 0;
            actionBar.style.boxShadow = "none";
            actionBar.style.backgroundColor = "transparent";
            localStorage.setItem("side-bar-state", "true");
            if (window.innerWidth > 1200) {
                bodyContainer.style.marginLeft = "280px";
                closeDrawer.style.display = "none";
            }
        }

        var hideSideNav = () => {
            sideNav.style.left = "-320px";
            bodyContainer.style.marginLeft = "0px"
            actionBar.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.16)";
            actionBar.style.backgroundColor = "white";
            localStorage.setItem("side-bar-state", "false");
        }
        switcher.onclick = () => {
            if (sideNav.style.left === "-320px") {
                showSideNav();
            } else {
                hideSideNav();
            }
        }

        closeDrawer.onclick = () => {
            hideSideNav();
            closeDrawer.style.display = "none";
        }

        var initSideNav = () => {
            if (localStorage.getItem("side-bar-state") == null) {
                localStorage.setItem("side-bar-state", "true");
            }

            if (localStorage.getItem("side-bar-state") === "true" && window.innerWidth > 1200) {
                showSideNav();
            } else {
                hideSideNav();
            }
        }

        window.onresize = () => {
            console.log(sideNav.style.left)
            if (window.innerWidth > 1200 && sideNav.style.left === "0px") {
                bodyContainer.style.marginLeft = "280px";
                closeDrawer.style.display = "none";
            } else if (window.innerWidth < 1200 && sideNav.style.left === "0px") {
                bodyContainer.style.marginLeft = "0px";
                closeDrawer.style.display = "block";
            }
        }
        initSideNav();


        // chart.js library
        // var chartLibrary = document.createElement("script");
        // chartLibrary.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js");
        // window.document.body.appendChild( chartLibrary );

        if (window.Chart.getChart("sales-canvas") === undefined) {
            // handling chart
            var salesChartContext = document.getElementById("sales-canvas").getContext("2d");

            var salesChart = new window.Chart(salesChartContext, {
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        type: "line",
                        label: "Sales",
                        data: [36781.0905, 58374.74, 22815.2085, 32766.216, 42503.3595, 42050.3055, 11573.982, 52101.782, 42074.672, 71178.514, 51749.46, 99057.364],
                        borderColor: 'rgb(0,169,157)',
                        fill: false,
                        tension: 0.5
                    }, {
                        type: "bar",
                        label: "Orders",
                        data: [1466, 1864, 2330, 1398, 5699, 1398, 2097, 2330, 7932, 10466, 19830, 40876],
                        backgroundColor: 'rgb(51,122,183)',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            salesChart.draw();
        }
    }, []);
    return (
        <div className="main-container">
            <div id="sidenav-id" className="side-nav">
                <div className="title-sec">EDEN<i id="close-drawer" className="fa fa-times"></i></div>
                <hr />
                <div className="side-nav-links">
                    <div className="side-nav-link seller-name">{localStorage.getItem("eden-sl-user-store")}</div>
                    <hr />
                    <div className="side-nav-link dashboard"><a className="active-side-link" href="/seller/dashboard">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                    <div className="side-nav-link stocks"><a href="/seller/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                    <div className="side-nav-link offers"><a href="/seller/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                    <div className="side-nav-link orders"><a href="/seller/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                    <div className="side-nav-link reports"><a href="/seller/reports"> <i className="fa fa-chart-line"></i> Reports</a></div>
                </div>
            </div>
            <div id="body-container">
                <div id="action-bar-id" className="action-bar">
                    <div id="drawer-switch" style={{ width: "fit-content" }}><i className="fa fa-bars"></i></div>
                    <div className="title-profile">
                        <div className="page-title">Reports </div>
                        <div className="profile-photo">
                            <div className="logout-seller fa fa-shopping-cart" onClick={() => window.open("/accessories/home", "_blank")}></div>
                            <div title="Log out of your account" className="logout-seller fa fa-sign-out-alt" onClick={() => {
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
                <hr style={{ border: "0", borderTop: "1px solid #6F62FC" }} />
                <div className="content-container dashboard-content-container">

                    <div className="top-stats-bar">
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-cubes"></div>
                            <div className="stats-values">
                                <div className="stats-value total-orders">00</div>
                                <div className="stats-name">Total Orders</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-truck"></div>
                            <div className="stats-values">
                                <div className="stats-value deliveries">00</div>
                                <div className="stats-name">Total Deliveries</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-rupee-sign"></div>
                            <div className="stats-values">
                                <div className="stats-value total-sales">00</div>
                                <div className="stats-name">Total Sales</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-coins"></div>
                            <div className="stats-values">
                                <div className="stats-value">00</div>
                                <div className="stats-name">Gross Sales</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-users"></div>
                            <div className="stats-values">
                                <div className="stats-value"> {localStorage.getItem("eden-sl-customer-count")}</div>
                                <div className="stats-name">Total Customers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-layer-group"></div>
                            <div className="stats-values">
                                <div className="stats-value total-stocks">00</div>
                                <div className="stats-name">Total Stock</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon far fa-hourglass"></div>
                            <div className="stats-values">
                                <div className="stats-value">00</div>
                                <div className="stats-name">Out of Stock</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-gifts"></div>
                            <div className="stats-values">
                                <div className="stats-value total-offers">00</div>
                                <div className="stats-name">Total Offers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-gift"></div>
                            <div className="stats-values">
                                <div className="stats-value active-offers">00</div>
                                <div className="stats-name">Active Offers</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                        {/* Stats card */}
                        <div className="stats-card">
                            <div className="stats-icon fa fa-search"></div>
                            <div className="stats-values">
                                <div className="stats-value">{localStorage.getItem("eden-sl-search-count")}</div>
                                <div className="stats-name">Searches</div>
                            </div>
                        </div>
                        {/* Stats ends */}
                    </div>
                    {/* graph section */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 left-side">
                                <div className="daily-stats col-12">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Daily Statistics</div>
                                        <div className="daily-stats-title">{new Date().toDateString()}</div>
                                    </div>
                                    <div className="stats-content">
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total orders for today</div>
                                            <div className="stats-value today-stats-value daily-order">00</div>
                                        </div>
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total deliveries for today</div>
                                            <div className="stats-value today-stats-value daily-delivery">00</div>
                                        </div>
                                        {/* today stats card */}
                                        <div className="stats-card today-stats-card">
                                            <div className="stats-name today-stats-name">Total sales for today</div>
                                            <div className="stats-value today-stats-value daily-sales">00</div>
                                        </div>
                                    </div>
                                </div>
                                {/* sales graph */}
                                <div className="daily-stats col-12">
                                    <div className="daily-stats-header">
                                        <div className="daily-stats-title">Sales graphs</div>
                                        <div className="daily-stats-title">
                                            {/* <select className="select-duration" name="sales" id="">
                                                <option value="">Monthly</option>
                                                <option value="">Weekly</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div className="stats-content sales-graph">
                                        <canvas height="400" id="sales-canvas"></canvas>
                                    </div>
                                </div>
                                {/* top selling categeries */}
                                <div className="container-fluid">
                                    <div className="row">
                                        <div style={{ paddingLeft: 0 }} className="col-md-6">
                                            <div className="daily-stats">
                                                <div className="daily-stats-header">
                                                    <div className="daily-stats-title">Percentage sale per category</div>
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
                                        </div>
                                        <div style={{ paddingRight: 0 }} className="col-md-6">
                                            <div className="daily-stats">
                                                <div className="daily-stats-header">
                                                    <div className="daily-stats-title">Percentage stocked per category</div>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 right-side">
                                <div className="recent-card col-12" >
                                    <div className="recent-title">Recent Orders</div>
                                    <div className="recent-content recent-orders">
                                    </div>
                                </div>
                                <div className="top-selling recent-card col-12" >
                                    <div className="recent-title">Top 10 selling products</div>
                                    <div className="recent-content top-selling-items">
                                        {/* <div className="ts-item"></div>
                                        <div className="ts-item"></div>
                                        <div className="ts-item"></div> */}
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