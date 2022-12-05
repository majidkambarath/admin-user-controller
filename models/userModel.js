const mongoose = require('mongoose');
//schema structure of doucumnts users
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
    
})
//now we need to create a coollection
const User = new mongoose.model("register",userSchema);
module.exports = User;