const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter Valid name!");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid email address!");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter Strong Password!");
    }
}

module.exports = {validateSignUpData};