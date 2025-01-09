import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Upload from '../views/Upload.vue';
import MapView from '../views/MapView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/upload', name: 'Upload', component: Upload },
  { path: '/map', name: 'MapView', component: MapView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
