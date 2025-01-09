<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isSignup ? 'Signup' : 'Login' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-if="isSignup"
          v-model="username"
          placeholder="Username"
          required
        />
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit">{{ isSignup ? 'Signup' : 'Login' }}</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p class="toggle-text">
        {{ isSignup ? 'Already have an account?' : "Don't have an account?" }}
        <span @click="toggleAuth">{{ isSignup ? 'Login' : 'Signup' }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const username = ref('');
const isSignup = ref(false);
const error = ref(null);
const store = useStore();

function toggleAuth() {
  isSignup.value = !isSignup.value;
  error.value = null;
}

async function handleSubmit() {
  try {
    if (isSignup.value) {
      await store.dispatch('signup', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
    } else {
      await store.dispatch('login', {
        email: email.value,
        password: password.value,
      });
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred';
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
}

.auth-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

input {
  display: block;
  width: 92%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #339966;
}

.error {
  color: red;
  margin-top: 10px;
}

.toggle-text {
  margin-top: 10px;
}

.toggle-text span {
  color: #42b983;
  cursor: pointer;
}
</style>
