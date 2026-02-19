const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { queries } = require('./database');

const JWT_SECRET = process.env.JWT_SECRET || 'payoo_secret_key';

// Register new user
function register(phoneNumber, pin) {
    try {
        // Validate inputs
        if (!phoneNumber || phoneNumber.length !== 11) {
            return { success: false, message: 'Phone number must be 11 digits' };
        }
        
        if (!pin || pin.length !== 4) {
            return { success: false, message: 'PIN must be 4 digits' };
        }

        // Check if user exists
        const existingUser = queries.getUserByPhone(phoneNumber);
        if (existingUser) {
            return { success: false, message: 'Phone number already registered' };
        }

        // Hash PIN
        const pinHash = bcrypt.hashSync(pin, 10);

        // Create user with initial balance
        const user = queries.createUser(phoneNumber, pinHash, 1234.56);
        
        // Generate token
        const token = jwt.sign(
            { userId: user.id, phone: user.phone_number },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            success: true,
            token,
            user: {
                id: user.id,
                phoneNumber: user.phoneNumber,
                balance: user.balance
            }
        };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, message: 'Registration failed' };
    }
}

// Login user
function login(phoneNumber, pin) {
    try {
        // Validate inputs
        if (!phoneNumber || phoneNumber.length !== 11) {
            return { success: false, message: 'Phone number must be 11 digits' };
        }

        // Get user
        const user = queries.getUserByPhone(phoneNumber);
        if (!user) {
            return { success: false, message: 'Invalid phone number or PIN' };
        }

        // Verify PIN
        const isValidPin = bcrypt.compareSync(pin, user.pinHash);
        if (!isValidPin) {
            return { success: false, message: 'Invalid phone number or PIN' };
        }

        // Generate token
        const token = jwt.sign(
            { userId: user.id, phone: user.phone_number },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            success: true,
            token,
            user: {
                id: user.id,
                phoneNumber: user.phone_number,
                balance: user.balance
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed' };
    }
}

// Verify token middleware
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

module.exports = {
    register,
    login,
    verifyToken
};
