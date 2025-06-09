const express = require("express");
const authRoute = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRoute.post("/signUp", async (req, res) => {
  try {
    // validate data
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //creating a new instance of the useer model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully!!");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({_id: user._id},"secret",{expiresIn: "1d"});
      res.cookie("token",token,{expires: new Date(Date.now() + 8*3600000)}); // cookie will expires in 8 hours
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRoute.post("/logout", async (req,res)=>{
    res.clearCookie("token");
    res.send("Logout Successful!!");
});


module.exports = authRoute;