const express = require('express');

const app = express();

app.use("/home",(req,res)=>{
    res.send("Welcome to Dashboard!!");
});

app.use("/test",(req,res)=>{
    res.send("Hello from the server!!");
});

app.use("/",(req,res)=>{
    res.send("Welcome to Server!!");
});

app.listen(4000,()=>{
    console.log("Server is successfully listening on port 4000...");
});