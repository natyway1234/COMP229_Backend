// Quick test script to verify routes are working
// Run with: node test-routes.js

const express = require('express');
const app = express();

// Test if auth router can be loaded
try {
    const authRouter = require('./app/routers/auth.js');
    console.log('✅ Auth router loaded successfully');
    
    const authController = require('./app/controllers/auth.js');
    console.log('✅ Auth controller loaded successfully');
    
    const authMiddleware = require('./app/middleware/auth.js');
    console.log('✅ Auth middleware loaded successfully');
    
    console.log('\n✅ All authentication files are present and can be loaded!');
    console.log('\nRoutes should be available at:');
    console.log('  - POST /api/auth/signup');
    console.log('  - POST /api/auth/signin');
    
} catch (error) {
    console.error('❌ Error loading authentication files:');
    console.error(error.message);
    console.error('\nPlease check:');
    console.error('  1. All files exist in the correct locations');
    console.error('  2. Dependencies are installed (npm install)');
    console.error('  3. File paths are correct');
}

