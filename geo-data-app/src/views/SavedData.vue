<template>
    <div class="saved-data">
      <h2>Saved Markers and Shapes</h2>
  
      <div class="section">
        <h3>Markers</h3>
        <ul>
          <li v-for="(marker, index) in markers" :key="index">
            Lat: {{ marker.coordinates[0] }}, Lng: {{ marker.coordinates[1] }}
          </li>
        </ul>
      </div>
  
      <div class="section">
        <h3>Shapes</h3>
        <ul>
          <li v-for="(shape, index) in shapes" :key="index">
            {{ shape.type }} - {{ shape.coordinates.length }} points
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const markers = ref([]);
  const shapes = ref([]);
  
  onMounted(async () => {
    try {
      const markersResponse = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/files/getMarkers`);
      markers.value = markersResponse.data;
  
      const shapesResponse = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/files/getShapes`);
      shapes.value = shapesResponse.data.features;
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  });
  </script>
  
  <style scoped>
  .saved-data {
    padding: 20px;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  h3 {
    color: #42b983;
  }
  </style>
  