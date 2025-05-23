const express = require('express');

const app = express();

app.get("/home",(req,res)=>{
    res.send("Welcome to Dashboard!!");
});

app.get("/test",(req,res)=>{
    res.send("Hello from the server!!");
});

app.post("/user",(req,res)=>{
    console.log(req.query)
    res.send("Data saved successfully!!");
});

app.listen(4000,()=>{
    console.log("Server is successfully listening on port 4000...");
});