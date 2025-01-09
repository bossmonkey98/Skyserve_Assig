import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Upload from "../views/UploadFile.vue";
import MapView from "../views/MapView.vue";
import Login from "../views/LoginView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/upload", name: "Upload", component: Upload },
  { path: "/map", name: "MapView", component: MapView },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
