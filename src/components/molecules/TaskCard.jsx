import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  onComplete, 
  onEdit, 
  onDelete,
  category 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      className={cn(
        "bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75",
        isOverdue && !task.completed && "border-red-200 bg-red-50/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-1">
            <Checkbox
              checked={task.completed}
              onChange={() => onComplete(task.Id)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium text-gray-900 mb-1",
              task.completed && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-sm text-gray-600 mb-3",
                task.completed && "text-gray-400"
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {task.dueDate && (
                <div className={cn(
                  "flex items-center space-x-1",
                  isOverdue && "text-red-600 font-medium"
                )}>
                  <ApperIcon name="Calendar" className="w-3 h-3" />
                  <span>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                  </span>
                </div>
              )}
              
              {category && (
                <div className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <div className={cn(
            "w-2 h-2 rounded-full relative",
            getPriorityColor(task.priority),
            task.priority === "high" && !task.completed && "priority-high"
          )}>
            <div 
              className={cn(
                "w-full h-full rounded-full",
                task.priority === "high" && "bg-red-500",
                task.priority === "medium" && "bg-amber-500",
                task.priority === "low" && "bg-green-500"
              )}
            />
          </div>
          
          <span className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            task.priority === "high" && "bg-red-100 text-red-700",
            task.priority === "medium" && "bg-amber-100 text-amber-700",
            task.priority === "low" && "bg-green-100 text-green-700"
          )}>
            {getPriorityLabel(task.priority)}
          </span>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <ApperIcon name="Edit2" className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.Id)}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;