const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    challenges: [String],
});

const User = mongoose.model('User', userSchema);


module.exports = {
    User,
};
