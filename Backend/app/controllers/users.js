let UserModel = require('../models/users');

// GET all users
module.exports.list = async function (req, res, next) {
    try {
        let list = await UserModel.find();
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// GET user by id
module.exports.getById = async function (req, res, next) {
    try {
        let user = await UserModel.findById(req.params.id);
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
        let newUser = await UserModel.create(req.body);
        console.log(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// PUT update user by id
module.exports.update = async function (req, res, next) {
    try {
        let user = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
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