let ProjectModel = require('../models/projects');

module.exports.list = async function (req, res, next) {
    try {
        let list = await ProjectModel.find();
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getById = async function (req, res, next) {
    try {
        let project = await ProjectModel.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.create = async function (req, res, next) {
    try {
        console.log("body: " + JSON.stringify(req.body));
        let newProject = await ProjectModel.create(req.body);
        console.log(newProject);
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.update = async function (req, res, next) {
    try {
        let project = await ProjectModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.delete = async function (req, res, next) {
    try {
        let project = await ProjectModel.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.deleteAll = async function (req, res, next) {
    try {
        let result = await ProjectModel.deleteMany({});
        res.json({ success: true, message: `${result.deletedCount} projects deleted successfully` });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

