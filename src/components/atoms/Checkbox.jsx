import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className,
  checked,
  disabled,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer",
          checked 
            ? "bg-gradient-to-r from-primary-500 to-secondary-500 border-primary-500 shadow-md" 
            : "border-gray-300 hover:border-primary-400 bg-white",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            className="w-3 h-3 text-white animate-check-burst" 
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;