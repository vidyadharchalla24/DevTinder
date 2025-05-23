const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require('./models/user');

app.post('/signUp', async (req,res)=>{
    //creating a new instance of the useer model
    const user = new User({
        firstName: "Vidya",
        lastName: "Challa",
        emailId: "vidya.challa3@gmail.com",
        password: "Vidya#4234"
    });

    try {
        await user.save();
        res.send("User added successfully!!");
    } catch (error) {
        res.status(400).send("Error saving the user "+error.message);
    }

});

connectDB().then(() => {
  console.log("Database connection established...");
  app.listen(4000, () => {
    console.log("Server is successfully listening on port 4000...");
  });
}).catch(err=>{
    console.error("Database connection failed to establish!!");
});
