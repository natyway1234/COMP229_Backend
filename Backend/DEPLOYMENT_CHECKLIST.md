# Backend Deployment Checklist

## ⚠️ CRITICAL: Your backend on Render needs to be redeployed with the latest code!

### Files That Must Be Deployed:

1. ✅ `Backend/app/routers/auth.js` - Must exist with signup/signin routes
2. ✅ `Backend/app/controllers/auth.js` - Must exist with signup/signin controllers  
3. ✅ `Backend/app/middleware/auth.js` - Must exist for authentication
4. ✅ `Backend/server.js` - Must have `app.use('/api/auth', authRouter);` on line 33
5. ✅ `Backend/package.json` - Must have `bcryptjs` and `jsonwebtoken` dependencies

### Steps to Fix the 404 Error:

#### Step 1: Verify Your Code is Committed
Make sure all your backend code is committed to your Git repository:
```bash
cd "C:\Users\natyw\Downloads\Web Application\Assignment 2\COMP229_Backend-main\COMP229_Backend\Backend"
git status
git add .
git commit -m "Add authentication routes and controllers"
git push
```

#### Step 2: Redeploy on Render
1. Go to https://dashboard.render.com
2. Find your backend service (`comp229-backend-f9fs`)
3. Click on it
4. Go to "Manual Deploy" → "Deploy latest commit"
5. Wait for deployment to complete (usually 2-5 minutes)
6. Check the logs to ensure deployment succeeded

#### Step 3: Verify Deployment
After deployment, test these URLs in your browser:

1. **Base API**: `https://comp229-backend-f9fs.onrender.com/api`
   - Should return: `{"message":"Welcome to My Portfolio",...}`

2. **Auth endpoint (will show method error, not 404)**: 
   - Try: `https://comp229-backend-f9fs.onrender.com/api/auth/signup`
   - Should return: Method not allowed (GET) or similar - NOT 404

#### Step 4: Check Render Logs
1. In Render dashboard → Your service → "Logs" tab
2. Look for:
   - ✅ `Server running at http://localhost:...`
   - ✅ `====> Successfully connected to MongoDB.`
   - ❌ Any errors about missing files or modules

### Common Issues:

**Issue 1: Missing Dependencies**
- Error: `Cannot find module 'bcryptjs'` or `Cannot find module 'jsonwebtoken'`
- Fix: Make sure `package.json` has these dependencies and run `npm install` on Render

**Issue 2: Wrong Working Directory**
- Render might be looking in the wrong folder
- Fix: Check "Root Directory" in Render settings - should be `Backend` or the folder containing `server.js`

**Issue 3: Build Command**
- Render needs to install dependencies
- Fix: Build command should be: `npm install` (or just leave blank, Render auto-detects)

**Issue 4: Start Command**
- Render needs to know how to start the server
- Fix: Start command should be: `node server.js` or `npm start`

### Quick Test Script

After deployment, you can test the signup endpoint with this curl command (in Git Bash or WSL):

```bash
curl -X POST https://comp229-backend-f9fs.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Test","lastname":"User","email":"test@example.com","password":"test123"}'
```

Expected response (success):
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "...",
  "user": {...}
}
```

Expected response (if endpoint doesn't exist - 404):
```json
{
  "success": false,
  "message": "Not Found"
}
```

### If Still Getting 404 After Redeployment:

1. **Check file structure on Render:**
   - The `Backend` folder structure must match your local structure
   - `server.js` should be in the root of the deployed folder

2. **Check Render build logs:**
   - Look for any errors during the build process
   - Make sure all files are being uploaded

3. **Verify route registration:**
   - Check logs for: `Server running at...`
   - The server should start without errors

4. **Test locally first:**
   - Run `npm install` in the Backend folder
   - Run `npm start` or `node server.js`
   - Test: `http://localhost:3000/api/auth/signup` (should not be 404)

