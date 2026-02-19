# Payoo Backend API

Node.js + Express + SQLite backend for the Payoo MFS application.

## 📦 Installation

```bash
cd server
npm install
```

## 🚀 Running the Server

```bash
npm start
```

Or with auto-reload (nodemon):

```bash
npm run dev
```

Server will run at: http://localhost:3000

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/user/profile` - Get user profile (requires auth)

### Transactions
- `POST /api/transactions/add-money` - Add money from bank
- `POST /api/transactions/cashout` - Cashout to agent  
- `POST /api/transactions/transfer` - Transfer to another user
- `POST /api/transactions/bonus` - Redeem coupon code
- `POST /api/transactions/pay-bill` - Pay utility bill
- `GET /api/transactions/history` - Get transaction history
- `DELETE /api/transactions/history` - Clear transaction history

### Health
- `GET /api/health` - Check API status

## 🗄️ Database

SQLite database is automatically created at `server/payoo.db`

### Tables:
- `users` - User accounts with encrypted PINs
- `transactions` - All transaction records
- `coupons` - Available coupon codes
- `used_coupons` - Track which users used which coupons

## 🔐 Security Features

- JWT tokens for authentication
- bcrypt password hashing
- CORS enabled
- Input validation
- PIN verification on all transactions

## 📝 Environment Variables

Create a `.env` file in the server directory:

```
PORT=3000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🎯 Test Credentials

Register a new user or use the test account:
- Phone: Any 11-digit number
- PIN: Any 4-digit number

Initial balance: $1234.56

## 💰 Coupon Codes

- PAYOO100 - $100
- WELCOME50 - $50
- BONUS200 - $200
- SAVE25 - $25
- MEGA500 - $500

## 📊 Transaction Charges

- Cashout: 1.5% fee
- Other transactions: Free

## 🛠️ Tech Stack

- Node.js & Express
- better-sqlite3 (Database)
- bcryptjs (Password hashing)
- jsonwebtoken (Authentication)
- cors (Cross-origin requests)
- dotenv (Environment variables)
