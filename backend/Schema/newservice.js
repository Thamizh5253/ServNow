const mongoose = require("mongoose");

// Define a schema for the newservices collection
const newServiceSchema = new mongoose.Schema({
  type: String,
  status: Number,
  user: String,
  date: String,
});

// Create and export the model for the newservices collection
const NewServiceDataModel = mongoose.model("newservice", newServiceSchema);

module.exports = NewServiceDataModel;
