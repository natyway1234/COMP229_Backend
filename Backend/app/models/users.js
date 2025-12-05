const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

// Hash password before saving
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 10
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

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