const express = require("express");
const requestRoute = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRoute.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params?.toUserId;
    const status = req.params?.status;

    // Status validation
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      throw new Error(`Invalid Status Type ${status}`);
    }

    const toUser =await User.findOne(toUserId);
    if(!toUser){
        throw new Error("User not found");
    }

    // checks if a connectionRequest already exists.
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if(existingConnectionRequest){
        throw new Error("Connection Request already exists!!");
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    res.json(
      {
        message: "connection request sent successfully!",
        data: connectionRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    res.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
});

module.exports = requestRoute;
