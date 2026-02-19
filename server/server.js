require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase, queries } = require('./database');
const { register, login, verifyToken } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS Configuration - Allow frontend to access backend API
app.use(cors({
    origin: [
        'http://localhost:8000',                              // Local development
        'http://127.0.0.1:8000',                              // Local development
        'https://payoo-mobile-banking-1.onrender.com'         // Production frontend
    ],
    credentials: true
}));
app.use(express.json());

// Initialize database
initializeDatabase();

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', (req, res) => {
    const { phoneNumber, pin } = req.body;
    const result = register(phoneNumber, pin);
    
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(400).json(result);
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { phoneNumber, pin } = req.body;
    const result = login(phoneNumber, pin);
    
    if (result.success) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});

// Get user profile
app.get('/api/user/profile', verifyToken, (req, res) => {
    try {
        const user = queries.getUserById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.json({
            success: true,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                balance: user.balance
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ==================== TRANSACTION ROUTES ====================

// Add money
app.post('/api/transactions/add-money', verifyToken, (req, res) => {
    const { bank, accountNumber, amount, pin } = req.body;
    
    try {
        // Validate inputs
        if (!bank || bank === 'Select a Bank') {
            return res.status(400).json({ success: false, message: 'Please select a bank' });
        }
        
        if (!accountNumber || accountNumber.length !== 11) {
            return res.status(400).json({ success: false, message: 'Invalid account number' });
        }
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Get user and verify PIN
        const user = queries.getUserById(req.userId);
        const bcrypt = require('bcryptjs');
        if (!bcrypt.compareSync(pin, user.pinHash)) {
            return res.status(401).json({ success: false, message: 'Invalid PIN' });
        }

        // Update balance
        const newBalance = user.balance + parseFloat(amount);
        queries.updateBalance(req.userId, newBalance);

        // Create transaction record
        const details = `Added from ${bank} • Acc: ${accountNumber}`;
        queries.createTransaction(req.userId, 'Add Money', amount, details, 1);

        res.json({
            success: true,
            message: 'Money added successfully',
            balance: newBalance
        });
    } catch (error) {
        console.error('Add money error:', error);
        res.status(500).json({ success: false, message: 'Transaction failed' });
    }
});

// Cashout
app.post('/api/transactions/cashout', verifyToken, (req, res) => {
    const { agentNumber, amount, pin } = req.body;
    
    try {
        // Validate inputs
        if (!agentNumber || agentNumber.length !== 11) {
            return res.status(400).json({ success: false, message: 'Invalid agent number' });
        }
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Get user and verify PIN
        const user = queries.getUserById(req.userId);
        const bcrypt = require('bcryptjs');
        if (!bcrypt.compareSync(pin, user.pinHash)) {
            return res.status(401).json({ success: false, message: 'Invalid PIN' });
        }

        // Calculate charge (1.5%)
        const charge = parseFloat(amount) * 0.015;
        const totalDeduction = parseFloat(amount) + charge;

        // Check balance
        if (user.balance < totalDeduction) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance',
                required: totalDeduction,
                available: user.balance
            });
        }

        // Update balance
        const newBalance = user.balance - totalDeduction;
        queries.updateBalance(req.userId, newBalance);

        // Create transaction record
        const details = `To Agent: ${agentNumber} • Charge: $${charge.toFixed(2)}`;
        queries.createTransaction(req.userId, 'Cashout', amount, details, 0);

        res.json({
            success: true,
            message: 'Cashout successful',
            balance: newBalance,
            charge: charge
        });
    } catch (error) {
        console.error('Cashout error:', error);
        res.status(500).json({ success: false, message: 'Transaction failed' });
    }
});

// Transfer money
app.post('/api/transactions/transfer', verifyToken, (req, res) => {
    const { recipientNumber, amount, pin } = req.body;
    
    try {
        // Validate inputs
        if (!recipientNumber || recipientNumber.length !== 11) {
            return res.status(400).json({ success: false, message: 'Invalid recipient number' });
        }
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Get user and verify PIN
        const user = queries.getUserById(req.userId);
        const bcrypt = require('bcryptjs');
        if (!bcrypt.compareSync(pin, user.pinHash)) {
            return res.status(401).json({ success: false, message: 'Invalid PIN' });
        }

        // Check balance
        if (user.balance < parseFloat(amount)) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance',
                required: amount,
                available: user.balance
            });
        }

        // Update balance
        const newBalance = user.balance - parseFloat(amount);
        queries.updateBalance(req.userId, newBalance);

        // Create transaction record
        const details = `Sent to: ${recipientNumber}`;
        queries.createTransaction(req.userId, 'Transfer Money', amount, details, 0);

        res.json({
            success: true,
            message: 'Transfer successful',
            balance: newBalance
        });
    } catch (error) {
        console.error('Transfer error:', error);
        res.status(500).json({ success: false, message: 'Transaction failed' });
    }
});

