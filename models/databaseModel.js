const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Registration").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connected");
})