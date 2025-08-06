import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import Header from "@/components/organisms/Header";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import FilterBar from "@/components/molecules/FilterBar";
import TaskList from "@/components/organisms/TaskList";

const TaskManager = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "",
    category: ""
  });
  const [tasksStats, setTasksStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadTasksStats = async () => {
    try {
      const tasks = await taskService.getAll();
      const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
      };
      setTasksStats(stats);
    } catch (err) {
      console.error("Error loading task stats:", err);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTasksStats();
  }, []);

  useEffect(() => {
    loadTasksStats();
  }, [refreshTrigger]);

  const handleAddTask = async (taskData) => {
    try {
      setIsAddingTask(true);
      await taskService.create(taskData);
      setRefreshTrigger(prev => prev + 1);
      toast.success("🎉 Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", err);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleTaskUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <CategorySidebar className="hidden lg:block w-80 bg-white border-r border-gray-200 custom-scrollbar overflow-y-auto" />
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"></div>
        <CategorySidebar className="relative w-80 bg-white shadow-xl transform -translate-x-full lg:translate-x-0 transition-transform duration-300" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header tasksStats={tasksStats} />
        
        <div className="flex-1 p-6 custom-scrollbar overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <QuickAddTask 
              onAdd={handleAddTask} 
              categories={categories} 
              isLoading={isAddingTask}
            />
            
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              totalTasks={tasksStats.total}
              completedTasks={tasksStats.completed}
            />
            
            <TaskList
              filters={filters}
              onTaskUpdate={handleTaskUpdate}
              refreshTrigger={refreshTrigger}
              activeCategory={categoryId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;