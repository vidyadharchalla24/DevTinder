const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const requestRoute = require("./routes/requestRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRoute);
app.use("/profile", profileRoute);
app.use("/request", requestRoute);

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
