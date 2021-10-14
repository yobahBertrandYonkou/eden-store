/* eslint-disable eqeqeq */
import { useEffect } from 'react';
import './css/dashboard.css'
import imgPreviewHolder from "./images/preview-image.png"
import imgUploadHolder from "./images/upload-image.png"

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
        var stkCategory = document.getElementById('filter-drop');
        var stkFrom = document.getElementById('from-date');
        var stkTo = document.getElementById('to-date');
        var stkSearch = document.getElementById('stk-search');
        var photoPreview = document.getElementById('photo-preview');
        var pdtPhotos = document.querySelectorAll(".photo-thumbnail");
        var currentAction = null;
        var selectedItemForProcessing = null;

        var clearForm = () => {
            // clearing fields
            addItemContainer.querySelector("#name").value = "";
            addItemContainer.querySelector("#quantity").value = "";
            addItemContainer.querySelector("#price").value = "";
            addItemContainer.querySelector("#description").value = "";
            addItemContainer.querySelector("#color").selectedIndex = 0;
            addItemContainer.querySelector("#unit").selectedIndex = 0;
            addItemContainer.querySelector("#category").selectedIndex = 0;
            addItemContainer.querySelector("#brand").selectedIndex = 0;
            // removing upload btn from thumbnails
            pdtPhotos.forEach( thumbnail => {
                thumbnail.src = imgUploadHolder;
                document.getElementById(thumbnail.id.replace("-th", "")).value = "";
            });

            photoPreview.src = imgPreviewHolder;
        };
        
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
                        .then(response => console.log(response))
                        .catch(error => console.log(error));
                    }else if(cMenuOptionId == "cm-edit"){
                        await fetch(`http://localhost:9000/stocks/${selectedItem.id.toString()}`)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            // getting ref of all fields
                            var fields = {
                                "name": addItemContainer.querySelector("#name"),
                                "quantity": addItemContainer.querySelector("#quantity"),
                                "price": addItemContainer.querySelector("#price"),
                                "description": addItemContainer.querySelector("#description"),
                                "color": addItemContainer.querySelector("#color"),
                                "unit": addItemContainer.querySelector("#unit"),
                                "category": addItemContainer.querySelector("#category"),
                                "brand": addItemContainer.querySelector("#brand"),
                            }
                            
                            console.log(typeof addItemContainer.querySelector(".add-item-header").textContent.trim())
                           
                            // loading data for input controls
                            for (var field in fields){
                                fields[field].value = response[field];
                            }
                            
                            // loading images
                            var images = response['photoUrls'];

                            for(var image in images){
                                var thElement = addItemContainer.querySelector(`#${image.replace("-", "-th-")}`);
                                thElement.src = images[image];
                            }
                            
                            // triggering add stock
                            addItemContainer.querySelector(".add-item-header").textContent = "New Stock";
                            addItemBtn.click();
                            
                            setTimeout(() => {
                                currentAction = "edit";
                            }, 500);
                        })
                        .catch(error => console.log(error));
                    }else if(cMenuOptionId == "cm-details"){
                        currentAction = "details";
                        await fetch(`http://localhost:9000/stocks/${selectedItem.id.toString()}`)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            var detailsContainer = addItemContainer.cloneNode(true);
                            detailsContainer.style.display = "flex";
                            detailsContainer.setAttribute('id', "pdt-details-container");
                            document.body.insertAdjacentElement("afterbegin", detailsContainer);

                            // getting ref of all fields
                            var fields = {
                                "name": detailsContainer.querySelector("#name"),
                                "quantity": detailsContainer.querySelector("#quantity"),
                                "price": detailsContainer.querySelector("#price"),
                                "description": detailsContainer.querySelector("#description"),
                                "color": detailsContainer.querySelector("#color"),
                                "unit": detailsContainer.querySelector("#unit"),
                                "category": detailsContainer.querySelector("#category"),
                                "brand": detailsContainer.querySelector("#brand"),
                            }

                            // removing upload btn from thumbnails
                            detailsContainer.querySelectorAll('.photo-thumbnail').forEach( thumbnail => {
                                thumbnail.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                            });
                            
                            // changing titles
                            detailsContainer.querySelector(".title").textContent = "Photos";
                            detailsContainer.querySelector(".add-item-header").textContent = "Product Details";

                            //changing save/cancle btns
                            detailsContainer.querySelector(".add-item-buttons").innerHTML = 
                            `<button type="button" onclick="document.body.removeChild(document.getElementById('pdt-details-container'));" style="width: 100%; background-color: #d1d1d5; color: black;" class="add-item-save">Close</button>`;
                            
                            // loading data for input controls
                            for (var field in fields){
                                fields[field].value = response[field];

                                // disabling field
                                fields[field].disabled = true;
                            }
                            
                            // loading images
                            var images = response['photoUrls'];

                            for(var image in images){
                                var thElement = detailsContainer.querySelector(`#${image.replace("-", "-th-")}`);
                                thElement.src = images[image];

                                // onclick to preview image
                                thElement.onclick = (event) => {
                                    detailsContainer.querySelector("#photo-preview").src = event.target.src;
                                }
                            }

                        })
                        .catch(error => console.log(error));
                    }
                }

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
            // console.log(socket.readyState);
            socket.send(JSON.stringify({category: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
        }
        
        // receives data each time the database is updated
        socket.onmessage = (dataString)=>{
            /**
             * data is sent in string format
             * so it has to be converted to json using JSON.parse(str)
             */
            var data = JSON.parse(dataString.data);
            // console.log(data)
            // reseting table body content
            tableBody.innerHTML = "";

            if(data.data.length == 0){
                console.log("No data");
                tableBody.innerHTML = `<tr id="no-stocks-msg" style="border: none;"><td colspan="8" style="border: none; padding-top: 30px; text-align: center">No stocks</td></tr>`;
            }

                // publising data to table body
                data.data.forEach( doc => {

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

        // filtering
        stkCategory.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);

            socket.send(JSON.stringify({category: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
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
            socket.send(JSON.stringify({category: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
        }

        stkTo.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);
            socket.send(JSON.stringify({category: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
        }

        stkSearch.onkeyup = (event) => {
            var acceptedChars = ['backspace', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', ' ']
            console.log(event.code.toString() == "Backspace")
            
            if(acceptedChars.includes(event.key.toString()) || event.code.toString() == "Backspace"){
                socket.send(JSON.stringify({category: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
            }
        }
        
        // Add item
        addItemBtn.onclick = ()=>{
            addItemContainer.style.display = "flex";
            currentAction = "add";
            // changing titles
            if (addItemContainer.querySelector(".add-item-header").textContent == "Edit Stock"){
                addItemContainer.querySelector(".add-item-header").textContent = "New Stock";
            }else{
                addItemContainer.querySelector(".add-item-header").textContent = "Edit Stock";
            }

            //handling add photo
            pdtPhotos.forEach(element => {
                element.setAttribute("title", "Right click to upload/change photo.\nLeft click to preview photo.");
                element.onclick = (event) => {
                    console.log(event.target.id);
                    var inputID = event.target.id.toString().replace("th-", "");
                    var inputElement = document.getElementById(inputID);

                    if (inputElement.files.length != 0){
                        photoPreview.src = URL.createObjectURL(inputElement.files[0]);
                    }else if (currentAction == "edit" && inputElement.files.length == 0 ){ // handling edit container displayed
                        photoPreview.src = event.target.src;
                    }
                }   

                element.oncontextmenu = (event) => {
                    event.preventDefault();
                    console.log(event.target.id);
                    // getting input id
                    var inputID = event.target.id.toString().replace("th-", "");
                    // getting input element ref
                    var inputElement = document.getElementById(inputID);

                    inputElement.onchange = (imgEvent) => {
                        if (imgEvent.target.value == "") return false;
                        event.target.src = URL.createObjectURL(imgEvent.target.files[0]);
                        photoPreview.src =  event.target.src
                    }
                    // opening upload window
                    inputElement.click();
                }
            });
        }

        // save item
        saveEntry.onclick = async (event)=>{
            // getting form
            var formData = new FormData();

            // handling forms
            pdtPhotos.forEach(element => {
                var inputID = element.id.toString().replace("th-", "");
                var inputElement = document.getElementById(inputID);

                if (inputElement.value != ""){
                    console.log(inputElement);
                    formData.append(inputID, inputElement.files[0]);
                    console.log("here");
                }
            });

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
                "rating": null,
                "photoUrls": null
            }

            // endpoint
            var url = "http://localhost:9000/stocks"
            var method = "POST"

            if (currentAction == "edit"){
                method = "PUT";
                data['id'] = selectedItemForProcessing.id;
            }

            // writing data into form data
            for (var key in data){
                formData.append(key, data[key]);
            }

            // posting data
            await fetch(url,{
                method: method,
                mode: "cors",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                body: formData
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
            addItemContainer.querySelector(".add-item-header").textContent = "Edit Stock";

            clearForm();
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
                    <div id="add-item-btn" className="new-item-btn">New Stock</div>
                </div>

                {/* stock table */}
                <div className="stock-table-container">
                    <table className="stock-table table">
                        <thead>
                            <tr className="table-header-tr">
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Brand</th>
                                <th>Categories</th>
                                <th>Color</th>
                                <th>Last Update</th>
                                <th>Created On</th>
                            </tr>
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
                                            <select defaultValue="red" name="color" id="color" className="form-control" required>
                                                <option value="red">Red</option>
                                                <option value="white">White</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="quantity">Quantity</label>
                                            <input id="quantity" type="number" min="1" className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="unit">Unit</label>
                                            <select defaultValue="kg" name="unit" id="unit" className="form-control" required>
                                                <option value="kg">kg</option>
                                                <option value="pounds">Pounds</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="category">Category</label>
                                            <select defaultValue="all" name="category" id="category" className="form-control" required>
                                                <option value="all">All Categories</option>
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
                                        <div className="title ">Upload Photos (<span style={{fontSize: "10px", color: "blue"}}>Right Click <i className="fas fa-upload" style={{color: "#d1d1d5", fontSize: "16px"}}></i> to Upload/Change | Left Click <i className="fas fa-upload" style={{color: "#d1d1d5", fontSize: "16px"}}></i> to Preview</span>). <span style={{fontStyle: "italic", color: "green"}}>Preferred Photos: Square</span></div>
                                        {/* <div className="add-photo">Add Photo</div> */}
                                    </div>
                                    <div className="item-photos-container">
                                        <div className="photo-preview-div">
                                            <img id="photo-preview" src={ imgPreviewHolder } className="photo-preview" alt="preview" />
                                        </div>
                                        <div className="photo-thumbnails">

                                            <input type="file" id="photo-1" name="photo-1" accept="image/*" hidden/>
                                            <img width="60px" height="60px" src = { imgUploadHolder } id="photo-th-1" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-2" name="photo-2" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-2" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-3" name="photo-3" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-3" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-4" name="photo-4" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-4" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-5" name="photo-5" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-5" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-6" name="photo-6" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-6" className="photo-thumbnail" alt=""/>

                                            <input type="file" id="photo-7" name="photo-7" accept="image/*" hidden/>
                                            <img src = { imgUploadHolder } id="photo-th-7" className="photo-thumbnail" alt=""/>

                                        </div>
                                    </div>
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
                <div id="cm-delete" className="cm-option"><i style={{color: "white"}} className="fas fa-trash-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Delete</div>
                <div id="cm-edit" className="cm-option"><i style={{color: "white"}} className="fas fa-pen-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Edit</div>
                <div id="cm-details" className="cm-option"><i style={{color: "white"}} className="fas fa-ellipsis-h"></i>&nbsp;&nbsp;&nbsp;&nbsp; Details</div>
            </div>
        </div>
    );
}


export default Stocks;