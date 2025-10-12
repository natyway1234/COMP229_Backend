const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        completion: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: "projects"
    }
);

module.exports = mongoose.model('Project', ProjectSchema);