// Get bonus (coupon)
app.post('/api/transactions/bonus', verifyToken, (req, res) => {
    const { couponCode } = req.body;
    
    try {
        // Validate input
        if (!couponCode || couponCode.trim() === '') {
            return res.status(400).json({ success: false, message: 'Please enter a coupon code' });
        }

        const code = couponCode.toUpperCase().trim();

        // Check if coupon exists
        const coupon = queries.getCouponByCode(code);
        if (!coupon) {
            return res.status(400).json({ success: false, message: 'Invalid coupon code' });  
        }

        // Check if already used
        const used = queries.checkCouponUsed(req.userId, coupon.id);
        if (used) {
            return res.status(400).json({ success: false, message: 'Coupon already used' });
        }

        // Get user
        const user = queries.getUserById(req.userId);

        // Update balance
        const newBalance = user.balance + coupon.amount;
        queries.updateBalance(req.userId, newBalance);

        // Mark coupon as used
        queries.markCouponAsUsed(req.userId, coupon.id);

        // Create transaction record
        const details = `Coupon: ${code}`;
        queries.createTransaction(req.userId, 'Get Bonus', coupon.amount, details, 1);

        res.json({
            success: true,
            message: 'Bonus received',
            balance: newBalance,
            amount: coupon.amount
        });
    } catch (error) {
        console.error('Bonus error:', error);
        res.status(500).json({ success: false, message: 'Transaction failed' });
    }
});

// Pay bill
app.post('/api/transactions/pay-bill', verifyToken, (req, res) => {
    const { service, accountNumber, amount, pin } = req.body;
    
    try {
        // Validate inputs
        if (!service || service === 'Select service') {
            return res.status(400).json({ success: false, message: 'Please select a service' });
        }
        
        if (!accountNumber || accountNumber.trim() === '') {
            return res.status(400).json({ success: false, message: 'Invalid account number' });
        }
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Get user and verify PIN
        const user = queries.getUserById(req.userId);
        const bcrypt = require('bcryptjs');
        if (!bcrypt.compareSync(pin, user.pinHash)) {
            return res.status(401).json({ success: false, message: 'Invalid PIN' });
        }

        // Check balance
        if (user.balance < parseFloat(amount)) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance',
                required: amount,
                available: user.balance
            });
        }

        // Update balance
        const newBalance = user.balance - parseFloat(amount);
        queries.updateBalance(req.userId, newBalance);

        // Create transaction record
        const details = `${service} Bill • Acc: ${accountNumber}`;
        queries.createTransaction(req.userId, 'Pay Bill', amount, details, 0);

        res.json({
            success: true,
            message: 'Bill paid successfully',
            balance: newBalance
        });
    } catch (error) {
        console.error('Pay bill error:', error);
        res.status(500).json({ success: false, message: 'Transaction failed' });
    }
});

// Get transaction history
app.get('/api/transactions/history', verifyToken, (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const transactions = queries.getTransactions(req.userId, limit);
        
        res.json({
            success: true,
            transactions: transactions.map(t => ({
                id: t.id,
                type: t.type,
                amount: t.amount,
                details: t.details,
                isPositive: t.isPositive,
                date: t.createdAt
            }))
        });
    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch history' });
    }
});

// Clear transaction history
app.delete('/api/transactions/history', verifyToken, (req, res) => {
    try {
        queries.deleteTransactions(req.userId);
        res.json({ success: true, message: 'History cleared' });
    } catch (error) {
        console.error('Clear history error:', error);
        res.status(500).json({ success: false, message: 'Failed to clear history' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Payoo API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Payoo API Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down gracefully...');
    process.exit(0);
});
