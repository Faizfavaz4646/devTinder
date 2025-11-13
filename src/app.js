const express = require("express");

const app = express();
app.use("/",(req,res)=>{
    res.send("home page")
})

app.use("/about",(req,res)=>{
    res.send("about page")
})


app.listen(3000,()=>{
    console.log("port is 3000");
    
})
