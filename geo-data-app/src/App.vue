<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <!-- Clicking on logo takes user to home -->
        <router-link to="/" class="logo">Geo-Data App</router-link>
        
        <div class="nav-links">
          <!-- Show login only if the user is not logged in -->
          <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
          
          <!-- Show dropdown if the user is logged in -->
          <div v-if="isLoggedIn" class="dropdown">
            <span @click="toggleDropdown">User ▼</span>
            <div v-if="dropdownOpen" class="dropdown-menu">
              <router-link to="/saved-data">Saved Data</router-link>
              <a @click="logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main content rendered by the router -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
console.log(process.env.VUE_APP_BASE_URL, 'wtf!!');
const store = useStore();
const router = useRouter();

// Check if user is logged in by verifying the token
const isLoggedIn = computed(() => !!store.state.token);
const dropdownOpen = ref(false);

// Function to toggle the user dropdown menu
function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

// Logout function clears user data and token, then redirects to login
function logout() {
  store.commit('setUser', null);          // Clear user data
  store.commit('setToken', null);          // Clear token
  localStorage.removeItem('token');        // Remove token from localStorage
  router.push('/login');                   // Redirect to login page
  dropdownOpen.value = false;              // Close the dropdown
}

// Watch for token changes to handle session persistence
watch(isLoggedIn, (loggedIn) => {
  if (!loggedIn) {
    router.push('/login'); // Redirect to login if user logs out
  }
});
</script>

<style scoped>
/* Navbar styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #35495e;
  padding: 10px 20px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
  font-size: 20px;
}

.nav-links a {
  margin-left: 20px;
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  color: #42b983;
}

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown span {
  user-select: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  color: black;
  min-width: 120px;
}

.dropdown-menu a {
  display: block;
  margin-bottom: 10px;
  color: #35495e;
  text-decoration: none;
}

.dropdown-menu a:hover {
  color: #42b983;
}
</style>
