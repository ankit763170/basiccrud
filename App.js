const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Allow CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Import user routes
const userRoutes = require("./Routes/userRoutes");

// Count variables
let addCount = 0;
let updateCount = 0;

// Middleware to count API calls
app.use((req, res, next) => {
  if (req.path === "/users" && req.method === "POST") {
    addCount++;
  } else if (req.path.startsWith("/users/") && req.method === "PATCH") {
    updateCount++;
  }
  next();
});

// Use user routes
app.use("/users", userRoutes);

// API to get counts
app.get("/counts", (req, res) => {
  res.json({ addCount, updateCount });
});

// Connect to database
require("./Connectdb");

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
