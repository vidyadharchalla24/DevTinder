const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        unique : true,
        lowercase: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid email : "+ value);
            }
        }
    },
    password: {
        type: String,
    },
    age: {
        type: String,
        min: 18
    },
    gender: {
        type: String,
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/045/944/199/small/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
    },
    about: {
        type: String,
        default: "This is a default about me.",
    },
    skills : {
        type: [String]
    }
},{
    timestamps: true,
});

const User = mongoose.model("User",userSchema);

module.exports = User;