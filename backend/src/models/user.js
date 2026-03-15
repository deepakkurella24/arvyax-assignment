const mongoose=require('mongoose')
const validater=require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength: 3,
        maxlength: 30,
        required: [true, 'name is required'],
        
    },

    email: {
        type:String,
        required: [true, 'email is required'],
        unique: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validater.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password: {
        type:String,
        required: [true, 'password is required'],
    }

},  
{
    timestamps: true
})

userSchema.methods.getJWT=function(){
    const user=this
    return jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

userSchema.methods.validatePasswordFromDB=function(password){
    const user=this
    return bcrypt.compare(password,user.password)
}


module.exports=mongoose.model('User',userSchema)

