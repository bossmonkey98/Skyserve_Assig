import { createStore } from 'vuex';
import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api'; // Base URL for backend API

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
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
    async signup({ commit }, userData) {
      try {
        const response = await axios.post(`${apiBaseUrl}/users/register`, JSON.stringify(userData));
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      } catch (error) {
        throw error;
      }
    },

    async login({ commit }, credentials) {
      try {
        axios.defaults.baseURL = apiBaseUrl;
        const response = await axios.post(`${apiBaseUrl}/users/login`, credentials);
        commit('setUser', response.data.user); // Ensure user data is stored
        commit('setToken', response.data.token); // Store token in Vuex state
        localStorage.setItem('token', response.data.token); // Save token to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // Set authorization header
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
