let ServiceModel = require('../models/services');

module.exports.list = async function (req, res, next) {
    try {
        let list = await ServiceModel.find();
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getById = async function (req, res, next) {
    try {
        let service = await ServiceModel.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.create = async function (req, res, next) {
    try {
        console.log("body: " + JSON.stringify(req.body));
        let newService = await ServiceModel.create(req.body);
        console.log(newService);
        res.status(201).json(newService);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.update = async function (req, res, next) {
    try {
        let service = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.delete = async function (req, res, next) {
    try {
        let service = await ServiceModel.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.deleteAll = async function (req, res, next) {
    try {
        let result = await ServiceModel.deleteMany({});
        res.json({ success: true, message: `${result.deletedCount} services deleted successfully` });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

