// Quick test to verify server starts and routes are registered
const express = require('express');
const app = express();

// Load the routers
try {
    const authRouter = require('./app/routers/auth.js');
    console.log('✅ Auth router loaded');
    
    app.use(express.json());
    app.use('/api/auth', authRouter);
    
    app.listen(3001, () => {
        console.log('Test server running on http://localhost:3001');
        console.log('Test: POST http://localhost:3001/api/auth/signup');
        console.log('\nPress Ctrl+C to stop');
    });
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}

