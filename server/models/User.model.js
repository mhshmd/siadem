var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nama: {
        type: String,
        default: 'User'
    },
    username: String,
    password: String,
    label: {
        type: String,
        default: 'User'
    },
    isAdmin: {
        default: false,
        type: Boolean
    },
    menus: [String]
}, { collection: 'siadm_user' });

module.exports = mongoose.model('User', UserSchema);