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
    const addMoney = document.getElementById("add-money");
    const cashout = document.getElementById("cashout");
    const history = document.getElementById("history");

    addMoney.classList.add("hidden");
    cashout.classList.add("hidden");
    history.classList.add("hidden");

    const selected = document.getElementById(id);
    selected.classList.remove("hidden");
    
}