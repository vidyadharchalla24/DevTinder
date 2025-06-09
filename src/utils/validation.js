const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter Valid name!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email address!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const ALLOWEDPROFILEDATA = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
  ];

  const isValidData = Object.keys(req.body).every((key) =>
    ALLOWEDPROFILEDATA.includes(key)
  );
  return isValidData;
};

module.exports = { validateSignUpData, validateEditProfileData };
