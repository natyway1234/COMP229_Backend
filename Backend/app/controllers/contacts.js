let ContactModel = require('../models/contacts');

// GET all contacts
module.exports.list = async function (req, res, next) {
    try {
        let list = await ContactModel.find();
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// GET contact by id
module.exports.getById = async function (req, res, next) {
    try {
        let contact = await ContactModel.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// POST create new contact
module.exports.create = async function (req, res, next) {
    try {
        console.log("body: " + JSON.stringify(req.body));
        let newContact = await ContactModel.create(req.body);
        console.log(newContact);
        res.status(201).json(newContact);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// PUT update contact by id
module.exports.update = async function (req, res, next) {
    try {
        let contact = await ContactModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE contact by id
module.exports.delete = async function (req, res, next) {
    try {
        let contact = await ContactModel.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE all contacts
module.exports.deleteAll = async function (req, res, next) {
    try {
        let result = await ContactModel.deleteMany({});
        res.json({ success: true, message: `${result.deletedCount} contacts deleted successfully` });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

