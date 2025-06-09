const express = require("express");
const profileRoute = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");


profileRoute.get("/view",userAuth, async (req,res)=>{
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRoute.patch("/edit",userAuth, async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid data!");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key]);

        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, Your Profile Updated Successfully!!`);
    } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRoute;