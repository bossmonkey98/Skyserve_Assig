import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    geoData: [], // Store for uploaded files and shapes
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addGeoData(state, data) {
      state.geoData.push(data);
    },
    removeGeoData(state, id) {
      state.geoData = state.geoData.filter((item) => item.id !== id);
    },
  },
  actions: {
    uploadFile({ commit }, file) {
      // Upload file logic (integration with backend)
      commit('addGeoData', file);
    },
  },
  getters: {
    allGeoData: (state) => state.geoData,
  },
});
