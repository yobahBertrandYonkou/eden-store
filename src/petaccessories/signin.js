import './css/signin.css'
var SignIn = ()=>{
   return (
        <div id="container">
            <div id="login-form">
                <div id="login-title">EDEN PET ACCESSORIES</div>
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
                        await fetch(`http://localhost:9000/user/authentication`, {
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

                            if (response.status !== 200){
                                toast.textContent = response.message.split("_").join(" ");
                                toast.style.display = "block";
                                setTimeout( () => toast.style.display = "none", 5000);
                            }else{
                                // login in user
                                fetch(`http://localhost:9000/user/accessories/login`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify( {
                                        token: response.token,
                                        key: response.secretKey
                                    })
                                })
                                .then( response => response.json())
                                .then( response => {
                                    console.log(response);
                                    // save user data
                                    localStorage.setItem("eden-pa-user-name", response.name);
                                    localStorage.setItem("eden-pa-user-email", response.email);
                                    localStorage.setItem("eden-pa-user-uid", response.uid);
                                    localStorage.setItem("eden-pa-user-photo", response.photoURL);
                                    localStorage.setItem("eden-pa-user-logged-in", "true");
                                    window.location = "/accessories/home";
                                })
                                .catch( error => console.log(error));
                            }
                        })
                        .catch( error => console.log(error));
                    }
                    

                }} id="login-btn">SIGN IN</div>
                <div id="login-toast"></div>
            </div>
        </div>   
   );
}

export default SignIn;