import { createStore } from 'vuex';
import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api'; // Base URL for backend API

export default createStore({
  state: {
    user: null,
    token: null,
    geoData: [],
    markers: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    addGeoData(state, data) {
      state.geoData.push(data);
    },
    addMarker(state, marker) {
      state.markers.push(marker);
    },
    removeMarker(state, id) {
      state.markers = state.markers.filter((m) => m.id !== id);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${apiBaseUrl}/users/login`, credentials);
        commit('setUser', response.data);
        commit('setToken', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    async uploadFile({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${apiBaseUrl}/files/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        commit('addGeoData', response.data);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    },
    addMarker({ commit }, marker) {
      commit('addMarker', marker);
    },
    removeMarker({ commit }, id) {
      commit('removeMarker', id);
    },
  },
  getters: {
    allGeoData: (state) => state.geoData,
    allMarkers: (state) => state.markers,
  },
});
