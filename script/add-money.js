document.getElementById("add-money-btn").addEventListener("click", function () {
  const bankAccount = getValueFromInput("add-money-bank");
  console.log(bankAccount);
  if (bankAccount === "Select a Bank") {
    alert("Please select a bank!");
    return;
  }
  const accountNo = getValueFromInput("add-money-number");
  if (accountNo.length !== 11) {
    alert("Invalid Account number!");
    return;
  }
  const amount = getValueFromInput("add-money-amount");
  const newBalance = getBalance() + Number(amount);
  console.log(newBalance);

  const pin = getValueFromInput("add-money-pin");
  if (pin === "1234") {
    alert(`Money added successfully! from ${bankAccount} 
            at ${new Date()}`);
    setBalance(newBalance);

    const history = document.getElementById("history-container")
    const newHistory = document.createElement("div");
    newHistory.innerHTML = `
     <div class="transaction-card p-5 bg-base-100">
           Money added successfully! from ${bankAccount} . Account No: ${accountNo} . Amount: ${amount} .
            at ${new Date()} 
        </div>
    `;
    history.append(newHistory);
  } else {
    alert("Invalid pin!");
    return;
  }
});
