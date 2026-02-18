document.getElementById("cashout-btn").addEventListener("click", function() {

    const cashoutNumberInput = document.getElementById("cashout-number");
    const cashoutNumber = cashoutNumberInput.value;
    console.log(cashoutNumber);

    if (cashoutNumber.length !== 11) {
        alert("Invalid Agent number!");
        return;
    }

    const cashoutAmountInput = document.getElementById("cashout-amount");
    const cashoutAmount = cashoutAmountInput.value;
    console.log(cashoutAmount);

    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    console.log(balance);
    const newBalance = Number(balance) - Number(cashoutAmount);
    
    if (newBalance < 0) {
        alert("Invalid amount!");
        return;
    }
    console.log(newBalance);

    const cashoutPinInput = document.getElementById("cashout-pin");
    const cashoutPin = cashoutPinInput.value;
    console.log(cashoutPin);
    if (cashoutPin === "1234") {
        alert("Cashout successful!");
        balanceElement.innerText = newBalance;
    }
    else {
        alert("Invalid pin!");
        return;
    }
})