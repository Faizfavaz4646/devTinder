const mongoose = require("mongoose");

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

    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:20,

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
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);