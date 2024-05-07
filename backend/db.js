// db.js

const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    // Connect to MongoDB
    mongoose
      .connect(
        "mongodb+srv://Tham:Tham@cluster1.rqehbqf.mongodb.net/ServNow?retryWrites=true&w=majority",
        // "mongodb://localhost:27017/ServiceNow",

        {
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("Connected to the database"))
      .catch((err) => console.error("Connection to the database failed", err));
  },
};
