document.getElementById("transfer-btn").addEventListener("click", async function() {
    const transferNumber = getValueFromInput("transfer-number");
    if (transferNumber.length !== 11 || isNaN(transferNumber)) {
        alert("Invalid account number! Please enter 11 digits.");
        return;
    }
    
    const transferAmount = getValueFromInput("transfer-amount");
    if (isNaN(transferAmount) || Number(transferAmount) <= 0) {
        alert("Please enter a valid amount!");
        return;
    }
    
    const pin = getValueFromInput("transfer-pin");
    if (!pin || pin.length !== 4) {
        alert("Please enter a valid 4-digit PIN!");
        return;
    }
    
    try {
        const result = await TransactionAPI.transfer(transferNumber, transferAmount, pin);
        
        if (result.success) {
            updateBalance(result.balance);
            alert(`Transfer successful!\nAmount: $${transferAmount}\nTo: ${transferNumber}`);
            clearForm(['transfer-number', 'transfer-amount', 'transfer-pin']);
            await loadTransactionHistory();
            showHome();
        } else {
            alert(result.message || 'Transaction failed!');
        }
    } catch (error) {
        alert(error.message || 'Transaction failed! Please try again.');
    }
});
