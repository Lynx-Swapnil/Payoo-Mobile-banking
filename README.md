# Payoo - Mobile Financial Service (MFS) Full-Stack Web Application

A fully functional full-stack mobile financial service web application built with HTML, CSS (Tailwind + DaisyUI), JavaScript, Node.js, Express, and JSON-based database.

## 🚀 Features

### Complete Functionality
- **User Authentication** - Register and login with secure JWT tokens
- **Login System** - Secure authentication with phone number (11 digits) and PIN (4 digits)
- **Add Money** - Add funds from bank accounts (DBBL, IBBL, City Bank)
- **Cashout** - Withdraw money through agents with automatic 1.5% charge calculation
- **Transfer Money** - Send money to other users
- **Get Bonus** - Redeem coupon codes for bonus money (one-time use per user)
- **Pay Bills** - Pay utility bills (Electricity, Water, Gas, Internet, Mobile)
- **Transaction History** - View all transactions with detailed information and beautiful UI

### Backend Features
- 🔒 **JWT Authentication** - Secure token-based authentication
- 🔐 **Password Hashing** - bcrypt encryption for PINs
- 💾 **Persistent Storage** - JSON-based database for all data
- 🛡️ **Input Validation** - Comprehensive server-side validation
- 📊 **Transaction Tracking** - Complete audit trail of all operations
- 🎁 **Coupon Management** - Track used coupons to prevent reuse

### Frontend Features
- 💾 **API Integration** - All features connected to backend API
- 🔒 **Form Validation** - Comprehensive input validation for all fields
- 💰 **Cashout Charges** - Automatic 1.5% charge calculation display
- 📊 **Transaction Tracking** - Beautiful UI with icons and color-coded transactions
- 🎁 **Coupon System** - Multiple valid coupons with usage tracking
- 🧹 **Clear History** - Option to clear transaction history
- ✨ **Auto Form Clear** - Forms automatically reset after successful transactions
- 🏠 **Auto Navigate** - Returns to home screen after transactions

## 🏗️ Architecture

```
payoo/
├── Frontend (Client)
│   ├── index.html           # Login page
│   ├── register.html        # Registration page
│   ├── home.html            # Main dashboard
│   └── script/
│       ├── api.js          # API client wrapper
│       ├── login.js        # Login functionality
│       ├── register.js     # Registration functionality
│       ├── machine.js      # Core utilities and helpers
│       ├── add-money.js    # Add money feature
│       ├── cashout.js      # Cashout feature
│       ├── transfer-money.js # Transfer feature
│       ├── bonus.js        # Bonus coupon feature
│       └── pay-bill.js     # Bill payment feature
│
└── Backend (Server)
    ├── server.js           # Express API server
    ├── database.js         # JSON database operations
    ├── auth.js             # Authentication logic
    ├── .env                # Environment variables
    ├── payoo-db.json       # JSON database file
    └── package.json        # Node dependencies
```

## 📦 Installation & Setup

### Quick Start (Recommended) 🚀

**Option 1: Double-click to start (Windows)**
1. Install backend dependencies first:
   ```bash
   cd server
   npm install
   ```
2. Simply **double-click** `start.bat` (Command Prompt) or `start.ps1` (PowerShell)
3. Both servers start automatically in separate windows!
4. Browser opens automatically at http://localhost:8000

**Option 2: Single command (with npm)**
1. Install all dependencies:
   ```bash
   npm run install-all
   npm install
   ```
2. Start both servers with one command:
   ```bash
   npm start
   ```

### Manual Setup (Traditional Way)

#### Backend Setup

1. **Install Node.js dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start the API server:**
   ```bash
   npm start
   ```
   
   Or with auto-reload:
   ```bash
   npm run dev
   ```

   Server runs at: `http://localhost:3000`

#### Frontend Setup

1. **Open the website:**
   - Simply open `index.html` in a browser, or
   - Use a local server (recommended):
     ```bash
     # From the project root
     python -m http.server 8000
     ```
   - Then visit: `http://localhost:8000`

## 🎯 Available Commands

From the project root:
- `npm start` - Start both backend and frontend together
- `npm run backend` - Start only backend server
- `npm run frontend` - Start only frontend server
- `npm run dev` - Start both with backend auto-reload
- `npm run install-all` - Install backend dependencies

Or use the startup scripts:
- **Windows**: Double-click `start.bat` or `start.ps1`
- Opens both servers in separate terminal windows
- Automatically opens browser

## ☁️ Cloud Deployment (Share with Anyone!)

Want to deploy online so anyone can access with just a link? 

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions!**

### Quick Summary:
1. **Deploy Backend** → Render.com (FREE)
2. **Deploy Frontend** → Render.com/Vercel/Netlify (FREE)
3. **Share Link** → Anyone can use it! 🌍

