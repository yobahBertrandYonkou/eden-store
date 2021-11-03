import '../petaccessories/css/signin.css'
var sSignIn = ()=>{
   return (
        <div id="container">
            <div id="login-form">
                <div id="login-title">EDEN PET ACCESSORIES</div>
                <div style={{ paddingTop: "0px"}} id="login-title">Seller Sign In</div>
                <input id="email" className="text-box" type="email" placeholder="Email" required />
                <input id="password" className= "text-box" type="password" placeholder="Password" required />
                <div id="login-opts">
                    <label for="remember-me"><input name="remember-me" id="remember-me" type="checkbox" /> Remember me</label>
                    <div id="change-pass">Change password?</div>
                </div>
                <div onClick = { async () => {
                    var email = document.getElementById("email");
                    var password = document.getElementById("password");
                    var toast = document.getElementById('login-toast');

                    if(email.value.trim() === ""){
                        toast.textContent = "Email is required";
                        toast.style.display = "block";
                        setTimeout( () => toast.style.display = "none", 2000);
                    }else if (password.value.trim() === ""){
                        toast.textContent = "Password is required";
                        setTimeout( () => toast.style.display = "none", 2000);
                    }else{
                        console.log("Authenticating")
                        await fetch(`http://localhost:9000/seller/signin`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify( {
                                email: email.value.trim(),
                                password: password.value.trim()
                            })
                        })
                        .then( response => response.json())
                        .then( response => {
                            console.log(response);

                            if (response.status != 200){
                                toast.textContent = response.message.split("_").join(" ");
                                toast.style.display = "block";
                                setTimeout( () => toast.style.display = "none", 5000);
                            }else{
                                // save user data
                                localStorage.setItem("eden-sl-user-store", response.data.store);
                                localStorage.setItem("eden-sl-user-email", response.data.email);
                                localStorage.setItem("eden-sl-user-uid", response.uid);
                                localStorage.setItem("eden-sl-user-logged-in", "true");
                                localStorage.setItem("eden-pa-user-name", response.data.store);
                                localStorage.setItem("eden-pa-user-email", response.data.email);
                                localStorage.setItem("eden-pa-user-uid", response.uid);
                                localStorage.setItem("eden-pa-user-type", "seller");
                                localStorage.setItem("eden-pa-user-photo", null);
                                localStorage.setItem("eden-pa-user-logged-in", "true");
                                window.location = "/seller/dashboard";
                            }
                        })
                        .catch( error => console.log(error));
                    }
                    

                }} id="login-btn">SIGN IN</div>
                <div className="form-text signin-from-signup" onClick = { () => window.location = "/seller/signup" }>Don't have an account? <span style={{color: "blue"}}>Sign Up</span></div>
                <div id="login-toast"></div>
            </div>
        </div>   
   );
}

export default sSignIn;