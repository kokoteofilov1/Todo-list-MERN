const mongoose = require('mongoose');
const ToDo = mongoose.model('ToDo');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    todo: [{
        title: String
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;