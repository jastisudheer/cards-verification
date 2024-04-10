const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const mongoURI = functions.config().mongo.uri;

// Initialize Firebase Admin SDK
admin.initializeApp();

// Express application
const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Add your Express routes
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const adminRoutes = require("./routes/adminRoutes");

// Here we ensure the code indentation is 2 spaces
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/admin", adminRoutes);


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Expose the Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
