const express = require("express");
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express();
app.use(express.json());


app.post('/signUp', async (req,res)=>{
    //creating a new instance of the useer model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully!!");
    } catch (error) {
        res.status(400).send("Error saving the user "+error.message);
    }

});

app.get("/user/:userEmail", async (req,res)=>{
    const userEmail = req.params?.userEmail;
    try{
        // const users = await User.find({emailId : userEmail});
        const users = await User.findOne({emailId : userEmail});
        res.send(users);
    }catch (error) {
        res.status(400).send("Error fetching the user : "+error.message);
    }
});

app.delete("/user/:userEmail", async (req,res)=>{
    const userEmail = req.params?.userEmail;
    try{
        // const users = await User.find({emailId : userEmail});
        const users = await User.findOneAndDelete({emailId : userEmail},{returnDocument: 'after'});
        console.log(users);
        res.send("User deleted successfully!");
    }catch (error) {
        res.status(400).send("Error deleting the user : "+error.message);
    }
});

app.patch("/user/:userEmail", async (req,res)=>{
    const userEmail = req.params?.userEmail;
    const data = req.body;
    try{
        // const users = await User.find({emailId : userEmail});
        const users = await User.findOneAndUpdate({emailId : userEmail},data,{returnDocument: 'before'});
        console.log(users);
        if(!users){
            res.status(404).send("User not found");
        }else{
            res.send("User updated successfully!");
        }
    }catch (error) {
        res.status(400).send("Error updating the user : "+error.message);
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
