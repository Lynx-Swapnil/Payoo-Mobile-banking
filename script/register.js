console.log("register");

document.getElementById("register-btn").addEventListener("click", async function() {
    const numberInput = document.getElementById('register-number');
    const phoneNumber = numberInput.value.trim();
    
    const pinInput = document.getElementById('register-pin');
    const pin = pinInput.value.trim();
    
    const pinConfirmInput = document.getElementById('register-pin-confirm');
    const pinConfirm = pinConfirmInput.value.trim();
    
    const registerBtn = document.getElementById('register-btn');
    const registerText = document.getElementById('register-text');
    const registerLoading = document.getElementById('register-loading');
    
    // Validation
    if (!phoneNumber || phoneNumber.length !== 11 || isNaN(phoneNumber)) {
        alert("Please enter a valid 11-digit phone number");
        return;
    }
    
    if (!pin || pin.length !== 4 || isNaN(pin)) {
        alert("Please enter a valid 4-digit PIN");
        return;
    }
    
    if (pin !== pinConfirm) {
        alert("PINs do not match!");
        return;
    }
    
    // Show loading state
    registerBtn.disabled = true;
    registerText.classList.add('hidden');
    registerLoading.classList.remove('hidden');
    
    try {
        const result = await AuthAPI.register(phoneNumber, pin);
        
        if (result.success) {
            // Save token
            setToken(result.token);
            
            alert(`Registration successful!\nWelcome to Payoo!\nYour starting balance: $${result.user.balance}`);
            
            // Redirect to home
            window.location.assign("home.html");
        } else {
            alert(result.message || "Registration failed!");
        }
    } catch (error) {
        alert(error.message || "Registration failed! Please try again.");
    } finally {
        // Hide loading state
        registerBtn.disabled = false;
        registerText.classList.remove('hidden');
        registerLoading.classList.add('hidden');
    }
});
