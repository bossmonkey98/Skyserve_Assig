<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style>
nav {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
}
</style>
