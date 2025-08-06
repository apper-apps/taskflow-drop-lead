import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const QuickAddTask = ({ onAdd, categories = [], isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: "",
      categoryId: categoryId ? parseInt(categoryId) : categories[0]?.Id || 1,
      priority,
      dueDate: null
    });

    setTitle("");
    setCategoryId("");
    setPriority("medium");
    setIsExpanded(false);
  };

  const handleQuickAdd = (e) => {
    if (e.key === "Enter" && !isExpanded && title.trim()) {
      onAdd({
        title: title.trim(),
        description: "",
        categoryId: categories[0]?.Id || 1,
        priority: "medium",
        dueDate: null
      });
      setTitle("");
    }
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleQuickAdd}
            onFocus={() => setIsExpanded(true)}
            className="border-0 shadow-none focus:ring-0 text-base"
          />
        </div>
        
        <Button
          type="button"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="shrink-0"
        >
          <ApperIcon name={isExpanded ? "Minus" : "Plus"} className="w-4 h-4" />
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-3">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select category...</option>
                {categories.map(category => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            
            <div className="flex-1">
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setCategoryId("");
                setPriority("medium");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              onClick={handleSubmit}
              disabled={!title.trim() || isLoading}
            >
              {isLoading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin mr-2" />}
              Add Task
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickAddTask;