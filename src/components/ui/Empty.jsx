import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ type = "tasks", onAction, actionLabel = "Add Task" }) => {
  const getEmptyContent = () => {
    switch (type) {
      case "tasks":
        return {
          icon: "CheckSquare",
          title: "No Tasks Yet",
          message: "Start organizing your day by adding your first task. You've got this!",
          actionLabel: "Add Your First Task"
        };
      case "completed":
        return {
          icon: "Trophy",
          title: "No Completed Tasks",
          message: "Tasks you complete will appear here. Start checking off those to-dos!",
          actionLabel: "View All Tasks"
        };
      case "category":
        return {
          icon: "FolderOpen",
          title: "No Tasks in This Category",
          message: "This category is empty. Add some tasks to get organized!",
          actionLabel: "Add Task"
        };
      case "filtered":
        return {
          icon: "Filter",
          title: "No Matching Tasks",
          message: "Try adjusting your filters or add a new task that matches your criteria.",
          actionLabel: "Clear Filters"
        };
      default:
        return {
          icon: "Smile",
          title: "Nothing Here",
          message: "Looks like there's nothing to show right now.",
          actionLabel: "Get Started"
        };
    }
  };

  const content = getEmptyContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={content.icon} className="w-10 h-10 text-primary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {content.title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
        {content.message}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default Empty;