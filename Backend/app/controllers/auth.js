const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

// JWT secret - in production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Sign up - create new user
module.exports.signup = async function(req, res, next) {
    try {
        console.log('Signup request received:', req.body);
        const { firstname, lastname, email, password } = req.body;

        // Validate required fields
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user (password will be hashed by pre-save hook)
        console.log('Creating new user...');
        const newUser = await UserModel.create({
            firstname,
            lastname,
            email,
            password
        });
        console.log('User created successfully:', newUser._id);

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user data (without password) and token
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token: token,
            user: {
                _id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            name: error.name,
            stack: error.stack
        });
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        // Return a more helpful error message
        return res.status(500).json({
            success: false,
            message: error.message || 'An error occurred during signup. Please try again.'
        });
    }
};

// Sign in - authenticate user
module.exports.signin = async function(req, res, next) {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user data (without password) and token
        res.json({
            success: true,
            message: 'Sign in successful',
            token: token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        next(error);
    }
};

