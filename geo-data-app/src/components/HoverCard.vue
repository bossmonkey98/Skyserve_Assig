<template>
    <div v-if="hoverInfo" class="hover-card">
      <h4>{{ hoverInfo.name }}</h4>
      <p>{{ hoverInfo.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const hoverInfo = ref(null);
  
  // Logic to update hoverInfo based on mouse events will be passed from parent component
  </script>
  
  <style scoped>
  .hover-card {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    pointer-events: none;
  }
  </style>
  