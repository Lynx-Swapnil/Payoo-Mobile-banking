# 🚀 Setup Guide for GitHub Users

If you're seeing this project for the first time, follow these simple steps to run it on your machine!

## 📋 Prerequisites

You need to have installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.x) - [Download here](https://www.python.org/downloads/)

## 🔧 Setup Steps

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/payoo.git
cd payoo
```

### Step 2: Configure Environment Variables
```bash
cd server
copy .env.example .env
```

**Important:** Open the `.env` file and change `JWT_SECRET` to a random secure string:
```
JWT_SECRET=your_random_secret_key_here_make_it_long_and_secure
```

### Step 3: Install Dependencies

**Option A - Install backend only:**
```bash
cd server
npm install
```

**Option B - Install everything (from project root):**
```bash
npm run install-all
npm install
```

### Step 4: Start the Application

Choose your preferred method:

#### Method 1: Double-Click (Windows Only) ⭐ EASIEST
Just double-click `start.bat` file in the project root.
- Automatically starts both servers
- Opens your browser
- No commands needed!

#### Method 2: Single Command
```bash
npm start
```
Both servers start together in one terminal.

#### Method 3: Manual (Two Terminals)
```bash
# Terminal 1 - Start Backend
cd server
npm start

# Terminal 2 - Start Frontend
python -m http.server 8000
```

### Step 5: Access the Website
Open your browser and go to: **http://localhost:8000**

## 🎯 First Time Use

1. **Register a new account:**
   - Click "Register Now" on login page
   - Enter any 11-digit phone number
   - Create a 4-digit PIN
   - You'll get $1234.56 starting balance!

2. **Start using features:**
   - Add money from banks
   - Transfer to others
   - Use bonus coupons: `PAYOO100`, `WELCOME50`, `BONUS200`
   - Pay bills
   - View transaction history

## 🎟️ Valid Coupon Codes
Try these coupons to get free money:
- `PAYOO100` - $100 bonus
- `WELCOME50` - $50 bonus
- `BONUS200` - $200 bonus
- `SAVE25` - $25 bonus
- `MEGA500` - $500 bonus

*Each coupon works once per user!*

## ❓ Troubleshooting

### Backend won't start
- Make sure Node.js is installed: `node --version`
- Make sure you ran `npm install` in the server folder
- Check if port 3000 is available

### Frontend won't start
- Make sure Python is installed: `python --version`
- Try: `python3 -m http.server 8000` (on Mac/Linux)
- Check if port 8000 is available

### "Cannot connect to API"
- Make sure the backend server is running on port 3000
- Check browser console (F12) for error messages
- Verify `.env` file exists in server folder

## 📚 Full Documentation

For complete details, see [README.md](README.md) and [QUICK_START.md](QUICK_START.md)

## 🎉 That's It!

You're ready to explore the full-stack Payoo MFS application!

---

**Need help?** Open an issue on the GitHub repository.
