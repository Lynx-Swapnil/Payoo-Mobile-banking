console.log("login");

document.getElementById("login-btn").addEventListener("click", async function() {
    const numberInput = document.getElementById('input-number');
    const phoneNumber = numberInput.value.trim();
    
    const pinInput = document.getElementById('input-pin');
    const pin = pinInput.value.trim();
    
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');
    const loginLoading = document.getElementById('login-loading');
    
    // Validation
    if (!phoneNumber || phoneNumber.length !== 11 || isNaN(phoneNumber)) {
        alert("Please enter a valid 11-digit phone number");
        return;
    }
    
    if (!pin || pin.length !== 4 || isNaN(pin)) {
        alert("Please enter a valid 4-digit PIN");
        return;
    }
    
    // Show loading state
    loginBtn.disabled = true;
    loginText.classList.add('hidden');
    loginLoading.classList.remove('hidden');
    
    try {
        const result = await AuthAPI.login(phoneNumber, pin);
        
        if (result.success) {
            // Save token
            setToken(result.token);
            
            alert("Login successful!");
            
            // Redirect to home
            window.location.assign("home.html");
        } else {
            alert(result.message || "Login failed!");
        }
    } catch (error) {
        alert(error.message || "Login failed! Please check your credentials.");
    } finally {
        // Hide loading state
        loginBtn.disabled = false;
        loginText.classList.remove('hidden');
        loginLoading.classList.add('hidden');
    }
});