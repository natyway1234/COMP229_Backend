# 🚨 URGENT: Fix Backend 404 Error on Render

## The Problem
Your backend is returning 404 for `/api/auth/signup` because the authentication routes are not deployed.

## ✅ SOLUTION: Follow These Steps Exactly

### Step 1: Verify Files Exist Locally
Check that these files exist in your `Backend` folder:
- ✅ `Backend/app/routers/auth.js`
- ✅ `Backend/app/controllers/auth.js`
- ✅ `Backend/app/middleware/auth.js`
- ✅ `Backend/server.js` (with line 33: `app.use('/api/auth', authRouter);`)

### Step 2: Push to Git Repository
```bash
cd "C:\Users\natyw\Downloads\Web Application\Assignment 2\COMP229_Backend-main\COMP229_Backend\Backend"

# Check what files need to be committed
git status

# Add all files
git add .

# Commit
git commit -m "Add authentication routes and controllers"

# Push to repository
git push origin main
# (or git push origin master, depending on your branch name)
```

### Step 3: Check Render Service Settings

1. Go to https://dashboard.render.com
2. Click on your backend service
3. Go to "Settings" tab
4. **CRITICAL SETTINGS TO CHECK:**

   **Root Directory:**
   - Should be: `Backend` (if your repo root is `COMP229_Backend`)
   - OR: Leave blank if `server.js` is in the repo root
   - **Check this carefully!** Wrong root directory = 404 errors

   **Build Command:**
   - Should be: `npm install`
   - OR: Leave blank (Render auto-detects)

   **Start Command:**
   - Should be: `node server.js`
   - OR: `npm start`

### Step 4: Redeploy on Render

1. In Render dashboard → Your backend service
2. Click "Manual Deploy" → "Deploy latest commit"
3. **WAIT** for deployment to complete (2-5 minutes)
4. Watch the logs for:
   - ✅ `Server running at http://localhost:...`
   - ✅ `Registering routes...`
   - ✅ `All routes registered successfully`
   - ✅ `Auth routes available at: /api/auth/signup and /api/auth/signin`
   - ❌ Any errors about missing files

### Step 5: Test After Deployment

**Test 1: Base API**
```
https://comp229-backend-f9fs.onrender.com/api
```
Should return JSON with message about endpoints.

**Test 2: Auth Route (GET will fail, but should NOT be 404)**
```
https://comp229-backend-f9fs.onrender.com/api/auth/signup
```
- If 404: Route not deployed ❌
- If "Method not allowed" or similar: Route exists ✅

**Test 3: Try Signup from Frontend**
- Should work now if routes are deployed

## 🔍 Debugging: Check Render Logs

After deployment, check logs for:

**✅ Good Signs:**
```
Registering routes...
  - /api (index)
  - /api/auth (authentication)
✅ All routes registered successfully
✅ Auth routes available at: /api/auth/signup and /api/auth/signin
Server running at http://localhost:10000/
```

**❌ Bad Signs:**
```
Cannot find module './app/routers/auth.js'
Error: Cannot find module 'bcryptjs'
Error: Cannot find module 'jsonwebtoken'
```

## 🆘 If Still Not Working

### Option A: Check Root Directory
If your Render "Root Directory" is wrong:
- Your files might be at: `COMP229_Backend/Backend/`
- But Render is looking at: `COMP229_Backend/`
- **Fix**: Set Root Directory to `Backend`

### Option B: Verify File Structure on Render
The deployed structure should be:
```
/
  server.js
  package.json
  app/
    routers/
      auth.js  ← MUST EXIST
    controllers/
      auth.js  ← MUST EXIST
    middleware/
      auth.js  ← MUST EXIST
```

### Option C: Test Locally First
```bash
cd Backend
npm install
node server.js
```
Then test: `http://localhost:3000/api/auth/signup` (should NOT be 404)

If local works but Render doesn't → Deployment issue
If local doesn't work → Code issue

## 📝 Quick Checklist

- [ ] All auth files exist locally
- [ ] Files are committed to Git
- [ ] Files are pushed to repository
- [ ] Render Root Directory is correct
- [ ] Render is connected to correct Git repo/branch
- [ ] Backend redeployed on Render
- [ ] Deployment logs show no errors
- [ ] `/api` endpoint works
- [ ] `/api/auth/signup` doesn't return 404

