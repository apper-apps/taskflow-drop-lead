import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ tasksStats = {} }) => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const { total = 0, completed = 0, pending = 0 } = tasksStats;

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Good day! 👋
          </h1>
          <p className="text-gray-600">{today}</p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {total}
            </div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {completed}
            </div>
            <div className="text-xs text-gray-500">Done</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {pending}
            </div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;