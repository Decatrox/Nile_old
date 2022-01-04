const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    Username:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Cart: Array
});

const User = mongoose.model('User', userSchema);
module.exports = User;
 