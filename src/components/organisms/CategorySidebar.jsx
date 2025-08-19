import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";
import CategoryItem from "@/components/molecules/CategoryItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ className = "" }) => {
  const [categories, setCategories] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ]);
      
      setCategories(categoriesData);
      
      // Calculate task counts per category
      const counts = {};
      const activeTasks = tasksData.filter(task => !task.completed);
      
      categoriesData.forEach(category => {
        counts[category.Id] = activeTasks.filter(task => task.categoryId === category.Id).length;
      });
      counts["all"] = activeTasks.length;
      
      setTaskCounts(counts);
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className={className}>
        <Loading type="categories" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Error message={error} onRetry={loadData} type="categories" />
      </div>
    );
  }

  // Add "All Tasks" as first item
  const allTasksCategory = {
    Id: null,
    name: "All Tasks",
    icon: "List",
    color: "#6366f1"
  };

  const menuItems = [allTasksCategory, ...categories];

  return (
    <div className={className}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TaskFlow 2</h1>
            <p className="text-sm text-gray-600">Organize your day</p>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Categories
          </h2>
          
          {menuItems.map((category) => (
            <CategoryItem
              key={category.Id || "all"}
              category={category}
              taskCount={taskCounts[category.Id || "all"] || 0}
            />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Trophy" className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Stay Motivated</p>
                <p className="text-xs text-gray-600">You're doing great!</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Keep up the momentum and complete your daily tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;