const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user/:userEmail", async (req, res) => {
  const userEmail = req.params?.userEmail;
  try {
    // const users = await User.find({emailId : userEmail});
    const users = await User.findOne({ emailId: userEmail });
    res.send(users);
  } catch (error) {
    res.status(400).send("Error fetching the user : " + error.message);
  }
});

app.delete("/user/:userEmail", async (req, res) => {
  const userEmail = req.params?.userEmail;
  try {
    // const users = await User.find({emailId : userEmail});
    const users = await User.findOneAndDelete(
      { emailId: userEmail },
      { returnDocument: "after" }
    );
    console.log(users);
    res.send("User deleted successfully!");
  } catch (error) {
    res.status(400).send("Error deleting the user : " + error.message);
  }
});

app.patch("/user/:userEmail", async (req, res) => {
  const userEmail = req.params?.userEmail;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "skills"];

    const isUpdatesAllowd = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdatesAllowd) {
      throw new Error("Update not allowed..");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills should be less than 10.");
    }

    // const users = await User.find({emailId : userEmail});
    const users = await User.findOneAndUpdate({ emailId: userEmail }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(users);
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully!");
    }
  } catch (error) {
    res.status(400).send("Error updating the user : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(4000, () => {
      console.log("Server is successfully listening on port 4000...");
    });
  })
  .catch((err) => {
    console.error("Database connection failed to establish!!");
  });
