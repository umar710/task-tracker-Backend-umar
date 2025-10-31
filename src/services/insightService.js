const Task = require("../models/Task");

const insightService = {
  // Get task analytics for insights
  async getTaskAnalytics() {
    try {
      const totalTasks = await Task.countDocuments();
      const openTasks = await Task.countDocuments({ status: { $ne: "Done" } });

      const priorityDistribution = await Task.aggregate([
        { $match: { status: { $ne: "Done" } } },
        {
          $group: {
            _id: "$priority",
            count: { $sum: 1 },
          },
        },
      ]);

      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const dueSoon = await Task.countDocuments({
        status: { $ne: "Done" },
        due_date: { $gte: today, $lte: nextWeek },
      });

      const overdue = await Task.countDocuments({
        status: { $ne: "Done" },
        due_date: { $lt: today },
      });

      // Format priority distribution
      const formattedPriorityDistribution = [
        { priority: "High", count: 0 },
        { priority: "Medium", count: 0 },
        { priority: "Low", count: 0 },
      ];

      priorityDistribution.forEach((item) => {
        const index = formattedPriorityDistribution.findIndex(
          (p) => p.priority === item._id
        );
        if (index !== -1) {
          formattedPriorityDistribution[index].count = item.count;
        }
      });

      return {
        totalTasks,
        openTasks,
        priorityDistribution: formattedPriorityDistribution,
        dueSoon,
        overdue,
      };
    } catch (error) {
      throw new Error(`Failed to get analytics: ${error.message}`);
    }
  },

  // Generate AI-like insights
  async generateInsights() {
    try {
      const analytics = await this.getTaskAnalytics();

      let insights = [];

      // Task completion insight
      if (analytics.totalTasks > 0) {
        const completionRate = (
          ((analytics.totalTasks - analytics.openTasks) /
            analytics.totalTasks) *
          100
        ).toFixed(1);
        insights.push(
          `You've completed ${completionRate}% of your total tasks.`
        );
      }

      // Priority distribution insight
      const highPriority = analytics.priorityDistribution.find(
        (p) => p.priority === "High"
      );
      if (highPriority && highPriority.count > 0) {
        insights.push(
          `You have ${highPriority.count} high-priority tasks requiring immediate attention.`
        );
      }

      // Due date insights
      if (analytics.dueSoon > 0) {
        insights.push(
          `⚠️ ${analytics.dueSoon} tasks are due in the next 7 days.`
        );
      }

      if (analytics.overdue > 0) {
        insights.push(
          `🚨 ${analytics.overdue} tasks are overdue! Focus on completing these first.`
        );
      }

      // Workload assessment
      if (analytics.openTasks === 0) {
        insights.push(
          "🎉 Excellent! You're all caught up with no pending tasks."
        );
      } else if (analytics.openTasks <= 3) {
        insights.push("💪 You're doing great! Your workload is manageable.");
      } else if (analytics.openTasks <= 7) {
        insights.push(
          "📊 You have a moderate workload. Consider prioritizing tasks by due date."
        );
      } else {
        insights.push(
          "🔥 You have a heavy workload. Focus on high-priority tasks and consider delegating if possible."
        );
      }

      // Priority focus recommendation
      const highPriorityCount =
        analytics.priorityDistribution.find((p) => p.priority === "High")
          ?.count || 0;
      const mediumPriorityCount =
        analytics.priorityDistribution.find((p) => p.priority === "Medium")
          ?.count || 0;

      if (highPriorityCount > 0) {
        insights.push(
          `🎯 Focus on completing your ${highPriorityCount} high-priority task(s) first.`
        );
      } else if (mediumPriorityCount > 0) {
        insights.push(
          "👨‍💼 You can focus on medium-priority tasks as there are no urgent high-priority items."
        );
      }

      return {
        analytics,
        summary: insights.join(" "),
        detailedInsights: insights,
      };
    } catch (error) {
      throw new Error(`Failed to generate insights: ${error.message}`);
    }
  },
};

module.exports = insightService;
