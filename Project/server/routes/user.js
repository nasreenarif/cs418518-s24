const express=require("express");
const router=express.Router();
const database=require('../database');


//user get API
router.get("/",(req,res)=>{
    
    database.execute("select * from user",function(err,result){
        res.send(result);
    })
    
    // res.send("Calling user get api")
});

//user post API
router.post("/",(req,res)=>{
    res.send("Calling user post api")
});


module.exports=router;