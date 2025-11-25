const express = require("express");
const app = express();
 const connectDB =require("./config/database")
const User = require("./model/user");
const { validateSignupData }=require("./utils/validation");
const bcrypt= require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")

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
    console.log(passwordHash);
    
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

app.get("/profile",userAuth, async(req,res)=>{
  try{
    
    const user=req.user

    res.send(user)

  }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }  
    

})
// api for etting one user data by emiid 

app.post("/login", async(req,res)=>{
    try{
          const {emailID,password}=req.body;

    const user = await User.findOne({emailID:emailID})
    if(!user){
        throw new Error("invalid cridentials")
    }
    const isPasswordVlid = await bcrypt.compare(password,user.password);

    if(isPasswordVlid){

        const token = await jwt.sign({_id: user._id},"Fafa$4646")
      
        

        res.cookie("token", token)
         res.send("login successfull....!!")
      
    }else{
        throw new Error("invalid credential")
     
    }

    } catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
 
  



})

app.get("/user", async (req,res)=>{
    const userMail =req.body.emailID

try {
    const users= await User.findOne({emailID :userMail})
    if(users.length === 0){
        res.status(404).send("user not found");
    }else {
        res.send(users);
    }
} catch(err){
    res.status(400).send("somthing went wrong")
}

});

//delete one user

app.delete("/user", async (req,res)=>{
    const userId=req.body.userId
    try{
        const user= await User.findByIdAndDelete(userId)
        res.send("user deleted successfully");

    }catch (err){
        res.status(400).send("something went wrong")
    }
});

app.patch("/user/:userId", async (req,res)=>{
    const userId =req.params?.userId;
    const data =req.body
 
    try{
          const ALLOWED_UPDATES=["about","skills","age"];
        const isupdatesAllowed =Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k))
        if(!isupdatesAllowed){
            throw new Error("skill updates failed")

        }

        if(data?.skills.length > 10){
            throw new Error("cannot add more than 10 skills")
        }
    const user =await User.findByIdAndUpdate({_id: userId},data,{
      
        returnDocument:"after",
          runValidators:true
    });
    console.log(user)
    
        res.send("user data updated successfully")
    } catch (err){
        res.status(400).send("UPDATE FAILED"+ err.message);
    }
})

//feed for getting all users

app.get("/feed", async (req,res)=>{
   

try {
     const users = await User.find({})
    if(!users){
        res.status(404).send("data not found")
    } else {
        res.send(users)
    }
} catch (err){
    res.status(400).send("somthing went wrong")

}
});


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

