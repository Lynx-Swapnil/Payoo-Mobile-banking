console.log('Machine added');

// Initialize on page load
window.addEventListener('DOMContentLoaded', async function() {
    await checkAuthAndLoadData();
});

// Check authentication and load user data
async function checkAuthAndLoadData() {
    const token = getToken();
    
    if (!token) {
        alert('Please login first');
        window.location.assign('index.html');
        return;
    }
    
    try {
        const result = await AuthAPI.getProfile();
        
        if (result.success) {
            // Update balance display
            const balanceElement = document.getElementById('balance');
            balanceElement.innerText = result.user.balance.toFixed(2);
            
            // Load transaction history
            await loadTransactionHistory();
        } else {
            removeToken();
            alert('Session expired. Please login again.');
            window.location.assign('index.html');
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        removeToken();
        alert('Session expired. Please login again.');
        window.location.assign('index.html');
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        removeToken();
        window.location.assign('index.html');
    }
}

function getValueFromInput(id) {
    const input = document.getElementById(id);
    const value = input.value;
    console.log(id, value);
    return value;
}

function getBalance() {
    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    console.log(balance);
    return Number(balance);
}

function updateBalance(newBalance) {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = newBalance.toFixed(2);
}

function clearForm(formIds) {
    formIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
}

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function getTransactionIcon(type) {
    const icons = {
        'Add Money': 'fa-solid fa-arrow-down',
        'Cashout': 'fa-solid fa-arrow-up',
        'Transfer Money': 'fa-solid fa-paper-plane',
        'Get Bonus': 'fa-solid fa-gift',
        'Pay Bill': 'fa-solid fa-file-invoice-dollar'
    };
    return icons[type] || 'fa-solid fa-circle-dollar';
}

async function loadTransactionHistory() {
    try {
        const result = await TransactionAPI.getHistory();
        
        if (!result.success) {
            throw new Error(result.message);
        }
        
        const transactions = result.transactions;
        const history = document.getElementById("history-container");
        
        if (transactions.length === 0) {
            history.innerHTML = `
                <div class="text-center py-10">
                    <i class="fa-solid fa-receipt text-5xl text-neutral/20 mb-4"></i>
                    <p class="text-neutral/50">No transactions yet</p>
                </div>
            `;
            return;
        }

        history.innerHTML = '';
        transactions.forEach(transaction => {
            const newHistory = document.createElement("div");
            const icon = getTransactionIcon(transaction.type);
            const color = transaction.isPositive ? 'text-green-600' : 'text-red-600';
            const sign = transaction.isPositive ? '+' : '-';
            
            newHistory.innerHTML = `
                <div class="card bg-base-100 shadow-sm">
                    <div class="card-body py-4 px-5">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start gap-4">
                                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="${icon} text-primary text-xl"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-bold text-base">${transaction.type}</h3>
                                    <p class="text-sm text-neutral/70 mt-1">${transaction.details}</p>
                                    <p class="text-xs text-neutral/50 mt-2">${formatDate(new Date(transaction.date))}</p>
                                </div>
                            </div>
                            <div class="${color} font-bold text-lg">
                                ${sign}$${transaction.amount}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            history.appendChild(newHistory);
        });
    } catch (error) {
        console.error('Load history error:', error);
        const history = document.getElementById("history-container");
        history.innerHTML = `
            <div class="text-center py-10">
                <i class="fa-solid fa-exclamation-triangle text-5xl text-error/20 mb-4"></i>
                <p class="text-neutral/50">Failed to load transactions</p>
            </div>
        `;
    }
}

async function clearHistory() {
    if (confirm('Are you sure you want to clear all transaction history? This cannot be undone.')) {
        try {
            const result = await TransactionAPI.clearHistory();
            
            if (result.success) {
                await loadTransactionHistory();
                alert('Transaction history cleared successfully!');
            } else {
                alert(result.message || 'Failed to clear history');
            }
        } catch (error) {
            alert(error.message || 'Failed to clear history');
        }
    }
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
