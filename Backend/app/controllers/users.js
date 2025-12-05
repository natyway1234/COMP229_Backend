let UserModel = require('../models/users');
let bcrypt = require('bcryptjs');

module.exports.list = async function (req, res, next) {
    try {
        let list = await UserModel.find().select('-password');
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getById = async function (req, res, next) {
    try {
        let user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.create = async function(req, res, next){
    try {
        console.log("body: " + JSON.stringify(req.body));
        
        if (req.body.password) {
            const saltRounds = 10;
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        
        let newUser = await UserModel.create(req.body);
        
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        console.log(userResponse);
        res.status(201).json(userResponse);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.update = async function (req, res, next) {
    try {
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
        
        const userResponse = user.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

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

module.exports.deleteAll = async function (req, res, next) {
    try {
        let result = await UserModel.deleteMany({});
        res.json({ success: true, message: `${result.deletedCount} users deleted successfully` });
    } catch (error) {
        console.log(error);
        next(error);
    }
};