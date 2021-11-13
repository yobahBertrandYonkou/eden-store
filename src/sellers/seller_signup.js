import '../petaccessories/css/signin.css'
var SignUp = ()=>{
   return (
        <div id="container">
            <div id="login-form">
                <div id="login-title">EDEN PET ACCESSORIES</div>
                <div style={{ paddingTop: "0px"}} id="login-title">Seller Sign Up</div>
                <input id="email" className="text-box" type="email" placeholder="Email" required />
                <input id="password" className= "text-box" type="password" placeholder="Password" required />
                <input id="store" className= "text-box" type="store" placeholder="Store name" required />
                <input id="contact" className= "text-box" type="contact" placeholder="Contact number" required />
                <div onClick = { async () => {
                    var email = document.getElementById("email");
                    var password = document.getElementById("password");
                    var store = document.getElementById("store");
                    var contact = document.getElementById("contact");
                    var toast = document.getElementById('login-toast');

                    if(email.value.trim() === ""){
                        toast.textContent = "Email is required";
                        toast.style.display = "block";
                        setTimeout( () => toast.style.display = "none", 2000);
                    }else if (password.value.trim() === ""){
                        toast.style.display = "block";
                        toast.textContent = "Password is required";
                        setTimeout( () => toast.style.display = "none", 2000);
                    }else if(store.value.trim() === "" || contact.value.trim() === ""){
                        toast.style.display = "block";
                        toast.textContent = "All fields required";
                        setTimeout( () => toast.style.display = "none", 2000);
                    }else{
                        console.log("Authenticating")
                        await fetch(`http://localhost:9000/seller/signup`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify( {
                                email: email.value.trim(),
                                password: password.value.trim(),
                                store: store.value.trim(),
                                contact: contact.value.trim()
                            })
                        })
                        .then( response => response.json())
                        .then( response => {
                            console.log(response);
                            if (response.status !== 200){
                                toast.textContent = response.message.split("_").join(" ");
                                toast.style.display = "block";
                                setTimeout( () => toast.style.display = "none", 5000);
                            }else{
                                // save user data
                                localStorage.setItem("eden-sl-user-store", store.value.trim());
                                localStorage.setItem("eden-sl-user-email", email.value.trim());
                                localStorage.setItem("eden-sl-user-uid", response.uid);
                                localStorage.setItem("eden-sl-user-logged-in", "true");
                                window.location = "/seller/dashboard";
                            }
                        })
                        .catch( error => console.log(error));
                    }
                    

                }} id="login-btn">SIGN UP</div>
                <div className="form-text signin-from-signup" onClick = { () => window.location = "/seller/signin" }>Already have an account? <span style={{color: "blue"}}>Sign In</span></div>
                <div id="login-toast"></div>
            </div>
        </div>   
   );
}

export default SignUp;