const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
      required: true,
    },
    due_date: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Done"],
      default: "Open",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Index for better query performance
taskSchema.index({ status: 1, priority: 1 });
taskSchema.index({ due_date: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual("isOverdue").get(function () {
  return this.status !== "Done" && new Date() > this.due_date;
});

// Instance method to mark task as complete
taskSchema.methods.markComplete = function () {
  this.status = "Done";
  return this.save();
};

// Static method to get tasks by status
taskSchema.statics.getByStatus = function (status) {
  return this.find({ status });
};

// Static method to get overdue tasks
taskSchema.statics.getOverdueTasks = function () {
  return this.find({
    status: { $ne: "Done" },
    due_date: { $lt: new Date() },
  });
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
