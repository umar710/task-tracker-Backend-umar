const Task = require("../models/Task");

const taskService = {
  // Create a new task
  async createTask(taskData) {
    try {
      const task = new Task(taskData);
      const savedTask = await task.save();
      return savedTask;
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  },

  // Get all tasks with optional filtering and sorting
  async getAllTasks(filters = {}) {
    try {
      const {
        status,
        priority,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = filters;

      // Build query
      const query = {};
      if (status && status !== "all") query.status = status;
      if (priority) query.priority = priority;

      // Build sort
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;

      const tasks = await Task.find(query).sort(sort);
      return tasks;
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }
  },

  // Get task by ID
  async getTaskById(id) {
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error) {
      throw new Error(`Failed to fetch task: ${error.message}`);
    }
  },

  // Update task
  async updateTask(id, updates) {
    try {
      const allowedUpdates = [
        "title",
        "description",
        "priority",
        "due_date",
        "status",
      ];
      const updateData = {};

      allowedUpdates.forEach((field) => {
        if (updates[field] !== undefined) {
          updateData[field] = updates[field];
        }
      });

      const task = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!task) {
        throw new Error("Task not found");
      }

      return task;
    } catch (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        throw new Error("Task not found");
      }
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  },

  // Get tasks statistics
  async getTaskStats() {
    try {
      const stats = await Task.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      return stats;
    } catch (error) {
      throw new Error(`Failed to get task stats: ${error.message}`);
    }
  },
};

module.exports = taskService;
