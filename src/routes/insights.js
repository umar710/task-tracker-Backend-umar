const express = require("express");
const router = express.Router();
const insightService = require("../services/insightService");

// GET /insights - Get task insights and analytics
router.get("/", async (req, res) => {
  try {
    const insights = await insightService.generateInsights();
    res.json(insights);
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate insights",
      message: error.message,
    });
  }
});

module.exports = router;
