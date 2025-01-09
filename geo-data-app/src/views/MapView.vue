<template>
  <div class="map-container" ref="mapContainer"></div>
  <div class="floating-panel">
    <button @click="toggleUnit">{{ distanceUnit }}</button>
    <p v-if="measuredDistance">Distance: {{ measuredDistance }} {{ distanceUnit }}</p>
    <button @click="saveShapes">Save Shapes</button>
    <button @click="saveMarkers">Save Markers</button>
  </div>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import * as turf from '@turf/turf';

const store = useStore();
const mapContainer = ref(null);
let map, drawnItems, drawControl;
const measuredDistance = ref(null);
const distanceUnit = ref('km');

onMounted(async () => {
  // Initialize Leaflet map
  map = L.map(mapContainer.value).setView([0, 0], 2);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Initialize feature group to store drawn shapes
  drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // Add drawing controls
  drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
    },
    draw: {
      polyline: true,
      polygon: true,
      rectangle: true,
      circle: false,
      marker: false,
    },
  });
  map.addControl(drawControl);

  // Handle drawing events
  map.on('draw:created', (e) => {
    const layer = e.layer;
    drawnItems.addLayer(layer);

    if (e.layerType === 'polyline' || e.layerType === 'polygon') {
      const geojson = layer.toGeoJSON();
      const distance = calculateDistance(geojson);
      measuredDistance.value = distance;
    }
  });

  // Load saved shapes and markers
  await loadShapes();
  await loadMarkers();
});

function calculateDistance(featureCollection) {
  let totalDistance = 0;

  // Ensure it's a FeatureCollection
  if (featureCollection && featureCollection.type === 'FeatureCollection') {
    featureCollection.features.forEach((feature) => {
      const coordinates = feature.geometry.coordinates;

      if (feature.geometry.type === 'LineString') {
        for (let i = 0; i < coordinates.length - 1; i++) {
          totalDistance += turf.distance(
            turf.point(coordinates[i]),
            turf.point(coordinates[i + 1]),
            { units: distanceUnit.value }
          );
        }
      }
    });
  }

  return totalDistance.toFixed(2);
}


function toggleUnit() {
  distanceUnit.value = distanceUnit.value === 'kilometers' ? 'miles' : 'kilometers';
  if (measuredDistance.value) {
    measuredDistance.value = calculateDistance(drawnItems.toGeoJSON());
  }
}

async function saveShapes() {
  try {
    const shapes = drawnItems.toGeoJSON();
    await axios.post('/api/files/saveShapes', { shapes });
    alert('Shapes saved successfully!');
  } catch (error) {
    console.error('Failed to save shapes:', error);
  }
}

async function loadShapes() {
  try {
    const response = await axios.get('/api/files/getShapes');
    const shapes = response.data;
    L.geoJSON(shapes).addTo(map);
  } catch (error) {
    console.error('Failed to load shapes:', error);
  }
}

async function saveMarkers() {
  try {
    const markers = store.getters.allMarkers;
    await axios.post('/api/files/saveMarkers', { markers });
    alert('Markers saved successfully!');
  } catch (error) {
    console.error('Failed to save markers:', error);
  }
}

async function loadMarkers() {
  try {
    const response = await axios.get('/api/files/getMarkers');
    const markers = response.data;
    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.coordinates, { draggable: true }).addTo(map);
      store.dispatch('addMarker', leafletMarker);
    });
  } catch (error) {
    console.error('Failed to load markers:', error);
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

.floating-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
