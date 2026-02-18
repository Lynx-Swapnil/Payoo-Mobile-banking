console.log('Machine added');


function getValueFromInput(id) {
    const input = document.getElementById(id);
     const value = input.value;
     console.log(id,value);
     return value;
}

function getBalance() {
    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    console.log(balance);
    return Number(balance);
}

function setBalance(value) {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = value;
}   

function showOnly(id) {
    const latestPayment = document.getElementById("latest-payment");
    const addMoney = document.getElementById("add-money");
    const cashout = document.getElementById("cashout");
    const transferMoney = document.getElementById("transfer-money");
    const getBonus = document.getElementById("get-bonus");
    const payBill = document.getElementById("pay-bill");
    const history = document.getElementById("history");

    latestPayment.classList.add("hidden");
    addMoney.classList.add("hidden");
    cashout.classList.add("hidden");
    transferMoney.classList.add("hidden");
    getBonus.classList.add("hidden");
    payBill.classList.add("hidden");
    history.classList.add("hidden");

    const selected = document.getElementById(id);
    selected.classList.remove("hidden");
    
}

function showHome() {
    const latestPayment = document.getElementById("latest-payment");
    const addMoney = document.getElementById("add-money");
    const cashout = document.getElementById("cashout");
    const transferMoney = document.getElementById("transfer-money");
    const getBonus = document.getElementById("get-bonus");
    const payBill = document.getElementById("pay-bill");
    const history = document.getElementById("history");

    latestPayment.classList.remove("hidden");
    addMoney.classList.add("hidden");
    cashout.classList.add("hidden");
    transferMoney.classList.add("hidden");
    getBonus.classList.add("hidden");
    payBill.classList.add("hidden");
    history.classList.add("hidden");
}