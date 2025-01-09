<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <router-link to="/" class="logo">Geo-Data App</router-link>
        <div class="nav-links">
          <router-link to="/map">Map</router-link>
          <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
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
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const isLoggedIn = computed(() => !!store.state.token);
const dropdownOpen = ref(false);


function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function logout() {
  store.commit('setUser', null);
  store.commit('setToken', null);
  router.push('/login');
}
</script>

<style scoped>
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

.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
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
