const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    next();
    
},
(req,res,next)=>{
    console.log("Handling the route user2");
     next(); 
},
(req,res,next)=>{
    console.log("Handling the route user3");
     next(); 
},
(req,res,next)=>{
    console.log("Handling the route user4");
    next();  
},
(req,res)=>{
    console.log("Handling the route user5");
  res.send("5th response") 

})



app.listen(3000,()=>{
    console.log("port is 3000");
    
})
