<template>
  <div class="upload">
    <h2>Upload GeoJSON, KML, or TIFF Files</h2>
    <input type="file" @change="handleFileUpload" multiple />
    <ul v-if="files.length">
      <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const files = ref([]);
const store = useStore();

function handleFileUpload(event) {
  const uploadedFiles = Array.from(event.target.files);
  files.value.push(...uploadedFiles);
  uploadedFiles.forEach((file) => {
    store.dispatch('uploadFile', file);
  });
}
</script>

<style scoped>
.upload {
  padding: 20px;
}
</style>
