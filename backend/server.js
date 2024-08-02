const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("./cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const sendEmail = require("./nodemailer");

const ServiceType = require("./Schema/serviceType");
const UserRegister = require("./Schema/register");
const NewService = require("./Schema/newservice");
require('dotenv').config();
const app = express();
app.use(
  cors({
    origin: 
      // "https://host-check-three.vercel.app",
      "http://localhost:3000", // Allow requests from this origin
    methods: ["POST", "GET", "PUT"], // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);
// app.use(cors());
app.use(
  express.json({
    limit: "20mb", // Maximum
  })
);
app.use(bodyParser.json());

// Middleware

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Connect to the database
db.connect();

// Cloudinary file upload
app.post("/img/upload", async (req, res) => {
  try {
    const image_url = req.body.image_url;

    // Upload image to Cloudinary
    const cloudinary_res = await cloudinary.uploader.upload(image_url, {
      folder: "/ServNow",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      data: cloudinary_res.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// POST endpoint to receive add new service data
app.post("/api/addService", (req, res) => {
  const serviceData = req.body;
  // Create a new document using the NewService model
  const addService = new ServiceType(serviceData);

  // Save the document to the database
  addService
    .save()
    .then((savedService) => {
      res.status(200).send("Booking data received and saved successfully");
    })
    .catch((err) => {
      res.status(500).send("Error saving booking data");
    });
});

//Edit the service
app.post("/api/storeEditedData", async (req, res) => {
  try {
    const { id, formData } = req.body;

    // Update the document in MongoDB with the provided ID
    const updatedService = await ServiceType.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).send("Service not found");
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error while updating service:", error);
    res.status(500).send("Error while updating service");
  }
});

app.post("/api/storeEditedUserData", async (req, res) => {
  try {
    const { username, formData } = req.body;

    // Update the document in MongoDB with the provided ID
    const updatedUser = await UserRegister.findOneAndUpdate(
      { email: username },
      formData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).send("Error while updating user");
  }
});
//changepassword

app.post("/api/changepassword", async (req, res) => {
  try {
    const { username, passwordData } = req.body;
    const { currentPassword, newPassword } = passwordData;
    if (!currentPassword || !newPassword) {
      return res.status(400).send("Please provide required Datas !");
    }

    // Find the user by username (email)
    const user = await UserRegister.findOne({ email: username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Check if the provided current password matches the stored encrypted password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).send("Current password is incorrect");
    }

    // Hash the new password before updating
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error while updating user password:", error);
    res.status(500).send("Error while updating user password");
  }
});

// PUT endpoint to delete a document from ServiceType collection
app.put("/api/deleteservice/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the document exists
    const serviceType = await ServiceType.findById(id);
    if (!serviceType) {
      return res.status(404).json({ error: "Service type not found" });
    }

    // Delete the document
    await ServiceType.findByIdAndDelete(id);

    res.json({ message: "Service type deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// GET endpoint to retrieve all services data

app.get("/api/manageservices", async (req, res) => {
  try {
    // Fetch all data from the collection
    const results = await ServiceType.find({});

    // Send the results as JSON response
    res.json(results);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
});

// GET endpoint to retrieve service to edit
app.get("/api/fetchServiceForEdit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the document by ID
    const serviceType = await ServiceType.findById(id);

    if (!serviceType) {
      return res.status(404).json({ error: "Service type not found" });
    }

    // Send the found document as a response
    res.json(serviceType);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint to retrieve user account data to edit
app.get("/api/fetchEditAccountInfo/:username", async (req, res) => {
  const email = req.params.username;

  try {
    // Find the document by ID
    const accountData = await UserRegister.findOne({ email: email });

    if (!accountData) {
      return res.status(404).json({ error: "Service type not found" });
    }

    // Send the found document as a response
    res.json(accountData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch account data" });
  }
});

// POST endpoint to receive booking data
app.post("/api/newservice", (req, res) => {
  const bookingData = req.body;
  // Create a new document using the NewService model
  const newService = new NewService(bookingData);

  // Save the document to the database
  newService
    .save()
    .then((savedService) => {
      const message = `
Dear Admin,

A new order has been placed on ServNow with the following details:

Order ID: ${savedService._id}
Type: ${bookingData.type}
Customer Email: ${bookingData.user}
Date: ${bookingData.date}

Please proceed to manage the service for this customer.

Best regards,
Rolex
ServNow Administration Team
`;
      sendEmail(
        "thamizhmass057@gmail.com",
        "New Order from customer!",
        message
      );

      res.status(200).send("Booking data received and saved successfully");
    })
    .catch((err) => {
      console.error("Error saving booking data:", err);
      res.status(500).send("Error saving booking data");
    });
});

// handle PUT request for updating status
app.put("/api/changestatus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the document with the provided id
    const result = await NewService.findById(id);
    if (result.status === 0) {
      const message = `
Dear Customer,

Your order with Order ID: ${result._id} on ServNow is ready for delivery!

Order Details:
- Type: ${result.type}
- Status: Ready for Delivery
- Date: ${result.date}

Thank you for choosing ServNow. We appreciate your business and look forward to serving you again.

Best regards,
Rolex
Customer Service Team
ServNow
`;

      sendEmail(result.user, "Your order is Now Ready to Pickup your Bike", message);
    }
    // Update the document with the provided id
    const updatedDocument = await NewService.findByIdAndUpdate(id, {
      $inc: { status: 1 },
    });

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// fetch the results
app.get("/api/servicehistory/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const results = await NewService.find({ user: username });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Assuming NewService is your MongoDB service or model

app.get("/api/bookinghistory", async (req, res) => {
  try {
    // Fetch all data from the collection
    const results = await NewService.find({});

    // Send the results as JSON response
    res.json(results);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
});
app.get("/api/managetask", async (req, res) => {
  try {
    // Fetch data from the collection where status is either 0 or 1
    const results = await NewService.find({ status: { $in: [0, 1] } });

    // Send the results as JSON response
    res.json(results);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
});

//fetchusername
app.get("/api/fetchusername/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const results = await UserRegister.find({ email: username }).select(
      "fname lname"
    );

    if (results.length === 0) {
      return res.json({ message: false });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    // Extract form data from the request body
    const { email, password, fname, lname, mobile, role } = req.body;

    // Check if the email already exists in the database
    const existingUser = await UserRegister.findOne({ email });

    if (existingUser) {
      // If user already exists, respond with a message
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user document with hashed password
    const newUser = new UserRegister({
      email,
      password: hashedPassword,
      fname,
      lname,
      mobile,
      role,
    });

    // Save the user document to the database
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // Respond with an error message if something goes wrong
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await UserRegister.findOne({ email });

  // If user not found, respond with error
  if (!user) {
    return res.status(200).json({ message: "Invalid credentials" });
  }

  // Compare hashed password with the provided password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(200).json({ message: "Invalid credentials" });
    } else {
      // Generate JWT token
      const name = user.email;
      const role = user.role;
      const token = jwt.sign({ name, role }, "secret_key", {
        expiresIn: "5h",
      });
      // Set token in cookie
      res.cookie("token", token);

      
      // // Set token in cookie with secure and httpOnly flags
      // res.cookie("token", token, {
      //   httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      //   sameSite: "strict", // Prevent CSRF
      // });
      // Send success response
      res.status(200).json({ message: "Login successful", token, role });
    }
  });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  // Log cookies received with the request

  const token = req.cookies.token;

  // if (!token) {
  //   return res.status(200).json({ message: "Unauthorized" });
  // }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message); // Log error message
      return res.status(403).json({ message: "Forbidden" });
    } else {
      req.name = decoded.name;
      req.role = decoded.role;

      next();
    }
  });
}

// Route for dashboard
app.get("/", authenticateToken, (req, res) => {
  // The decoded token information is available in req.user
  return res.json({ Status: "Success", name: req.name, role: req.role });
});
// Define a logout route
app.get("/logout", (req, res) => {
  // Clear the token cookie by setting an expired token
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// Get the total number of results
app.get("/api/totalservice/count/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const counted = await NewService.countDocuments({
      user: username,
    });
    res.json({ counted });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results count" });
  }
});

// Get the total score and average score for a specific username

app.get("/api/status/count/:username", async (req, res) => {
  const username = req.params.username;
  try {
    // Aggregate to count the number of records with each status
    const results = await NewService.aggregate([
      { $match: { user: username } }, // Match documents with the provided username
      { $group: { _id: "$status", count: { $sum: 1 } } }, // Group by status and count the documents
    ]);

    // Prepare variables to store the count for each status
    let pending = 0;
    let ready = 0;
    let completed = 0;
    // Loop through the results and update the count variables
    results.forEach((result) => {
      if (result._id === 0) pending = result.count;
      else if (result._id === 1) ready = result.count;
      else if (result._id === 2) completed = result.count;
    });

    // Send the counts in the response
    res.json({ pending: pending, ready: ready, completed: completed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results statistics" });
  }
});

// Get the total number of results
app.get("/api/admin/totalservice/count/", async (req, res) => {
  try {
    const counted = await NewService.countDocuments();
    res.json({ counted });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results count" });
  }
});

// Get the total score and average score for a specific username

app.get("/api/admin/status/count/", async (req, res) => {
  try {
    // Aggregate to count the number of records with each status
    const results = await NewService.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }, // Group by status and count the documents
    ]);
    // Prepare variables to store the count for each status
    let pending = 0;
    let ready = 0;
    let completed = 0;

    // Loop through the results and update the count variables
    results.forEach((result) => {
      if (result._id === 0) pending = result.count;
      else if (result._id === 1) ready = result.count;
      else if (result._id === 2) completed = result.count;
    });

    // Send the counts in the response
    res.json({ pending: pending, ready: ready, completed: completed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results statistics" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
