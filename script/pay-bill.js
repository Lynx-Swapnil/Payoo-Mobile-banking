document.getElementById("bill-btn").addEventListener("click", async function() {
    const billService = getValueFromInput("bill-service");
    
    if (billService === "Select service") {
        alert("Please select a service to pay!");
        return;
    }
    
    const billNumber = getValueFromInput("bill-number");
    if (!billNumber || billNumber.trim() === "") {
        alert("Please enter the account number!");
        return;
    }
    
    const billAmount = getValueFromInput("bill-amount");
    if (isNaN(billAmount) || Number(billAmount) <= 0) {
        alert("Please enter a valid amount!");
        return;
    }
    
    const pin = getValueFromInput("bill-pin");
    if (!pin || pin.length !== 4) {
        alert("Please enter a valid 4-digit PIN!");
        return;
    }
    
    try {
        const result = await TransactionAPI.payBill(billService, billNumber, billAmount, pin);
        
        if (result.success) {
            updateBalance(result.balance);
            alert(`Bill paid successfully!\nService: ${billService}\nAmount: $${billAmount}\nAccount: ${billNumber}`);
            clearForm(['bill-service', 'bill-number', 'bill-amount', 'bill-pin']);
            await loadTransactionHistory();
            showHome();
        } else {
            alert(result.message || 'Transaction failed!');
        }
    } catch (error) {
        alert(error.message || 'Transaction failed! Please try again.');
    }
});
