<template>
  <div>
    <div class="map-container" ref="mapContainer"></div>
    <!-- Floating control panel -->
    <div class="floating-control-panel">
      <button @click="toggleUnit">{{ distanceUnit }}</button>
      <button @click="trySaveShapes" :disabled="!canSave">Save Shapes</button>
      <button @click="trySaveMarkers" :disabled="!canSave">Save Markers</button>
      <label class="upload-btn">
        Upload File
        <input type="file" @change="handleFileUpload" />
      </label>
    </div>
  </div>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import * as turf from '@turf/turf';

const store = useStore();
const mapContainer = ref(null);
let map, drawnItems, drawControl;
const measuredDistance = ref(null);
const distanceUnit = ref('kilometers');
const canSave = computed(() => !!store.state.token);

onMounted(async () => {
  map = L.map(mapContainer.value).setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: { polyline: true, polygon: true, rectangle: true, marker: true },
  });
  map.addControl(drawControl);

  map.on('draw:created', (e) => {
    const layer = e.layer;
    drawnItems.addLayer(layer);
    measuredDistance.value = calculateDistance(layer.toGeoJSON());
  });

  await loadShapes();
  await loadMarkers();
});

function calculateDistance(feature) {
  if (feature.geometry.type === 'LineString') {
    let totalDistance = 0;
    const coordinates = feature.geometry.coordinates;
    for (let i = 0; i < coordinates.length - 1; i++) {
      totalDistance += turf.distance(
        turf.point(coordinates[i]),
        turf.point(coordinates[i + 1]),
        { units: distanceUnit.value }
      );
    }
    return totalDistance.toFixed(2);
  }
  return '0';
}

function toggleUnit() {
  distanceUnit.value = distanceUnit.value === 'kilometers' ? 'miles' : 'kilometers';
}

function trySaveShapes() {
  if (!canSave.value) {
    alert('Please log in to save shapes.');
    return;
  }
  saveShapes();
}

async function saveShapes() {
  try {
    const shapes = drawnItems.toGeoJSON();
    await axios.post(`${process.env.VUE_APP_BASE_URL}/api/files/saveShapes`, { shapes });
    alert('Shapes saved successfully!');
  } catch (error) {
    console.error('Failed to save shapes:', error);
  }
}

function trySaveMarkers() {
  if (!canSave.value) {
    alert('Please log in to save markers.');
    return;
  }
  saveMarkers();
}

async function saveMarkers() {
  try {
    const markers = store.getters.allMarkers;
    await axios.post(`${process.env.VUE_APP_BASE_URL}/api/files/saveMarkers`, { markers });
    alert('Markers saved successfully!');
  } catch (error) {
    console.error('Failed to save markers:', error);
  }
}

async function loadShapes() {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/files/getShapes`);
    const shapes = response.data;
    L.geoJSON(shapes).addTo(map);
  } catch (error) {
    console.error('Failed to load shapes:', error);
  }
}

async function loadMarkers() {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/files/getMarkers`);
    const markers = response.data;
    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.coordinates, { draggable: true }).addTo(map);
      store.dispatch('addMarker', leafletMarker);
    });
  } catch (error) {
    console.error('Failed to load markers:', error);
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('No file selected!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const geojson = JSON.parse(e.target.result);
      L.geoJSON(geojson).addTo(map);
      alert('File uploaded successfully and displayed on the map!');
    } catch (err) {
      console.error('Failed to read the file:', err);
      alert('Invalid file format. Please upload a valid GeoJSON file.');
    }
  };
  reader.readAsText(file);
}
</script>


<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
}

/* Floating control panel */
.floating-control-panel {
  position: absolute;
  top: 10%;
  right: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

button, .upload-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover, .upload-btn:hover {
  background-color: #339966;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-btn input[type="file"] {
  display: none;
}
</style>
