const express=require('express')
const router = express.Router();
const User=require('../models/user')
const bcrypt = require('bcrypt');
const validater=require('validator')
const jwt = require('jsonwebtoken');
const userAuth = require('../middleware/userAuth');

function validatePassword(value){
    if(!validater.isStrongPassword(value)){
        throw new Error('set a strong password with length 8,min 1 uppercase letter,min 1 lowercase letter,min 1 number and min 1 special char')
    }
}

router.get('/auth/check',userAuth,(req,res)=>{
  const {
      _id,
      name,
  } = req.user;

  res.json({isLoggedIn:true,data:{_id,name}})
})

router.post('/auth/signup',async (req,res)=>{ 
    try{
        
        const userData=await User.exists({email:req.body.email})
        
        
        if(userData){
            
            throw new Error('email already used')
        }
        const {email,name,password}=req.body
        validatePassword(password)
        const hashPassword=await bcrypt.hash(password, 10);
       
        const user=new User({name,email,password:hashPassword})
        
        await user.save();
        //console.log(userData);
        console.log('user registered successfully')
        res.send('added succesfully')
    
    }catch(err){
        res.status(401).send({error:err.message})
    }
})

router.post('/auth/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user)  throw new Error('invalid user')
        const bool=await user.validatePasswordFromDB(password)
        if(!bool) throw new Error('incorrect password')
        const jwtToken=await user.getJWT()
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000
        });
        const {
            _id,
            name,
        } = user;
        res.json({isLoggedIn:true,data:{_id,name}})

    }catch(err){
        res.status(401).send({error:err.message})
    }
})

router.post('/auth/logOut', (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });

  res.json({ message: "Logged out successfully" });
});
module.exports=router
