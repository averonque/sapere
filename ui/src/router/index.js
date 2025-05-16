import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import TaskList from '../components/TaskList.vue';

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/tasks', component: TaskList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
