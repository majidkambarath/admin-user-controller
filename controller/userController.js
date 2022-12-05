// const session = require('express-session')
const User = require('../models/userModel')
// const Register = require('../models/userModel')

const userlogin = (req,res)=>{
    if(req.session.user){
        res.redirect('/userHome')
    }else if(req.session.admin){
        res.redirect('/adminlogin')
    }
    else{
        res.render('login')
    }
          
    
}
//sign up
const userSignup = (req,res)=>{
    if(req.session.user){
        res.redirect('/userHome')
    }else{
 res.render('sign')
    }
       
  
    }
const userHome = async(req,res)=>{
    if(req.session.user){
    res.render('userHome')
    }else{
        res.redirect('/')
    }
}
//user logout
const logout = async (req, res) => {
    req.session.destroy();
    console.log('session disstroyed');
    res.redirect('/');
    res.end();
}

// insert data from user

const insertUser = async(req,res)=>{
   
    let user1;
    try {
    user1 = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
       
      
})
const email = req.body.email;
 console.log("data store in database");
const user = await User.findOne({email:email});
if(email===user.email){
    
    res.render('../views/sign',{error:"Email Already exist"})
}
    }catch(error){
        const userDate = user1.save();
        console.log('save');
        res.render('../views/login')
    }
}

//userlogin verified

let user;
const userVerification = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        user =  await User.findOne({email:email});
        console.log('userverfication');
        if(user){
            console.log('get data')
            console.log(user.password)
            if(email === user.email && password === user.password){
                req.session.user=req.body.email
              //  console.log(req.session);
                
               res.redirect('/userHome')
              
            }else{
                res.render('../views/login',{wrong :"invalid credentials"});
            }

        }else{
            res.render('../views/login.ejs',{wrong:"user not found"});
        }
        
    } catch (error) {
        console.log(error.message);
        res.render('../views/login.ejs',{worng:"invalid credentials"})
    }
}

// export modules 

module.exports={
    userlogin,
    userSignup,
    insertUser,
    userHome,
    userVerification,
    logout
   
}