const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
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
        },
        password: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
);

UserSchema.virtual('fullName')
    .get(function () {
        return this.firstname + " " + this.lastname;
    })
    .set(function (fullName) {
        let splitName = fullName.split(' ');
        this.firstname = splitName[0] || '';
        this.lastname = splitName[1] || '';
    });

module.exports = mongoose.model('User', UserSchema);