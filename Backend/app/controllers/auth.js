let UserModel = require('../models/users');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

// Sign up (create user with hashed password)
module.exports.signup = async function (req, res, next) {
    try {
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

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with hashed password
        const newUser = await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            { expiresIn: '24h' }
        );

        // Return user data (without password) and token
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token: token,
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        next(error);
    }
};

// Sign in (authenticate user)
module.exports.signin = async function (req, res, next) {
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

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            { expiresIn: '24h' }
        );

        // Return user data (without password) and token
        res.json({
            success: true,
            message: 'Sign in successful',
            token: token,
            user: {
                id: user._id,
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

