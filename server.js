const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/database");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", require("./src/routes/tasks"));
app.use("/insights", require("./src/routes/insights"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "MongoDB",
    message: "Task Tracker API is running successfully",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Task Tracker API is running with MongoDB!",
    version: "1.0.0",
    endpoints: {
      tasks: "/tasks",
      insights: "/insights",
      health: "/health",
    },
    documentation: "See README.md for API documentation",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🗄️  Database: MongoDB`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
