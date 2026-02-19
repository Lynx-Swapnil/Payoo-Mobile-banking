// API Configuration
// Automatically detect if running locally or on production
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'  // Local development
    : 'https://payoo-mobile-banking.onrender.com/api';  // Production - Your actual backend URL

// Get token from localStorage
function getToken() {
    return localStorage.getItem('payoo_token');
}

// Set token in localStorage
function setToken(token) {
    localStorage.setItem('payoo_token', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('payoo_token');
}

// API request wrapper
async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth API calls
const AuthAPI = {
    async register(phoneNumber, pin) {
        return apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber, pin })
        });
    },
    
    async login(phoneNumber, pin) {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ phoneNumber, pin })
        });
    },
    
    async getProfile() {
        return apiRequest('/user/profile');
    }
};

// Transaction API calls
const TransactionAPI = {
    async addMoney(bank, accountNumber, amount, pin) {
        return apiRequest('/transactions/add-money', {
            method: 'POST',
            body: JSON.stringify({ bank, accountNumber, amount, pin })
        });
    },
    
    async cashout(agentNumber, amount, pin) {
        return apiRequest('/transactions/cashout', {
            method: 'POST',
            body: JSON.stringify({ agentNumber, amount, pin })
        });
    },
    
    async transfer(recipientNumber, amount, pin) {
        return apiRequest('/transactions/transfer', {
            method: 'POST',
            body: JSON.stringify({ recipientNumber, amount, pin })
        });
    },
    
    async getBonus(couponCode) {
        return apiRequest('/transactions/bonus', {
            method: 'POST',
            body: JSON.stringify({ couponCode })
        });
    },
    
    async payBill(service, accountNumber, amount, pin) {
        return apiRequest('/transactions/pay-bill', {
            method: 'POST',
            body: JSON.stringify({ service, accountNumber, amount, pin })
        });
    },
    
    async getHistory(limit) {
        const query = limit ? `?limit=${limit}` : '';
        return apiRequest(`/transactions/history${query}`);
    },
    
    async clearHistory() {
        return apiRequest('/transactions/history', {
            method: 'DELETE'
        });
    }
};

// Export for use in other files
window.AuthAPI = AuthAPI;
window.TransactionAPI = TransactionAPI;
window.getToken = getToken;
window.setToken = setToken;
window.removeToken = removeToken;
