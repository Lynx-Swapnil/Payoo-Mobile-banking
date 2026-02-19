document.getElementById("bonus-btn").addEventListener("click", async function() {
    const couponCode = getValueFromInput("bonus-coupon");
    
    if (!couponCode ||couponCode.trim() === "") {
        alert("Please enter a coupon code!");
        return;
    }
    
    try {
        const result = await TransactionAPI.getBonus(couponCode);
        
        if (result.success) {
            updateBalance(result.balance);
            alert(`🎉 Bonus received!\nAmount: $${result.amount}\nYour new balance: $${result.balance.toFixed(2)}`);
            clearForm(['bonus-coupon']);
            await loadTransactionHistory();
            showHome();
        } else {
            if (result.message === 'Invalid coupon code') {
                alert("Invalid coupon code!\n\nTry these valid coupons:\n• PAYOO100\n• WELCOME50\n• BONUS200\n• SAVE25\n• MEGA500");
            } else {
                alert(result.message || 'Transaction failed!');
            }
        }
    } catch (error) {
        alert(error.message || 'Transaction failed! Please try again.');
    }
});
