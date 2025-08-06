import React from "react";

const Loading = ({ type = "default" }) => {
  if (type === "tasks") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-50 rounded-xl p-4 border border-gray-100 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded mt-1"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "categories") {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center space-x-3 p-3 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary-500"></div>
    </div>
  );
};

export default Loading;