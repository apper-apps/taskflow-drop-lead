import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  filters, 
  onTaskUpdate, 
  refreshTrigger,
  activeCategory 
}) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, { 
        completed: !task.completed 
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));

      if (onTaskUpdate) {
        onTaskUpdate();
      }

      if (updatedTask.completed) {
        toast.success("🎉 Task completed! Great job!");
      } else {
        toast.info("Task marked as incomplete");
      }
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.Id !== taskId));
      
      if (onTaskUpdate) {
        onTaskUpdate();
      }
      
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Filter by category
    if (activeCategory && activeCategory !== "all") {
      filtered = filtered.filter(task => task.categoryId === parseInt(activeCategory));
    }

    // Filter by status
    if (filters.status === "active") {
      filtered = filtered.filter(task => !task.completed);
    } else if (filters.status === "completed") {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by priority
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Sort tasks - incomplete first, then by priority, then by due date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Priority order: high -> medium -> low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Sort by due date (closest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      
      // Finally, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  if (loading) {
    return <Loading type="tasks" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} type="tasks" />;
  }

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    if (activeCategory && activeCategory !== "all") {
      return <Empty type="category" onAction={() => window.location.href = "/"} />;
    }
    
    if (filters.status === "completed") {
      return <Empty type="completed" onAction={() => window.location.href = "/"} />;
    }
    
    if (filters.status !== "all" || filters.priority) {
      return <Empty type="filtered" onAction={() => window.location.href = "/"} />;
    }
    
    return <Empty type="tasks" onAction={() => window.location.href = "/"} />;
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => {
          const category = categories.find(c => c.Id === task.categoryId);
          
          return (
            <TaskCard
              key={task.Id}
              task={task}
              category={category}
              onComplete={handleCompleteTask}
              onEdit={(task) => {
                // Could implement edit functionality here
                toast.info("Edit functionality coming soon!");
              }}
              onDelete={handleDeleteTask}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;