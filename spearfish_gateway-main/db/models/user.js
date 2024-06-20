const { Schema, models, model } = require('mongoose');
const crypto = require('crypto');

const userObject = {
    name: { type: String, default: '', required: true },
    email: {
        address: { type: String, required: true },
        verificationCode: { type: Number, required: true },
        verified: { type: Boolean, required: true, default: false },
        recoveryToken: {type: String, required: false}
    },
    phone: {
        number: { type: Number },
        verificationCode: { type: Number, required: true, default: 0 },
        verified: { type: Boolean, required: true, default: false },
    },
    location: { type: String, default: '' },
    profileImgURL: { type: String, default: '' },
    netIncome: { type: Number, default: 0, required: true },
    hash: { type: String, default: '', required: true },
    salt: { type: String, default: '', required: true },
    acceptedTerms: { type: Boolean, default: false, required: true }
}

const userSchema = new Schema(userObject, { timestamps: true });

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations, 

    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = models.User || model('User', userSchema);
