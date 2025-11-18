const express = require("express");


const app = express();


app.use("/",(err,req,res,next)=>{
   
    if(err){
        res.status(500).send("something went wrong")
    }
})



app.get("/getUserData",(req,res)=>{

    // try{
    throw new Error("hwgsdj")
    res.send("user data sent")

    // }catch(err){
    //     if(err){
    //         res.status(500).send("something wrong contact support")
    //     }
        
    }
   

)
app.use("/",(err,req,res,next)=>{
   
    if(err){
        res.status(500).send("something went wrong")
    }
})






app.listen(3000,()=>{
    console.log("port is 3000");
    
})
