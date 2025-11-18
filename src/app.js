const express = require("express");
const{adminAuth,userAuth} =require("./middlewares/auth")

const app = express();

app.use("/admin", adminAuth)




app.get("/user/login",(req,res)=>{
    res.send("user logedin")
})
app.get("/user/profile",userAuth,(req,res)=>{
    res.send("sent user profile")
})

app.get("/user/order",userAuth,(req,res)=>{
    res.send("sent order details")
})



app.get("/admin/getAllData",(req,res)=>{
   res.send("All data sent")
})
app.get("/admin/deleteData",(req,res)=>{
         res.send("deleted data ")
})



app.listen(3000,()=>{
    console.log("port is 3000");
    
})
