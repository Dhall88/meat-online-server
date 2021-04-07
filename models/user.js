const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
});

userSchema.plugin(passportLocalMongoose);

module.exports = userSchema;