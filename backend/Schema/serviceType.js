// schema.js
const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: true,
  },
  service_cost: {
    type: Number,
    required: true,
  },
  expected_time: {
    type: String,
    required: true,
  },
  service_image: {
    type: String,
    required: true,
  },
});

const ServiceType = mongoose.model("ServiceType", serviceTypeSchema);

module.exports = ServiceType;
