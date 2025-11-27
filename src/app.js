const express = require("express");
const app = express();
 const connectDB =require("./config/database")
const User = require("./model/user");
const { validateSignupData }=require("./utils/validation");
const bcrypt= require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const user = require("./model/user");

 app.use(express.json());
 app.use(cookieParser())
 //signup api
app.post("/signup", async(req,res)=>{

  try{
    //validation if data
    validateSignupData(req)
     //encrypt the password

    const {firstName,lastName,emailID,password}=req.body
    
    const passwordHash= await bcrypt.hash(password,10)
    
    const user= new User({
        firstName,
        lastName,
        emailID,
        password:passwordHash,
    })
    
  
    await user.save();
res.send("user data added successfully!!")

    } catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
    

})
//login api
app.post("/login", async(req,res)=>{
    try{
          const {emailID,password}=req.body;

    const user = await User.findOne({emailID:emailID})
    if(!user){
        throw new Error("invalid credentials")
    }
    const isPasswordVlid = await user.validatePassword(password)

    if(isPasswordVlid){

        const token = await user.getJWT()
        res.cookie("token", token)
         res.send("login successfull....!!")
      
    }else{
        throw new Error("invalid credential")
     
    }

    } catch(err){
        res.status(400).send("ERROR : " + err.message)
    }


})
//getting user details
app.get("/profile",userAuth, async(req,res)=>{
  try{
    
    const user=req.user

    res.send(user)

  }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }  
    

})

app.post("/sendconnectionrequest",userAuth, async (req,res)=>{
const user = req.user
    res.send(user.firstName + " sent friend request")

})







connectDB()
.then(()=>{
    console.log("database connection established..!!");

    app.listen(3000,()=>{
    console.log("port is 3000");
    
})    
})
.catch((err)=>{
    console.error("Database cannot be connected..!!");
    
})

