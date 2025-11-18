const adminAuth=(req,res,next)=>{
     console.log("ckecked authentication ");
    const token = "xyz";
    const isAuthorized =token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Un Authorized")
    }else {
        next();

    }
}
const userAuth=(req,res,next)=>{
     console.log("ckecked user authentication ");
    const token = "xyz";
    const isAuthorized =token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Un Authorized")
    }else {
        next();

    }
}
module.exports={
    adminAuth,userAuth
}