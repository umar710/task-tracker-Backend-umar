const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Use Render's environment variable or fallback to local MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/tasktracker";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create sample data if collection is empty
    await createSampleData();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const createSampleData = async () => {
  try {
    const Task = require("../models/Task");
    const taskCount = await Task.countDocuments();

    if (taskCount === 0) {
      const sampleTasks = [
        {
          title: "Complete project proposal",
          description: "Draft and review the Q4 project proposal document",
          priority: "High",
          due_date: new Date("2024-12-25"),
          status: "Open",
        },
        {
          title: "Team meeting preparation",
          description: "Prepare agenda and materials for weekly team sync",
          priority: "Medium",
          due_date: new Date("2024-12-20"),
          status: "In Progress",
        },
        {
          title: "Update documentation",
          description: "Review and update API documentation",
          priority: "Low",
          due_date: new Date("2024-12-30"),
          status: "Open",
        },
      ];

      await Task.insertMany(sampleTasks);
      console.log("📝 Sample tasks created successfully");
    }
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
};

module.exports = connectDB;
