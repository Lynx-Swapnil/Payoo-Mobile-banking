document.getElementById("add-money-btn").addEventListener("click", async function () {
  const bankAccount = getValueFromInput("add-money-bank");
  console.log(bankAccount);
  
  if (bankAccount === "Select a Bank") {
    alert("Please select a bank!");
    return;
  }
  
  const accountNo = getValueFromInput("add-money-number");
  if (accountNo.length !== 11 || isNaN(accountNo)) {
    alert("Invalid Account number! Please enter 11 digits.");
    return;
  }
  
  const amount = getValueFromInput("add-money-amount");
  if (isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid amount!");
    return;
  }
  
  const pin = getValueFromInput("add-money-pin");
  if (!pin || pin.length !== 4) {
    alert("Please enter a valid 4-digit PIN!");
    return;
  }
  
  try {
    const result = await TransactionAPI.addMoney(bankAccount, accountNo, amount, pin);
    
    if (result.success) {
      updateBalance(result.balance);
      alert(`Money added successfully!\nAmount: $${amount}\nFrom: ${bankAccount}`);
      clearForm(['add-money-bank', 'add-money-number', 'add-money-amount', 'add-money-pin']);
      await loadTransactionHistory();
      showHome();
    } else {
      alert(result.message || 'Transaction failed!');
    }
  } catch (error) {
    alert(error.message || 'Transaction failed! Please try again.');
  }
});
