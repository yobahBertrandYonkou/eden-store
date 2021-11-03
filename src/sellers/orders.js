/* eslint-disable eqeqeq */
import { useEffect } from 'react';
import { useFetchAll } from '../petaccessories/hooks/useFetch';
import './css/dashboard.css'
import imgPreviewHolder from "./images/preview-image.png"
import imgUploadHolder from "./images/upload-image.png"

var Orders= ()=>{
    // const { data: pendingOrders, isLoading, hasData } = useFetchAll("http://localhost:9000/orders", "pending", localStorage.getItem("eden-seller-user-uid"));
    useEffect(()=>{
        var switcher = document.getElementById("drawer-switch");
        var closeDrawer = document.getElementById("close-drawer");
        var sideNav = document.getElementById("sidenav-id");
        var bodyContainer = document.getElementById("body-container");
        var actionBar = document.getElementById('action-bar-id');
        var tableBody = document.getElementById("table-body");
        var stkCategory = document.getElementById('filter-drop');
        var stkFrom = document.getElementById('from-date');
        var stkTo = document.getElementById('to-date');
        var stkSearch = document.getElementById('stk-search');
        var photoPreview = document.getElementById('photo-preview');
        var pdtPhotos = document.querySelectorAll(".photo-thumbnail");
        var currentAction = null;
        var selectedItemForProcessing = null;
        var categories = document.querySelectorAll('.category-item');
        var catView = document.getElementById("category");

        categories.forEach( category => {
            category.onchange = (event) => {
                if (catView.textContent == "...") catView.textContent = "";
                console.log(event);
                if (event.target.value == "all"){
                    catView.textContent = "Cats, Dogs, Birds, Hamsters";

                    categories.forEach( category => {
                        category.checked = event.target.checked;
                    });

                    if(!event.target.checked){
                        catView.textContent = "..."
                    }
                }else{
                    var allCat = document.getElementById("all");
                    allCat.checked = false;
                    var contentStr = "";

                    categories.forEach(cat => {
                        if (cat.checked) contentStr += cat.value.substring(0,1).toUpperCase() 
                        + cat.value.slice(1) + ", ";
                    });

                    if (contentStr == "") contentStr = "...";
                    contentStr = contentStr.split(", ").slice(0, -1);
                    
                    if (contentStr.length == 4) allCat.checked = true;
                    contentStr = contentStr.join(", "); 
                    catView.textContent = contentStr;
                }
            }
        });

        
        /**
         * Handling context menu for stock item
         */
        
        tableBody.oncontextmenu = (itemEvent) => {
            // checking whether user has made a right click on the mouse
            if(itemEvent.button == 2){
                itemEvent.preventDefault();
                
                // clear selected item 
                for (var index = 0; index < tableBody.childElementCount; index++ ){
                    tableBody.children[index].style.backgroundColor = "white";
                }

                // making sure a table data was clicked
                if (itemEvent.target.nodeName.toString() != "TD"){
                    return
                }

                // gets item id
                // console.log(itemEvent.path[1])
                var selectedItem = itemEvent.path[1];
                selectedItem.style.backgroundColor = "rgba(106,121,183, 0.3)";
                selectedItemForProcessing = selectedItem;
                // ref to c-menu
                var cMenu = document.getElementById('c-menu');

                // closing any opened context menu
                cMenu.style.display = "none";

                // onclick record
                var clientX = itemEvent.clientX;
                var clientY = itemEvent.clientY;

                // positioning c-menu
                cMenu.style.transform = `translate(${clientX}px, ${clientY}px)`;

                // display c-menu
                cMenu.style.display = "block";

                // handler for no stocks displayed
                if (selectedItem.id.toString() == "no-stocks-msg"){
                    cMenu.style.display = "none";
                }

                // close menu on left click or wheel click
                window.onmouseup = (event) => {
                    if (event.button != 2){
                        cMenu.style.display = "none";

                        // clear selected item 
                        for (var index = 0; index < tableBody.childElementCount; index++ ){
                            tableBody.children[index].style.backgroundColor = "white";
                        }
                    }
                }
                
                // listeners for each menu item
                cMenu.onclick = async (cEvent) => {
                    // console.log(cEvent.target.id)
                    var cMenuOptionId = cEvent.target.id;

                    if(cMenuOptionId == "cm-delete"){
                        currentAction = "delete";
                        // deleting item
                        await fetch("http://localhost:9000/stocks",{
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({id: selectedItem.id.toString()})
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response)
                            document.querySelector('.show-notification').innerHTML = (
                                `<div class="alert alert-danger alert-dismissible" role="alert">
                                Item deleted Successfully.
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                                </div>`
                            );
            
                            setTimeout(() => {
                                document.querySelector('.show-notification').innerHTML = "";
                            }, 2000);
                        })
                        .catch(error => console.log(error));
                    }
                }

                return false
            }
        }

        // loading data
        fetch("http://localhost:9000/orders/pending/" + localStorage.getItem("eden-sl-user-uid"))
        .then( response => response.json())
        .then( response => {
            var data = response.orders;
            console.log(data)
            // reseting table body content
            tableBody.innerHTML = "";

            if(data.length == 0){
                console.log("No data");
                tableBody.innerHTML = `<tr id="no-stocks-msg" style="border: none;"><td colspan="8" style="border: none; padding-top: 30px; text-align: center">No stocks</td></tr>`;
            }

                // publising data to table body
                data.forEach( doc => {
                    var totalCostElement;
                    if(doc.hasOffer){
                        totalCostElement = `<td>Rs. ${doc.offerPrice}</td>`;
                    }else{
                        totalCostElement = `<td>Rs. ${ (doc.price * doc.quantityNeeded - ((doc.price * doc.quantityNeeded) * doc.discount / 100)).toFixed(2) }</td>`;
                    }

                    // updating table   
                    tableBody.insertAdjacentHTML('afterbegin', 
                        `
                            <tr title="Right Click for more options." id="${doc.orderId}">
                                <td>${ doc.orderId }</td>
                                <td>${new Date(doc.timeStamp._seconds * 1000).toDateString()} ${new Date(doc.timeStamp._seconds * 1000).toLocaleTimeString()}</td>
                                <td title="${ doc.name }">${doc.name.substring(0, 25)}...</td>
                                <td title="${ doc.shippingAddress }">${doc.shippingAddress.substring(0, 25)}...</td>
                                ${ totalCostElement }
                                <td>${doc.status}</td>
                            </tr>
                        `
                    );
                });
        })
        .catch( error => console.log(error));

        // filtering
        stkCategory.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);

        }

        stkFrom.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);
            // set min date and of "to" to selected date of from
            // current date will be changed if current is less than min date
            stkTo.setAttribute("min", stkFrom.value);

            if(stkFrom.value > stkTo.value){
                stkTo.value = stkFrom.value;
            }
            
            // sending prameters to socket (server)
        }

        stkTo.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);
        }

        stkSearch.onkeyup = (event) => {
            var acceptedChars = ['backspace', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', ' ']
            console.log(event.code.toString() == "Backspace")
            
            if(acceptedChars.includes(event.key.toString()) || event.code.toString() == "Backspace"){
            }
        }
        

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
                <div className="side-nav-link seller-name">{ localStorage.getItem("eden-sl-user-store") }</div>
                <hr />
                <div className="side-nav-link dashboard"><a href="/seller/">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                <div className="side-nav-link stocks"><a href="/seller/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                <div className="side-nav-link offers"><a href="/seller/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                <div className="side-nav-link orders"><a className="active-side-link"  href="/seller/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a href="/seller/reports"> <i className="fa fa-chart-line"></i> Reports</a></div>
            </div>
        </div>
        <div id="body-container">
            <div id="action-bar-id" className="action-bar">
                <div id="drawer-switch" style={{width: "fit-content"}}><i className="fa fa-bars"></i></div>
                <div className="title-profile">
                    <div className="page-title">Orders </div>
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
            <div className="content-container">
                {/* Filters */}
                <div className="top-options-container">
                    <select name="" id="filter-drop">
                        <option value="all">All Categories</option>
                        <option value="cats">Cats</option>
                        <option value="dogs">Dogs</option>
                        <option value="birds">Birds</option>
                        <option value="hamsters">Hamsters</option>
                    </select>
                    <input id="stk-search" type="search" placeholder="Search for items name" />
                    <div className="date-filter">
                        <input id="from-date" type="date" className="from-date" /> to {' '}
                        <input id="to-date" type="date" className="to-date" />
                    </div>
                </div>

                {/* stock table */}
                <div className="stock-table-container">
                    <table className="stock-table table">
                        <thead>
                            <tr className="table-header-tr">
                                <th>ID</th>
                                <th>Time</th>
                                <th>Item</th>
                                <th>Shipping address</th>
                                <th>Total cost</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {/* stock items */}
                        <tbody id="table-body"></tbody>
                    </table>
                </div>
            </div>
        </div>
            {/* Context menu */}
            <div id="c-menu" className="context-menu-container">
                <div id="cm-delete" className="cm-option"><i style={{color: "white"}} className="fas fa-trash-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Delete</div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%", zIndex: 100}} className="show-notification"></div>
        </div>
    );
}


export default Orders;