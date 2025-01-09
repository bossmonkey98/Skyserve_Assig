<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
</script>

<style>
/* Global styling */
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
