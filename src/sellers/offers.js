/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import './css/dashboard.css'
import imgPreviewHolder from "./images/preview-image.png"
import imgUploadHolder from "./images/upload-image.png"
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from 'moment';
import { useFetchAll } from "../petaccessories/hooks/useFetch";

var Offers= ()=>{

    const { data: productList } = useFetchAll("http://localhost:9000", "offers", "stocks");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date().setDate( new Date().getDate() + 1));
    var validateStartDate =  ( current ) => {
        return current.isAfter(moment().subtract(1, 'day'));
    }
    var validateEndDate =  ( current ) => {
        console.log()
        return current.isAfter(moment( startDate ));
    }
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
        var currentActionOffer = null;
        var selectedItemForProcessingOffer = null;
        var products = document.querySelectorAll('.product-item');
        var catView = document.getElementById("products");

        // populate products
        if (productList != null){
            var list = document.querySelector(".temp-list");
            list.innerHTML = "";
            productList.products.forEach( product => {
                list.insertAdjacentHTML("beforeend", 
                `
                    <li class = "dpd-item" ><input data-item-name=${ product.name } type="checkbox" class="product-item" id="${ product.id }" value="${ product.id }" /> <label for="${ product.id }"> ${ product.name }</label></li>
                `);
            });
        }
        setTimeout(() => {
            products = document.querySelectorAll('.product-item');
            products.forEach( category => {
                category.onchange = (event) => {
                    if (catView.textContent == "...") catView.textContent = "";
                    if (event.target.value == "all"){
                        catView.textContent = "All Products";
                        catView.setAttribute("data-product-ids", "all");
                        products.forEach( product => {
                            product.checked = event.target.checked;
                        });
                        if(!event.target.checked){
                            catView.textContent = "..."
                        }
                    }else{
                        var allCat = document.getElementById("all");
                        allCat.checked = false;
                        var contentStr = "";
                        var productIds = "";
    
                        products.forEach(cat => {
                            if (cat.checked){
                                contentStr += cat.getAttribute("data-item-name").substring(0,1).toUpperCase() 
                                + cat.getAttribute("data-item-name").slice(1) + ", ";

                                productIds += cat.value + ", ";
                            }
                        });

                        if (contentStr.length == 0) contentStr = "...";
                        else {
                            contentStr = contentStr.split(", ").slice(0, -1);
                            productIds = productIds.split(", ").slice(0, -1);
                        }
                        
                        if (contentStr.length == productList.products.length) allCat.checked = true;
                        if (contentStr != "...") contentStr = contentStr.join(", "); 
                        catView.textContent = contentStr;
                        catView.setAttribute("data-product-ids", productIds);
                        console.log(productIds)

                    }
                }
            });
        }, 2000);
        
        var clearForm = () => {
            // clearing fields
            addItemContainer.querySelector("#title").value = "";
            addItemContainer.querySelector("#condition").selectedIndex = 0;
            addItemContainer.querySelector("#quantity").value = "";
            addItemContainer.querySelector("#discount-type").selectedIndex = 0;
            addItemContainer.querySelector("#discount-value").value = "";

            addItemContainer.querySelector("#description").value = "";
            catView.textContent = "...";
            
            // clearing products
            document.querySelectorAll('.product-item').forEach( cat => {
                console.log(cat)
                cat.checked = false;
            });

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
                selectedItemForProcessingOffer = selectedItem;
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
                        currentActionOffer = "delete";
                        // deleting item
                        await fetch("http://localhost:9000/offers",{
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
                    }else if(cMenuOptionId == "cm-edit"){
                        await fetch(`http://localhost:9000/offers/${selectedItem.id.toString()}`)
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
                                "type": addItemContainer.querySelector("#type"),
                            }
                            
                            console.log(typeof addItemContainer.querySelector(".add-item-header").textContent.trim())
                           
                            // loading data for input controls
                            for (var field in fields){
                                if (field == "category"){
                                    catView.textContent = response[field].join(", ");
                                    if (response[field].length == 4){
                                        addItemContainer.querySelector("#all").click();
                                    }else{
                                        response[field].forEach( cat => {
                                            addItemContainer.querySelector(`#${ cat.toLowerCase() }`).checked = true;
                                        });
                                    }
                                }else{
                                    fields[field].value = response[field];
                                }
                            }
                            
                            // loading images
                            var images = response['photoUrls'];

                            for(var image in images){
                                var thElement = addItemContainer.querySelector(`#${image.replace("-", "-th-")}`);
                                thElement.src = images[image];
                            }
                            
                            // triggering add stock
                            addItemContainer.querySelector(".add-item-header").textContent = "New Offer";
                            addItemBtn.click();
                            
                            setTimeout(() => {
                                currentActionOffer = "edit";
                            }, 500);
                        })
                        .catch(error => console.log(error));
                    }else if(cMenuOptionId == "cm-details"){
                        currentActionOffer = "details";
                        await fetch(`http://localhost:9000/offers/${selectedItem.id.toString()}`)
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            var detailsContainer = addItemContainer.cloneNode(true);
                            detailsContainer.style.display = "flex";
                            detailsContainer.setAttribute('id', "pdt-details-container");
                            document.body.insertAdjacentElement("afterbegin", detailsContainer);

                            // getting ref of all fields
                            var fields = {
                                "title": detailsContainer.querySelector("#title"),
                                "condition": detailsContainer.querySelector("#condition"),
                                "quantity": detailsContainer.querySelector("#quantity"),
                                "discountType": document.querySelector("#discount-type"),
                                "discountValue": detailsContainer.querySelector("#discount-value"),
                                "description": detailsContainer.querySelector("#description"),
                                "startDate": detailsContainer.querySelector(".date-time-start > input"),
                                "endDate": detailsContainer.querySelector(".date-time-end > input"),
                                "products": detailsContainer.querySelector('.dpd-list'),
                            }
                            fields['startDate'].hidden = false;
                            fields['endDate'].hidden = false;

                            // removing upload btn from thumbnails
                            detailsContainer.querySelectorAll('.photo-thumbnail').forEach( thumbnail => {
                                thumbnail.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                            });
                            
                            // changing titles
                            detailsContainer.querySelector(".title").textContent = "Photo";
                            detailsContainer.querySelector(".add-item-header").textContent = "Product Details";

                            //changing save/cancle btns
                            detailsContainer.querySelector(".add-item-buttons").innerHTML = 
                            `<button type="button" onclick="document.body.removeChild(document.getElementById('pdt-details-container'));" style="width: 100%; background-color: #d1d1d5; color: black;" class="add-item-save">Close</button>`;
                            
                            // loading data for input controls
                            for (var field in fields){

                                if (field == "condition"){
                                    detailsContainer.querySelector("#condition").value = Object.keys(response.product[field])[0];
                                }else if (field == "startDate" || field == "endDate"){
                                    fields[field].value = new Date(response.product[field]._seconds);
                                }else{
                                    fields[field].value = response.product[field];
                                }

                                // disabling field
                                fields[field].disabled = true;
                            }


                            // loading images
                            var images = response.product['photoUrls'];

                            for(var image in images){
                                var thElement = detailsContainer.querySelector(`#${image.replace("-", "-th-")}`);
                                thElement.src = images[image];
                                detailsContainer.querySelector("#photo-preview").src = images[image];
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
        var socket = new WebSocket("ws:localhost:9000/offers");

        // sending data to retrive data
        socket.onopen = (event)=>{
            // console.log(socket.readyState);
            socket.send(JSON.stringify({condition: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
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
                                <td title="${ doc.title }">${doc.title.substring(0, 25)}...</td>
                                <td>${Object.values(doc.condition)[0] } (${doc.quantity})</td>
                                <td>${doc.discountType}</td>
                                <td>${doc.discountValue}</td>
                                <td>${new Date(doc.startDate._seconds * 1000).toDateString()} ${new Date(doc.startDate._seconds * 1000).toLocaleTimeString()}</td>
                                <td>${new Date(doc.endDate._seconds * 1000).toDateString()} ${new Date(doc.endDate._seconds * 1000).toLocaleTimeString()}</td>
                                <td>${new Date(doc.updatedOn._seconds * 1000).toDateString()} ${new Date(doc.updatedOn._seconds * 1000).toLocaleTimeString()}</td>
                                <td>${new Date(doc.createdOn._seconds * 1000).toDateString()} ${new Date(doc.createdOn._seconds * 1000).toLocaleTimeString()}</td>
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

            socket.send(JSON.stringify({condition: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
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
            socket.send(JSON.stringify({condition: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
        }

        stkTo.onchange = ()=>{
            console.log(stkCategory.value);
            console.log(stkFrom.value);
            console.log(stkTo.value);
            socket.send(JSON.stringify({condition: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
        }

        stkSearch.onkeyup = (event) => {
            var acceptedChars = ['backspace', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', ' ']
            console.log(event.code.toString() == "Backspace")
            
            if(acceptedChars.includes(event.key.toString()) || event.code.toString() == "Backspace"){
                socket.send(JSON.stringify({condition: stkCategory.value, search: stkSearch.value, from: stkFrom.value, to: stkTo.value}));
            }
        }
        
        // Add item
        addItemBtn.onclick = ()=>{
            setStartDate(new Date());
            setEndDate(new Date().setDate( new Date().getDate() + 1));
            addItemContainer.style.display = "flex";
            currentActionOffer = "add";
            // changing titles
            setTimeout(() => {
                if (addItemContainer.querySelector(".add-item-header").textContent == "Edit Offer" || currentActionOffer == "add"){
                    addItemContainer.querySelector(".add-item-header").textContent = "New Offer";
                }else{
                    addItemContainer.querySelector(".add-item-header").textContent = "Edit Offer";
                }
            }, 100);

            //handling add photo
            pdtPhotos.forEach(element => {
                element.setAttribute("title", "Right click to upload/change photo.\nLeft click to preview photo.");
                element.onclick = (event) => {
                    console.log(event.target.id);
                    var inputID = event.target.id.toString().replace("th-", "");
                    var inputElement = document.getElementById(inputID);

                    if (inputElement.files.length != 0){
                        photoPreview.src = URL.createObjectURL(inputElement.files[0]);
                    }else if (currentActionOffer == "edit" && inputElement.files.length == 0 ){ // handling edit container displayed
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
                document.getElementById("title").value.trim(),
                document.getElementById("discount-value").value.trim(),
                document.getElementById("quantity").value.trim(),
                document.getElementById("description").value.trim()
            ]
            if (moment( new Date(document.getElementById("end-date").value.trim()) ).diff(document.getElementById("start-date").value.trim()) <= 0){
                document.querySelector('.show-notification').innerHTML = (
                    `<div class="alert alert-danger alert-dismissible" role="alert">
                    Start date must be less than End date.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                    </div>`
                );

                setTimeout(() => {
                    document.querySelector('.show-notification').innerHTML = "";
                }, 5000);
                return
            }

            if (temp.includes("") || catView.textContent == '...'){
                document.querySelector('.show-notification').innerHTML = (
                    `<div class="alert alert-danger alert-dismissible" role="alert">
                    All fields required.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                    </div>`
                );

                setTimeout(() => {
                    document.querySelector('.show-notification').innerHTML = "";
                }, 5000);
                return
            }
            
            // data to be sent
            var data = {
                "id": null,
                "sellerId": "DSErqrq545dsDh",
                "title": document.getElementById("title").value.trim(),
                "condition": document.getElementById("condition").value.trim(),
                "quantity": parseFloat(document.getElementById("quantity").value.trim()),
                "discountType": document.getElementById("discount-type").value.trim(),
                "discountValue": parseFloat(document.getElementById("discount-value").value.trim()),
                "description": document.getElementById("description").value.trim(),
                "startDate": document.getElementById("start-date").value.trim(),
                "endDate": document.getElementById("end-date").value.trim(),
                "products": catView.getAttribute('data-product-ids'),
                "createdOn": null,
                "updatedOn": null,
                "photoUrls": null
            }
            console.log(data)
            // endpoint
            var url = "http://localhost:9000/offers"
            var method = "POST"

            if (currentActionOffer == "edit"){
                method = "PUT";
                data['id'] = selectedItemForProcessingOffer.id;
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
            .then(response=>{
                console.log(response);
                document.querySelector('.show-notification').innerHTML = (
                    `<div class="alert alert-success alert-dismissible" role="alert">
                        ${data.title} has been successfully added.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
                    </div>`
                );
                clearForm();
                addItemContainer.style.display = "none";
                
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
    },[ productList ]);
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
                <div className="side-nav-link orders"><a href="/orders"> <i className="fa fa-truck"></i> Orders</a></div>
                <div className="side-nav-link reports"><a href="/reports"> <i className="fa fa-chart-line"></i> Reports</a></div>
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
                        <option value="all">All Offers</option>
                        <option value="cond-1">At least N quantity of items.</option>
                        <option value="cond-2">For each product.</option>
                    </select>
                    <input id="stk-search" type="search" placeholder="Search for items name" />
                    <div className="date-filter">
                        <input id="from-date" type="date" className="from-date" /> to {' '}
                        <input id="to-date" type="date" className="to-date" />
                    </div>
                    <div id="add-item-btn" className="new-item-btn">New Offer</div>
                </div>

                {/* stock table */}
                <div className="stock-table-container">
                    <table className="stock-table table">
                        <thead>
                            <tr className="table-header-tr">
                                <th>Title</th>
                                <th>Condition (With Qty)</th>
                                <th>Discount Type</th>
                                <th>Discount Value</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Created On</th>
                                <th>Last Update</th>
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
                        <div className="add-item-header">New Offer</div>
                        <div className="container">
                            <div className="row">
                                <div className="add-item-left-container col-md-6">
                                    <div style={{margin: 0}} className="form-group col-12 add-item-labels">
                                        <label htmlFor="title">Title</label>
                                        <input id="title" type="text" className="form-control" required/>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="condition">Condition</label>
                                            <select defaultValue="cont-1" name="condition" id="condition" className="form-control" required>
                                                <option value="cond-1">At least N quantity of items.</option>
                                                <option value="cond-2">For each product.</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="quantity">N Quantity</label>
                                            <input id="quantity" type="number" min="2" className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="discount-type">Discount Type</label>
                                            <select defaultValue="percentage-of" name="discount-type" id="discount-type" className="form-control" required>
                                                <option value="percentage-of">Percentage of</option>
                                                <option value="fixed-price">Fixed Price</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="discount-value">Discount Value</label>
                                            <input id="discount-value" type="number" min="1" className="form-control" required/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="start-date">Start Date and Time</label>
                                            <Datetime className="date-time-start" isValidDate={ validateStartDate } value= { startDate } onChange={ (newMoment) => {
                                                setStartDate(newMoment);
                                                document.getElementById("start-date").value = newMoment._d;
                                            } } />
                                            <input className="form-control" defaultValue={ new Date() } type="datetime" name="" id="start-date" hidden/>
                                        </div>
                                        <div className="form-group col-md-6 add-item-labels">
                                            <label htmlFor="end-date">End Date and Time</label>
                                            <Datetime className="date-time-end" isValidDate = { validateEndDate }  value={ endDate } onChange={ (moment) => {
                                                setEndDate(moment)
                                                document.getElementById("end-date").value = moment._d;    
                                            } } />
                                            <input className="form-control" defaultValue={ new Date(new Date().setDate(new Date().getDate() + 1)) } type="datetime" name="" id="end-date" hidden/>
                                        </div>
                                        <div className="form-group col-12 add-item-labels">
                                            <label htmlFor="description">Description</label>
                                            <textarea id="description" rows="3" className="form-control" required></textarea>
                                        </div>
                                        <div className="form-group col-md-12 add-item-labels">
                                            <label htmlFor="products">Add Products</label>
                                            <button onClick = { () => {

                                                if (document.querySelector(".dpd-list").style.display == "block"){
                                                    document.querySelector(".dpd-list").style.display = "none";
                                                }else{
                                                    document.querySelector(".dpd-list").style.display = "block";
                                                }

                                            }} style={{borderColor: "#d1d1d5"}} id="products" type="button" className = "btn btn-outline form-control" >
                                                ...
                                            </button>
                                            <ul onMouseLeave = { () => {
                                                document.querySelector(".dpd-list").style.display = "none";
                                            }} className="dpd-list">
                                                <li className = "dpd-item" ><input type="checkbox" className="product-item" id="all" value="all" /> <label htmlFor="all"> All Products</label></li>
                                                <div className="temp-list"></div>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="add-item-right-container col-md-6">
                                    <div className="item-photos-top">
                                        <div className="title ">Upload Photo (<span style={{fontSize: "10px", color: "blue"}}>Right Click <i className="fas fa-upload" style={{color: "#d1d1d5", fontSize: "16px"}}></i> to Upload/Change | Left Click <i className="fas fa-upload" style={{color: "#d1d1d5", fontSize: "16px"}}></i> to Preview</span>). <span style={{fontStyle: "italic", color: "green"}}>Preferred Photo: Square</span></div>
                                        {/* <div className="add-photo">Add Photo</div> */}
                                    </div>
                                    <div className="item-photos-container">
                                        <div className="photo-preview-div">
                                            <img id="photo-preview" src={ imgPreviewHolder } className="photo-preview" alt="preview" />
                                        </div>
                                        <div className="photo-thumbnails">

                                            <input type="file" id="photo-1" name="photo-1" accept="image/*" hidden/>
                                            <img width="60px" height="60px" src = { imgUploadHolder } id="photo-th-1" className="photo-thumbnail" alt=""/>
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
                {/* <div id="cm-edit" className="cm-option"><i style={{color: "white"}} className="fas fa-pen-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp; Edit</div> */}
                <div id="cm-details" className="cm-option"><i style={{color: "white"}} className="fas fa-ellipsis-h"></i>&nbsp;&nbsp;&nbsp;&nbsp; Details</div>
            </div>
            <div style={{ position: "fixed", top: "0", width: "100%", zIndex: 100}} className="show-notification"></div>
        </div>
    );
}


export default Offers;