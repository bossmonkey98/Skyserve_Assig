<template>
    <div>
      <button @click="toggleDrawing">{{ drawing ? 'Disable' : 'Enable' }} Drawing</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const drawing = ref(false);
  
  function toggleDrawing() {
    drawing.value = !drawing.value;
    // Logic to enable/disable drawing will be passed from parent component
    emit('toggle-drawing', drawing.value);
  }
  </script>
  