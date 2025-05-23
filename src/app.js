const express = require('express');

const app = express();
const {authAdmin,authUser} = require('./middlewares/auth');

app.use("/admin",authAdmin)

app.get("/admin/getAllData",(req,res)=>{
    
    res.send("Gets all data!!");
});

app.delete("/admin/deleteData",(req,res)=>{
    res.send("data got deleted");
});

app.get("/user/data",authUser,(req,res)=>{
    res.send("Data saved successfully!!");
});

app.get("/user/login",(req,res)=>{
    res.send("Data saved successfully!!");
});

app.listen(4000,()=>{
    console.log("Server is successfully listening on port 4000...");
});