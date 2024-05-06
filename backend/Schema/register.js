// Define a schema for the result

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fname: String,
  lname: String,
  mobile: String,
  role: String,
});

// Define the model for result data
const UserRegister = mongoose.model("user", userSchema);
module.exports = UserRegister;
