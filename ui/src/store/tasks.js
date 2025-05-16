import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('tasks', {
  state: () => ({ tasks: [] }),
  actions: {
    async fetchTasks() {
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.tasks = res.data;
    },
    async addTask(task) {
      const res = await axios.post('http://localhost:8000/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.tasks.push(res.data);
    }
  }
});
