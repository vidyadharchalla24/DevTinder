const express = require('express');

const app = express();

app.use("/getAllData",(req,res)=>{
    throw new Error("abc");
    res.send("data sent");
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!");
    }
})

app.listen(4000,()=>{
    console.log("Server is successfully listening on port 4000...");
});