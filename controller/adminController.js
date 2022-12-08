const User = require("../models/userModel");
//admin page
const admin =(req,res)=>{
    if(req.session.admin){
        res.redirect('/admin/adminlogin')
    }
    else{
        res.render('admin')
    }   
 
}
//admin home page
const  adminlogin= async(req,res)=>{
    try { 
        const userDate = await User.find({});
        
        if(req.session.admin){
            console.log(req.session);
            res.render('adminlogin',{ details: userDate })
        }
        else{
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error.message);
    }
   
}
//add user
const addUser = async(req,res)=>{
    if(req.session.admin){
        try {
                res.render('../views/addUser.ejs')
                
            } catch (error) {
                console.log(error.message);
                
            }
    }else{
        res.redirect('/')
    
    }
    //session
    // try {
    //     res.render('../views/addUser.ejs')
        
    // } catch (error) {
    //     console.log(error.message);
        
    // }
    // res.render('addUser')
}

const addUserinsert = async (req,res)=>{
//session
let addone;
try {
     addone = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
       
    })
    const email = req.body.email;
    const user1 = await User.findOne({email:email});
    if(email===user1.email){
        console.log(user1);
        res.render('../views/addUser.ejs', { wrong: "Email Already Exits" });

    }else{
        //
    }
    
} catch (error) {
    addone.save();
    console.log('saveadd');
    res.render('../views/addUser.ejs')
}

}

// edit functionality
const editUser = async(req,res)=>{
    //session
    if(req.session.admin){
        try {
            // res.render('../views/editUser.ejs')
            const id = req.query.id;
            const userDate = await User.findById({ _id: id})
            if(userDate){
                res.render('../views/editUser.ejs',{user:userDate})
                // res.session.user.destroy()
                console.log("edit succuess");
            }else{
                res.redirect('/adminlogin')
            }
        } catch (error) {
            console.log(error.message);
        }
    }else{
        res.redirect('/')
    }
   
}

// update users
const updateUser = async(req,res)=>{
    //session
    if(req.session.admin){
        try {
            const userDate = await User.findByIdAndUpdate({_id:req.query.id},{$set:{firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,password:req.body.password}});
                 console.log('updte sucees'); 
            res.redirect('/adminlogin')
        
            } catch (error) {
                console.log(error.message);
                
            }
    }else{
        res.redirect('/')
    }
 
   
}
// user delete
const deleteUser = async(req,res)=>{
    //session
    try {
        const userDate = await User.findByIdAndDelete({_id:req.query.id})
 res.redirect('/adminlogin')
    } catch (error) {
        console.log(error.message);
        
    }

}

// logout
const adminlogout = async (req, res) => {
    req.session.destroy();
    console.log('session deleted');
    res.redirect('/');
    res.end();
}
//admin verification
const adminverification = (req,res)=>{
   
    const email = 'admin@gmail.com'
    const password = '123'
    console.log(req.body);
    if(req.body.email===email && req.body.password===password){
        req.session.admin=req.body.email
        console.log(req.session);
         res.redirect('/adminlogin')

    }else{
        res.render('../views/admin.ejs',{wrong:'Admin not found'})
    }
}

    



module.exports={
    admin,
    adminverification,
    adminlogin,
    adminlogout,
    addUser,
    addUserinsert,
    editUser,
    updateUser,
    deleteUser
}