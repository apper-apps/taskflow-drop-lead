import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  totalTasks = 0,
  completedTasks = 0 
}) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Today's Progress</h2>
          <p className="text-sm text-gray-600">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {completionPercentage}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
          
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-gray-200"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary-500"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filters.status === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: "all" })}
          className="shrink-0"
        >
          <ApperIcon name="List" className="w-4 h-4 mr-2" />
          All Tasks
        </Button>
        
        <Button
          variant={filters.status === "active" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: "active" })}
          className="shrink-0"
        >
          <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
          Active
        </Button>
        
        <Button
          variant={filters.status === "completed" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onFilterChange({ ...filters, status: "completed" })}
          className="shrink-0"
        >
          <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2" />
          Completed
        </Button>
        
        <div className="border-l border-gray-200 mx-2"></div>
        
        <Button
          variant={filters.priority === "high" ? "danger" : "secondary"}
          size="sm"
          onClick={() => onFilterChange({ 
            ...filters, 
            priority: filters.priority === "high" ? "" : "high" 
          })}
          className="shrink-0"
        >
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-2" />
          High Priority
        </Button>
        
        {(filters.status !== "all" || filters.priority) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange({ status: "all", priority: "", category: "" })}
            className="shrink-0"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;