// ui/src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'

import router from './router';


const app = createApp(App)
const pinia = createPinia()

// Axios global defaults
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

// Register plugins
app.use(pinia)
app.use(router)
app.mount('#app')
