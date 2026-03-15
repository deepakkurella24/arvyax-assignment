const jwt = require('jsonwebtoken');
const User=require('../models/user')

async function userAuth(req,res,next){
    try{
        const token=req.cookies?.token
        if(!token) throw new Error("please login")
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user=await User.findById(decoded._id)
        if(!user) throw new Error("please login jwt is invalid")
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).json({isLoggedIn:false,message:err.message})
    }
}
module.exports=userAuth