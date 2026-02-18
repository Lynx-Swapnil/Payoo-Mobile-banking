document.getElementById("cashout-btn").addEventListener("click", function() {
 const cashoutNumber = getValueFromInput("cashout-number");
        if (cashoutNumber.length !== 11) {  
        alert("Invalid Agent number!");
        return;
    }
 const cashoutAmount = getValueFromInput("cashout-amount");

    const currentBalance = document.getElementById("balance");

    const newBalance = Number(currentBalance.innerText) - Number(cashoutAmount);

    if (newBalance < 0) {
        alert("Invalid amount!");
        return;
    }

    const pin = getValueFromInput("cashout-pin");
    if (pin === "1234") {
        alert("Cashout successful!");
        setBalance(newBalance);

         const history = document.getElementById("history-container")
    const newHistory = document.createElement("div");
    newHistory.innerHTML = `
     <div class="transaction-card p-5 bg-base-100">
            Cashout ${cashoutAmount} successfully! to ${cashoutNumber} .  
            at ${new Date()} 
        </div>
    `;
    history.append(newHistory);
    }
    else {
        alert("Invalid pin!");
        return;
    }

})
