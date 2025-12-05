const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Authentication middleware
module.exports.requireAuth = async function(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authentication required.'
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Find user and attach to request
        const user = await UserModel.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

