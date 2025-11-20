const express = require("express");
const app = express();
 const connectDB =require("./config/database")
const User = require("./model/user");
app.use(express.json());

app.post("/signup", async(req,res)=>{

    const user= new User({
       firstName: "neymar",
       lastName:"juniour",
       emailID:"neymar@gmail.com" ,
       password:"neymar@123",
    });
    try{
            await user.save();
res.send("user data added successfully!!")

    } catch{
        res.status(400).send("user cannot be added")
    }

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

