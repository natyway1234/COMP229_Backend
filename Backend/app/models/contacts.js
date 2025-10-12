const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        }
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model('Contact', ContactSchema);

