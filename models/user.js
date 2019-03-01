let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        fname: String,
        lname: String
    },
    accounts: {
        facebook: {
            type: Boolean,
            default: false
        },
        instagram: {
            type: Boolean,
            default: false
        },
        twitter: {
            type: Boolean,
            default: false
        },
        github: {
            type: Boolean,
            default: false
        },
        google: {
            type: Boolean,
            default: false
        },
        gitkraken: {
            type: Boolean,
            default: false
        },
    },

});

let User = mongoose.model("User", userSchema);

module.exports = User;