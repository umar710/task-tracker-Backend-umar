const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");

// GET /tasks - Get all tasks with optional filtering
router.get("/", async (req, res) => {
  try {
    const { status, priority, sortBy, sortOrder } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (sortBy) filters.sortBy = sortBy;
    if (sortOrder) filters.sortOrder = sortOrder;

    const tasks = await taskService.getAllTasks(filters);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch tasks",
      message: error.message,
    });
  }
});

// GET /tasks/:id - Get task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "Failed to fetch task",
        message: error.message,
      });
    }
  }
});

// POST /tasks - Create new task
router.post("/", async (req, res) => {
  try {
    console.log("Creating task with data:", req.body);

    const task = await taskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      error: "Failed to create task",
      message: error.message,
    });
  }
});

// PATCH /tasks/:id - Update task
router.patch("/:id", async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({
        error: "Failed to update task",
        message: error.message,
      });
    }
  }
});

// PUT /tasks/:id - Full task update
router.put("/:id", async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({
        error: "Failed to update task",
        message: error.message,
      });
    }
  }
});

// DELETE /tasks/:id - Delete task
router.delete("/:id", async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === "Task not found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "Failed to delete task",
        message: error.message,
      });
    }
  }
});

module.exports = router;
