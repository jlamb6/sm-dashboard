let mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
    accountName: String,
    accessToken: String,
    userAccountId: String,
    OAuthID: {
        id: {
            type: Number,
            unique: true
        },
        secret: {
            type: String,
            unique: true
        }
    },
    queryParams: [
        {
            name: String,
            value: String
        }
    ],
    userId: mongoose.Schema.Types.ObjectId,
    expires: { 
        type: Date, 
        default: function(){
		    var today = new Date();
		    var length = 60; // Length (in minutes) of our access token
		    return new Date(today.getTime() + length*60000);
        } 
    },
	active: { 
        type: Boolean, 
        get: function(value) {
            if (expires < new Date() || !value) {
                return false;
            } else {
                return value;
            }
        }, default: true 
    }
});

let Account = mongoose.model("Account", AccountSchema);

module.exports = Account;