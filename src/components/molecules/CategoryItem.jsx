import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryItem = ({ category, taskCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = location.pathname === `/category/${category.Id}` || 
                   (location.pathname === "/" && !category.Id);

  const handleClick = () => {
    if (category.Id) {
      navigate(`/category/${category.Id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 shadow-sm border border-primary-100" 
          : "hover:bg-gray-50 text-gray-700"
      )}
    >
      <div 
        className={cn(
          "w-4 h-4 rounded flex items-center justify-center",
          isActive ? "text-primary-600" : "text-gray-500"
        )}
        style={{ 
          backgroundColor: category.color ? `${category.color}20` : undefined 
        }}
      >
        <ApperIcon 
          name={category.icon || "Circle"} 
          className="w-4 h-4"
          style={{ 
            color: isActive ? category.color : undefined 
          }}
        />
      </div>
      
      <span className="flex-1 font-medium">
        {category.name}
      </span>
      
      {taskCount > 0 && (
        <span className={cn(
          "text-xs px-2 py-1 rounded-full font-medium",
          isActive 
            ? "bg-primary-200 text-primary-800" 
            : "bg-gray-200 text-gray-600"
        )}>
          {taskCount}
        </span>
      )}
    </motion.button>
  );
};

export default CategoryItem;