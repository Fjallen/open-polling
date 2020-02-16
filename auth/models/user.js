var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const salt = 10;

//Defining Schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isManager:Boolean,
    isEmailAuthenticated:Boolean,
})
//Defining schema methods
//Create User
userSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});
//Export model as model
module.exports = mongoose.model("User",userSchema);