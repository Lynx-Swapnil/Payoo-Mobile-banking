# 🚀 Production Deployment Checklist

Use this checklist when deploying to production:

## Before Deployment

### 1. Configure Production Backend URL
- [ ] Edit `script/api.js`
- [ ] Change line 5: `'https://payoo-backend.onrender.com/api'` to YOUR backend URL
- [ ] Format: `'https://your-backend-name.onrender.com/api'`

### 2. Update CORS Settings
- [ ] Edit `server/server.js`
- [ ] Find `app.use(cors({...}))`
- [ ] Add your frontend URL to the origin array
- [ ] Example: `origin: ['http://localhost:8000', 'https://your-frontend.onrender.com']`

### 3. Secure Environment Variables
- [ ] On Render dashboard → Environment Variables
- [ ] Set `JWT_SECRET` to a strong random string (64+ characters)
- [ ] Set `NODE_ENV` to `production`
- [ ] Set `PORT` to `3000`

### 4. Test Locally First
- [ ] Run `npm start` from project root
- [ ] Test all features work
- [ ] Check browser console for errors
- [ ] Verify all transactions complete successfully

## During Deployment

### Backend (Render.com)
- [ ] Connect GitHub repository
- [ ] Build command: `cd server && npm install`
- [ ] Start command: `cd server && npm start`
- [ ] Add environment variables
- [ ] Deploy and get URL

### Frontend (Render.com/Vercel/Netlify)
- [ ] Connect GitHub repository
- [ ] No build command needed (static site)
- [ ] Publish directory: `.` (root)
- [ ] Deploy and get URL

## After Deployment

### 1. Test Live Site
- [ ] Visit your frontend URL
- [ ] Open browser console (F12)
- [ ] Test registration
- [ ] Test login
- [ ] Test each feature:
  - [ ] Add Money
  - [ ] Cashout
  - [ ] Transfer
  - [ ] Get Bonus (try coupon: PAYOO100)
  - [ ] Pay Bill
  - [ ] View Transaction History
- [ ] Check for console errors
- [ ] Verify transactions persist after page reload

### 2. Check Backend Health
- [ ] Visit: `https://your-backend.onrender.com/api/health`
- [ ] Should see: `{"status": "ok", "message": "Payoo API is running"}`

### 3. Monitor First Week
- [ ] Check Render logs for errors
- [ ] Test from different devices/browsers
- [ ] Monitor response times (first request after sleep = ~30s)

## Common Issues & Fixes

### "Cannot connect to API"
- Check backend is running (visit /api/health endpoint)
- Verify API_BASE_URL in api.js matches your backend URL
- Check CORS includes your frontend domain

### "401 Unauthorized" errors
- Check JWT_SECRET is set in backend environment
- Try logging out and back in
- Check token expiration (24 hours default)

### Backend sleeps (Free tier)
- Expected behavior on Render free tier
- Sleeps after 15 minutes inactivity
- First request takes ~30 seconds to wake
- Consider paid tier ($7/month) for always-on

### Database not persisting
- JSON file resets on Render redeploy
- Upgrade to MongoDB Atlas (free 512MB)
- Or use PostgreSQL (Render offers free tier)

## Security Best Practices

- [ ] Never commit `.env` file (it's in `.gitignore`)
- [ ] Use strong JWT_SECRET (not "payoo_secret_key")
- [ ] Update CORS to only production domains (remove localhost)
- [ ] Consider rate limiting for API endpoints
- [ ] Add input sanitization for production use

## Performance Optimization

- [ ] Enable compression in Express
- [ ] Consider CDN for static assets
- [ ] Add caching headers
- [ ] Monitor and log errors
- [ ] Set up uptime monitoring (UptimeRobot - free)

## Share Your App!

Once everything is tested:
- ✅ Share frontend URL with anyone
- ✅ Add to your portfolio
- ✅ Include in your resume
- ✅ Share on LinkedIn/Twitter

**Your Live URLs:**
- Frontend: `https://_________________.com`
- Backend: `https://_________________.com`

---

**Happy Deploying!** 🚀

If you need help, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.
