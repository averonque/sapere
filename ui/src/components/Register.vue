<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="passwordConfirmation" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.post('http://localhost:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    });
    router.push('/login');
  } catch (error) {
    alert('Registration failed. Please try again.');
  }
};
</script>
