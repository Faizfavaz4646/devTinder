const express = require("express");
const app = express();
 const connectDB =require("./config/database")
const User = require("./model/user");

 app.use(express.json());
 //signup api
app.post("/signup", async(req,res)=>{
    const user= new User(req.body)
    
    try{
            await user.save();
res.send("user data added successfully!!")

    } catch{
        res.status(400).send("user cannot be added")
    }
    

})
// api for etting one user data by emiid 

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

app.patch("/user", async (req,res)=>{
    const userId =req.body.userId;
    const data =req.body

    try{
    const user =await User.findByIdAndUpdate({_id :userId},data,{
        runValidators:true,
        returnDocument:"after"
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

