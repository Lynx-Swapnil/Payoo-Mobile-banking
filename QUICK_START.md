# Quick Start Guide

## 🚀 Easiest Way to Start Payoo MFS

You have **3 simple options** to start both backend and frontend together:

---

## Option 1: Batch Script (Easiest!) ⭐

**Just double-click the file!**

1. Find `start.bat` in the project folder
2. Double-click it
3. Done! Both servers start automatically
4. Browser opens to http://localhost:8000

**What it does:**
- Opens Backend in one terminal window (port 3000)
- Opens Frontend in another terminal window (port 8000)
- Auto-opens your browser
- To stop: Close both terminal windows

---

## Option 2: PowerShell Script

**For PowerShell users:**

1. Right-click `start.ps1`
2. Select "Run with PowerShell"
3. Done!

*(If you get a security error, run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and try again)*

---

## Option 3: NPM Command (One Line!)

**From the project root directory:**

```bash
npm start
```

That's it! Both servers start together in the same terminal.

**Other useful commands:**
```bash
npm run dev          # Start with backend auto-reload
npm run backend      # Start only backend
npm run frontend     # Start only frontend
```

---

## 📦 First Time Setup

**Before using any method above, install dependencies once:**

```bash
cd server
npm install
cd ..
npm install
```

Or use the quick command:
```bash
npm run install-all
npm install
```

---

## 🌐 Access the Application

After starting:
- **Frontend (Website)**: http://localhost:8000
- **Backend (API)**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

---

## ❌ Stopping the Servers

**Batch/PowerShell Script:**
- Just close the terminal windows that opened

**NPM Command:**
- Press `Ctrl + C` in the terminal

---

## 🎯 Summary

**Previously:** Start backend → Start frontend → Manually open browser

**Now:** Double-click `start.bat` → Everything starts automatically! 🎉

Choose whichever method is easiest for you!