**Recommended Platform**: [Render.com](https://render.com) - 100% free for both frontend and backend!

The `script/api.js` automatically detects local vs production, so deployment is seamless.

## 🔐 Test Credentials

### Option 1: Create New Account
- Go to [register.html](register.html)
- Enter any 11-digit phone number
- Create any 4-digit PIN
- Get $1234.56 starting balance!

### Option 2: Use Existing Account (if created)
- Login with your registered credentials

## 🎟️ Valid Coupon Codes

- `PAYOO100` - $100 bonus
- `WELCOME50` - $50 bonus
- `BONUS200` - $200 bonus
- `SAVE25` - $25 bonus
- `MEGA500` - $500 bonus

*Note: Each coupon can only be used once per user.*

## 💳 Available Banks

- DBBL (Dutch-Bangla Bank Limited)
- IBBL (Islami Bank Bangladesh Limited)
- City Bank

## 📋 Bill Payment Services

- Electricity
- Water
- Gas
- Internet
- Mobile

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Structure
- **Tailwind CSS** - Styling framework
- **DaisyUI** - Component library
- **JavaScript (Vanilla)** - Functionality & API calls
- **Font Awesome** - Icons
- **Google Fonts (Outfit)** - Typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JSON File Storage** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/user/profile` - Get user profile (requires auth)

### Transactions (All require authentication)
- `POST /api/transactions/add-money` - Add money from bank
- `POST /api/transactions/cashout` - Cashout to agent  
- `POST /api/transactions/transfer` - Transfer to another user
- `POST /api/transactions/bonus` - Redeem coupon code
- `POST /api/transactions/pay-bill` - Pay utility bill
- `GET /api/transactions/history` - Get transaction history
- `DELETE /api/transactions/history` - Clear transaction history

### Health Check
- `GET /api/health` - Check API status

## 🎯 How to Use

1. **Register/Login**: Create account or login with credentials
2. **Add Money**: Select a bank, enter account details (11 digits), amount, and PIN (4 digits)
3. **Cashout**: Enter agent number (11 digits), amount, and PIN (1.5% charge applies)
4. **Transfer**: Enter recipient number (11 digits), amount, and PIN
5. **Get Bonus**: Enter a valid coupon code
6. **Pay Bill**: Select service, enter account number, amount, and PIN
7. **View History**: Click the Transactions button to see all your transactions

## 🌐 Deploying to GitHub

### For You (Pushing to GitHub)

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Full-stack Payoo MFS application"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/payoo.git
   git branch -M main
   git push -u origin main
   ```

**Important Notes:**
- ✅ `.gitignore` is already configured (excludes `node_modules`, `.env`, database file)
- ✅ Documentation is complete (README.md, QUICK_START.md)
- ⚠️ The `.env` file will NOT be pushed (it's in `.gitignore` for security)
- ✅ An `.env.example` file is included for others to reference

### For Others (Cloning and Running Your Project)

When someone clones your repository from GitHub, they need to follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/payoo.git
   cd payoo
   ```

2. **Setup environment variables:**
   ```bash
   cd server
   copy .env.example .env
   ```
   Then edit `.env` and change `JWT_SECRET` to a secure random string.

3. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```
   (Or from root: `npm run install-all` and `npm install`)

4. **Start the application:**
   
   **Easiest way - Double-click:**
   - Windows users can just double-click `start.bat`
   
   **Or use command:**
   ```bash
   npm start
   ```
   
   **Or manually:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
   python -m http.server 8000
   ```

5. **Access the website:**
   - Open browser to `http://localhost:8000`
   - Register a new account to start using!

### What They Get
- ✅ Full source code
- ✅ Complete documentation
- ✅ Easy startup scripts
- ✅ All dependencies listed in package.json
- ✅ Ready to run - just install and start!

**Note:** Since the database file (`payoo-db.json`) is in `.gitignore`, it will be created fresh on first run. Each clone starts with a clean database.

## ✅ Validation Rules

- Phone/Account numbers must be exactly 11 digits
- PIN must be exactly 4 digits
- Amounts must be positive numbers
- Sufficient balance required for withdrawals/transfers/bill payments
- Bank/Service selection is mandatory
- Coupons can only be used once per user
- JWT token required for all transaction endpoints

## 🔄 Recent Improvements

### Full-Stack Implementation
- ✅ Added Node.js + Express backend API
- ✅ Implemented JWT authentication
- ✅ Created JSON-based database
- ✅ Added user registration system
- ✅ Secure PIN hashing with bcrypt
- ✅ API integration for all features
- ✅ Server-side validation
- ✅ CORS enabled for local development

### Frontend Updates
- ✅ API client wrapper for all endpoints
- ✅ Registration page added
- ✅ Token-based authentication
- ✅ Auto session checking
- ✅ Loading states on buttons
- ✅ Improved error messages

### Backend Features
- ✅ RESTful API design
- ✅ Middleware for authentication
- ✅ Transaction logging
- ✅ Coupon usage tracking
- ✅ Balance verification
- ✅ Charge calculation

## 🌟 Future Enhancements (Optional)

- Add PostgreSQL/MongoDB for production
- Email/SMS notifications
- Transaction receipts (PDF)
- Multi-currency support
- Biometric authentication
- Mobile app (React Native)
- Admin dashboard
- Transaction limits and KYC
- QR code payments
- Dark mode toggle

## 📱 Browser Support

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🛡️ Security Features

- JWT tokens with expiration (24 hours)
- bcrypt password hashing (10 rounds)
- Server-side input validation
- CORS configuration
- PIN verification on all sensitive operations
- No PINs stored in plain text

## 📊 Database Structure

```json
{
  "users": [],
  "transactions": [],
  "coupons": [],
  "usedCoupons": [],
  "nextUserId": 1,
  "nextTransactionId": 1
}
```

## 📄 License

This is a demo project for learning purposes.

---

**Made with ❤️ using Node.js, Express, Tailwind CSS & DaisyUI**

## 👥 Contributing

This is an educational project. Feel free to fork and enhance!

## 📞 Support

For issues or questions, please open an issue on the repository.

