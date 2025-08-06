import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(400);
    const maxId = tasks.reduce((max, task) => Math.max(max, task.Id), 0);
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    if (updates.completed && !tasks[index].completed) {
      updates.completedAt = new Date().toISOString();
    } else if (!updates.completed && tasks[index].completed) {
      updates.completedAt = null;
    }
    
    tasks[index] = { ...tasks[index], ...updates };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return tasks.filter(task => task.categoryId === parseInt(categoryId)).map(task => ({ ...task }));
  },

  async getByStatus(completed) {
    await delay(300);
    return tasks.filter(task => task.completed === completed).map(task => ({ ...task }));
  },

  async getByPriority(priority) {
    await delay(300);
    return tasks.filter(task => task.priority === priority).map(task => ({ ...task }));
  }
};