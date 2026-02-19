document.getElementById("cashout-btn").addEventListener("click", async function() {
    const cashoutNumber = getValueFromInput("cashout-number");
    if (cashoutNumber.length !== 11 || isNaN(cashoutNumber)) {
        alert("Invalid Agent number! Please enter 11 digits.");
        return;
    }
    
    const cashoutAmount = getValueFromInput("cashout-amount");
    if (isNaN(cashoutAmount) || Number(cashoutAmount) <= 0) {
        alert(" Please enter a valid amount!");
        return;
    }
    
    const pin = getValueFromInput("cashout-pin");
    if (!pin || pin.length !== 4) {
        alert("Please enter a valid 4-digit PIN!");
        return;
    }
    
    try {
        const result = await TransactionAPI.cashout(cashoutNumber, cashoutAmount, pin);
        
        if (result.success) {
            updateBalance(result.balance);
            const charge = result.charge;
            const total = parseFloat(cashoutAmount) + charge;
            alert(`Cashout successful!\nAmount: $${cashoutAmount}\nCharge (1.5%): $${charge.toFixed(2)}\nTotal: $${total.toFixed(2)}`);
            clearForm(['cashout-number', 'cashout-amount', 'cashout-pin']);
            await loadTransactionHistory();
            showHome();
        } else {
            alert(result.message || 'Transaction failed!');
        }
    } catch (error) {
        alert(error.message || 'Transaction failed! Please try again.');
    }
})
