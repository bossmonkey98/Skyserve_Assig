<template>
    <div>
      <button @click="addMarker">Add Marker</button>
      <ul>
        <li v-for="(marker, index) in markers" :key="index">
          {{ marker.name }}
          <button @click="removeMarker(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const markers = ref(store.getters.allMarkers);
  
  function addMarker() {
    // Placeholder logic for adding marker (coordinates should be dynamic)
    const newMarker = { name: `Marker ${markers.value.length + 1}`, coordinates: [0, 0] };
    store.dispatch('addMarker', newMarker);
  }
  
  function removeMarker(index) {
    store.dispatch('removeMarker', markers.value[index].id);
  }
  </script>
  