const express = require("express");

const app = express();

app.get("/user",(req , res)=>{
    res.send({FirstName: "Faiz" , LastName: "Favaz" })
});
app.post("/user",(req,res)=>{
    res.send("data saved successfully in to database")
});
app.delete('/user',(req,res)=>{
    res.send("deleted successfully");
});
app.patch("/user",(req,res)=>{
    res.send("updated successfully")
})



app.listen(3000,()=>{
    console.log("port is 3000");
    
})
