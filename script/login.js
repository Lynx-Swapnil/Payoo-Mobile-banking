console.log("login" );

document.getElementById("login-btn").addEventListener("click", function() {
    // Get the mobile number and pin values
    const numberInput = document.getElementById('input-number')
    const contactNumber = numberInput.value
    console.log(contactNumber)

    const pinInput = document.getElementById('input-pin')
    const pin = pinInput.value
    console.log(pin)

    // match the number and pin 
    if (contactNumber === "01234567890" && pin === "1234") {
        alert("Login successful!");

        // window.location.replace("home.html");
        window.location.assign("home.html");
    }
        else {
            alert("login failed!");
            return;
        }
});