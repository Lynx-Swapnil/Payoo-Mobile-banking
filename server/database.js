const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'payoo-db.json');

// Initialize database structure
function initializeDatabase() {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            users: [],
            transactions: [],
            coupons: [
                { id: 1, code: 'PAYOO100', amount: 100, isActive: true },
                { id: 2, code: 'WELCOME50', amount: 50, isActive: true },
                { id: 3, code: 'BONUS200', amount: 200, isActive: true },
                { id: 4, code: 'SAVE25', amount: 25, isActive: true },
                { id: 5, code: 'MEGA500', amount: 500, isActive: true }
            ],
            usedCoupons: [],
            nextUserId: 1,
            nextTransactionId: 1
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
        console.log('✅ Database initialized successfully');
    } else {
        console.log('✅ Database file exists');
    }
}

// Read database
function readDB() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

// Write database
function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Database queries
const queries = {
    // User queries
    createUser(phoneNumber, pinHash, balance) {
        const db = readDB();
        const newUser = {
            id: db.nextUserId++,
            phoneNumber,
            pinHash,
            balance,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.users.push(newUser);
        writeDB(db);
        return newUser;
    },
    
    getUserByPhone(phoneNumber) {
        const db = readDB();
        return db.users.find(u => u.phoneNumber === phoneNumber);
    },
    
    getUserById(id) {
        const db = readDB();
        return db.users.find(u => u.id === id);
    },
    
    updateBalance(userId, newBalance) {
        const db = readDB();
        const user = db.users.find(u => u.id === userId);
        if (user) {
            user.balance = newBalance;
            user.updatedAt = new Date().toISOString();
            writeDB(db);
        }
    },
    
    // Transaction queries
    createTransaction(userId, type, amount, details, isPositive) {
        const db = readDB();
        const newTransaction = {
            id: db.nextTransactionId++,
            userId,
            type,
            amount,
            details,
            isPositive,
            createdAt: new Date().toISOString()
        };
        db.transactions.push(newTransaction);
        writeDB(db);
        return newTransaction;
    },
    
    getTransactions(userId, limit) {
        const db = readDB();
        const userTransactions = db.transactions
            .filter(t => t.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return limit ? userTransactions.slice(0, limit) : userTransactions;
    },
    
    deleteTransactions(userId) {
        const db = readDB();
        db.transactions = db.transactions.filter(t => t.userId !== userId);
        writeDB(db);
    },
    
    // Coupon queries
    getCouponByCode(code) {
        const db = readDB();
        return db.coupons.find(c => c.code === code && c.isActive);
    },
    
    checkCouponUsed(userId, couponId) {
        const db = readDB();
        return db.usedCoupons.find(uc => uc.userId === userId && uc.couponId === couponId);
    },
    
    markCouponAsUsed(userId, couponId) {
        const db = readDB();
        db.usedCoupons.push({
            userId,
            couponId,
            usedAt: new Date().toISOString()
        });
        writeDB(db);
    }
};

module.exports = {
    queries,
    initializeDatabase
};
