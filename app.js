const express = require('express');
const bodyparser = require("body-parser");
const cookiesParser = require("cookie-parser");
const session = require("express-session");
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
 //mongodb connection
 require('./models/databaseModel')
//express 
const app = express();
app.use(cookiesParser());
// console.log('running');

const port = process.env.port||2222;
// installiton sign-up page
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

// installition ejs
app.set('view engine','ejs');


//cache control

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

//session add

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secretpassword',
}))
//file path
var publicDir = require('path').join(__dirname,'public'); 
console.log(publicDir);
app.use(express.static(publicDir)); 

//for use routers
app.use(userRouter);

app.use(adminRouter);

app.listen(port,()=>{
    console.log("losting to the sever on http://localhost:4040");
})