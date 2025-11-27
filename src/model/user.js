const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt")

const userSchema = new mongoose.Schema({

    firstName :{
        type:String,
        required:true,
        minLength:4,
        maxLength:16,
        
    },
    lastName:{
        type:String
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
       validate:{
        validator(value){
            if(!validator.isEmail(value)){
            throw new Error("invalid Email address" + value)
            }
        }

       } 

    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:64,

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"this is about discription of user",
    }, 
   photoURL: {
    type:String,
        default:"https://i.pinimg.com/1200x/c1/de/64/c1de64f6429dc8737b1140263100ad49.jpg"
    },
},{timestamps:true})

userSchema.methods.getJWT= async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id},"Fafa$4646",
   {expiresIn : "7d"})
    return token;

};
userSchema.methods.validatePassword = async function(passwordInputByUser){
 const user =this;
 const passwordHash=user.password

 const isPasswordVlid= await bcrypt.compare(passwordInputByUser,passwordHash)

return isPasswordVlid
}



module.exports=mongoose.model("User",userSchema);