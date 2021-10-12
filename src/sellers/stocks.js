import { useEffect } from 'react';
import './css/dashboard.css'
var Stocks= ()=>{

    useEffect(()=>{
        var switcher = document.getElementById("drawer-switch");
        var closeDrawer = document.getElementById("close-drawer");
        var sideNav = document.getElementById("sidenav-id");
        var bodyContainer = document.getElementById("body-container");
        var actionBar = document.getElementById('action-bar-id');
        var addItemContainer = document.getElementById("add-item-main-container");
        var addItemBtn = document.getElementById("add-item-btn");
        var cancelEntry = document.getElementById("add-item-cancel-btn");
        var saveEntry = document.getElementById("add-item-save-btn");
        var tableBody = document.getElementById("table-body");

        /**
         * Handling context menu for stock item
         */
        
        tableBody.oncontextmenu = (event) => {
            // checking whether user has made a right click on the mouse
            if(event.button == 2){
                event.preventDefault();
                // ref to c-menu
                var cMenu = document.getElementById('c-menu');

                // closing any opened context menu
                cMenu.style.display = "none";

                // onclick record
                var clientX = event.clientX;
                var clientY = event.clientY;

                // positioning c-menu
                cMenu.style.transform = `translate(${clientX}px, ${clientY}px)`;

                // display c-menu
                cMenu.style.display = "block";

                // close menu on left click or wheel click
                document.onmouseup = (event) => {
                    if (event.button != 2){
                        cMenu.style.display = "none";
                    }
                }

                console.log(event);
                return false
            }
        }

        /*
           Using a websocket here to get realtime updates after
           adding new stocks to the database  
        */
        
        // establishing a connection
        var socket = new WebSocket("ws:localhost:9000/stocks");

        // sending data to retrive data
        socket.onopen = (event)=>{
            console.log(socket.readyState);
            socket.send("Connected");
        }
        
        // receives data each time the database is updated
        socket.onmessage = (dataString)=>{
            /**
             * data is sent in string format
             * so it has to be converted to json using JSON.parse(str)
             */
            var data = JSON.parse(dataString.data);
            console.log(data)
            // reseting table body content
            tableBody.innerHTML = "";

                // publising data to table body
                data.data.forEach( doc => {
                    console.log(doc);

                    // updating table
                    tableBody.insertAdjacentHTML('afterbegin', 
                        `
                            <tr title="Right Click for more options." id="${doc.id}">
                                <td>${doc.name}</td>
                                <td>${doc.price}</td>
                                <td>${doc.quantity} ${doc.unit}</td>
                                <td>${doc.brand}</td>
                                <td>${doc.category.toString().toUpperCase()}</td>
                                <td>${doc.color}</td>
                                <td>${new Date(doc.updatedOn._seconds * 1000).toDateString()}</td>
                                <td>${new Date(doc.createdOn._seconds * 1000).toDateString()}</td>
                            </tr>
                        `
                    );
                });
        };

        // closing socket connection when user leaves page
        document.onclose = () =>{
            socket.close();
        }        

        // Add item
        addItemBtn.onclick = ()=>{
            addItemContainer.style.display = "flex";
        }

        // save item
        saveEntry.onclick = async (event)=>{

            //validation
            var temp = [
                document.getElementById("name").value.trim(),
                document.getElementById("price").value.trim(),
                document.getElementById("quantity").value.trim(),
                document.getElementById("description").value.trim()
            ]

            if (temp.includes("")){
                alert("All fields required");
                return
            }

            // data to be sent
            var data = {
                "id": null,
                "sellerId": "DSErqrq545dsDh",
                "name": document.getElementById("name").value.trim(),
                "quantity": parseFloat(document.getElementById("quantity").value.trim()),
                "price": parseFloat(document.getElementById("price").value.trim()),
                "description": document.getElementById("description").value.trim(),
                "color": document.getElementById("color").value.trim(),
                "unit": document.getElementById("unit").value.trim(),
                "category": document.getElementById("category").value.trim(),
                "brand": document.getElementById("brand").value.trim(),
                "createdOn": null,
                "updatedOn": null,
                "rating": null
            }

            // endpoint
            var url = "http://localhost:9000/stocks"
            var method = "POST"

            // posting data
            await fetch(url,{
                method: method,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                // LoadData();
            })
            .catch(error=>console.log(error));

        }

        cancelEntry.onclick = ()=>{
            // if(window.confirm("Your progress will not be saved.\nContinue?")){
            //     addItemContainer.style.display = "none";
            // }
            addItemContainer.style.display = "none";
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
            <div className="title-sec">PETBIOS <i id="close-drawer" className="fa fa-times"></i></div>
            <hr />
            <div className="side-nav-links">
                <div className="side-nav-link seller-name">Seller's Name</div>
                <hr />
                <div className="side-nav-link dashboard"><a href="/">  <i className="fa fa-tachometer-alt"></i> Dashboard</a></div>
                <div className="side-nav-link stocks"><a className="active-side-link"  href="/stocks"> <i className="fa fa-layer-group"></i> Stocks</a></div>
                <div className="side-nav-link offers"><a href="/offers"> <i className="far fa-gifts"></i> Offers</a></div>
                <div className="side-nav-link orders"><a href="/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a href="/reports"> <i className="fa fa-chart-line"></i> Reports</a></div>
            </div>
        </div>
        <div id="body-container">
            <div id="action-bar-id" className="action-bar">
                <div id="drawer-switch" style={{width: "fit-content"}}><i className="fa fa-bars"></i></div>
                <div className="title-profile">
                    <div className="page-title">Stocks </div>
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
                    <div id="add-item-btn" className="new-item-btn">New Stock</div>
                </div>

                {/* stock table */}
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
                        {/* stock items */}
                        <tbody id="table-body"></tbody>
                    </table>
                </div>
            </div>
        </div>
        {/* Add new item */}
        <div id="add-item-main-container" className="add-item-dark-container">
                <form id="stock-form" method="POST">
                    <div className="add-item-container">
                        <div className="add-item-header">New Stock</div>
                        <div className="container">
                            <div className="row">
                                <div className="add-item-left-container col-md-6">
                                    <div style={{margin: 0}} className="form-group col-12 add-item-labels">
                                        <label htmlFor="name">Product Name</label>
                                        <input id="name" type="text" className="form-control" required/>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="price">Price  (₹)</label>
                                            <input id="price" type="number" min="1" className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="color">Color</label>
                                            <select name="color" id="color" className="form-control" required>
                                                <option value="red" selected>Red</option>
                                                <option value="white">White</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="quantity">Quantity</label>
                                            <input id="quantity" type="number" min="1" className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="unit">Unit</label>
                                            <select name="unit" id="unit" className="form-control" required>
                                                <option value="kg" selected>kg</option>
                                                <option value="pounds">Pounds</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="category">Category</label>
                                            <select name="category" id="category" className="form-control" required>
                                                <option value="all" selected>All Categories</option>
                                                <option value="cats">Cats</option>
                                                <option value="dogs">Dogs</option>
                                                <option value="birds">Birds</option>
                                                <option value="hamsters">Hamsters</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="brand">Brand</label>
                                            <select name="brand" id="brand" className="form-control" required>
                                                <option value="eukanuba">Eukanuba</option>
                                                <option value="purina">Purina</option>
                                                <option value="hillspet">Hill's Pet Nutrition</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-12 add-item-labels">
                                        <label htmlFor="description">Description</label>
                                        <textarea id="description" rows="7" className="form-control" required></textarea>
                                    </div>
                                </div>
                                <div className="add-item-right-container col-md-6">
                                    <div className="item-photos-top">
                                        <div className="title">Photos</div>
                                        <div className="add-photo">Add Photo</div>
                                    </div>
                                    <div className="item-photos-container"></div>
                                </div>
                            </div>
                        </div>
                        <div className="add-item-buttons">
                            <button type="button" id="add-item-cancel-btn" className="add-item-cancel">Cancel</button>
                            <button type="button" id="add-item-save-btn" className="add-item-save">Save</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Context menu */}
            <div id="c-menu" className="context-menu-container">
                <div className="cm-option"><i style={{color: "white"}} className="fas fa-trash-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Delete</div>
                <div className="cm-option"><i style={{color: "white"}} className="fas fa-pen-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Update</div>
                <div className="cm-option"><i style={{color: "white"}} className="fas fa-ellipsis-h"></i>&nbsp;&nbsp;&nbsp;&nbsp; Details</div>
            </div>
        </div>
    );
}


export default Stocks;