let UserModel = require('../models/users');
let bcrypt = require('bcryptjs');

// GET all users
module.exports.list = async function (req, res, next) {
    try {
        let list = await UserModel.find().select('-password'); // Exclude password from response
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// GET user by id
module.exports.getById = async function (req, res, next) {
    try {
        let user = await UserModel.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// POST create new user
module.exports.create = async function(req, res, next){
    try {
        console.log("body: " + JSON.stringify(req.body));
        
        // Hash password if provided
        if (req.body.password) {
            const saltRounds = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        
        let newUser = await UserModel.create(req.body);
        
        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        console.log(userResponse);
        res.status(201).json(userResponse);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// PUT update user by id
module.exports.update = async function (req, res, next) {
    try {
        // Hash password if provided in update
        if (req.body.password) {
            const saltRounds = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        
        let user = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE user by id
module.exports.delete = async function (req, res, next) {
    try {
        let user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE all users
module.exports.deleteAll = async function (req, res, next) {
    try {
        let result = await UserModel.deleteMany({});
        res.json({ success: true, message: `${result.deletedCount} users deleted successfully` });
    } catch (error) {
        console.log(error);
        next(error);
    }
};