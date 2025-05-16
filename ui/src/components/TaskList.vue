<template>
  <div>
    <h2>Task List</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="description" type="text" placeholder="Description" required />
      <input v-model="dueDate" type="date" required />
      <select v-model="status">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
  <div v-if="editingTaskId !== task.id">
    <strong>{{ task.title }}</strong> - {{ task.description }} - {{ task.due_date }} - {{ task.status }}
    <button @click="startEditing(task)">Edit</button>
    <button @click="deleteTask(task.id)">Delete</button>
  </div>
  <div v-else>
    <form @submit.prevent="updateTask(task.id)">
      <input v-model="editTitle" type="text" required />
      <input v-model="editDescription" type="text" required />
      <input v-model="editDueDate" type="date" required />
      <select v-model="editStatus">
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" @click="cancelEditing">Cancel</button>
    </form>
  </div>
</li>

    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const tasks = ref([]);
const title = ref('');
const description = ref('');
const dueDate = ref('');
const status = ref('pending');
const router = useRouter();


const editingTaskId = ref(null);
const editTitle = ref('');
const editDescription = ref('');
const editDueDate = ref('');
const editStatus = ref('pending');

const startEditing = (task) => {
  editingTaskId.value = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;
  editDueDate.value = task.due_date;
  editStatus.value = task.status;
};

const cancelEditing = () => {
  editingTaskId.value = null;
  editTitle.value = '';
  editDescription.value = '';
  editDueDate.value = '';
  editStatus.value = 'pending';
};




const updateTask = async (id) => {
  try {
    await axios.put(`http://localhost:8000/api/tasks/${id}`, {
      title: editTitle.value,
      description: editDescription.value,
      due_date: editDueDate.value,
      status: editStatus.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    await fetchTasks(); // Refresh the task list
    cancelEditing(); // Reset the editing state
  } catch (error) {
    alert('Failed to update task.');
  }
};


const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    tasks.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      router.push('/login');
    } else {
      alert('Failed to fetch tasks.');
    }
  }
};

const addTask = async () => {
  try {
    await axios.post('http://localhost:8000/api/tasks', {
      title: title.value,
      description: description.value,
      due_date: dueDate.value,
      status: status.value
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    title.value = '';
    description.value = '';
    dueDate.value = '';
    status.value = 'pending';
    fetchTasks();
  } catch (error) {
    alert('Failed to add task.');
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchTasks();
  } catch (error) {
    alert('Failed to delete task.');
  }
};

onMounted(() => {
  fetchTasks();
});
</script>
