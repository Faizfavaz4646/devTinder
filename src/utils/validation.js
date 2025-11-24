const validator = require("validator");



const validateSignupData =(req)=>{
    const {firstName,lastName,emailID,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("name is not valid")
    } else if(!validator.isEmail(emailID)){
        throw new Error("email is not valid")
    }else if (!validator.isStrongPassword(password)){
        throw new Error("your password id not strong")
    }

}
module.exports={
    validateSignupData, 

}