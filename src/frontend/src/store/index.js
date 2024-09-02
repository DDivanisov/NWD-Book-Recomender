import { createStore } from 'vuex';

const store = createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLogedIn: false,
    currentPage: 1,
    genre: 'All',
    route: {
      path: '',
      query: {},
      params: {}
    }
  },
  mutations: {
    SET_ROUTE(state, route) {
      state.route = route; 
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if(token){
        state.isUserLogedIn = true;
      }
      else{
        state.isUserLogedIn = false;
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_GENRE(state, genre){
      state.genre = genre;
    }
  },
  actions: {
    updateRoute({ commit }, route) {
      commit('SET_ROUTE', route);
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page);
    },
    setGenre({ commit }, genre){
      commit('SET_GENRE', genre);
    }
  },
  getters: {
    currentRoute: (state) => state.route,
    currentPath: (state) => state.route.path,
    currentParams: (state) => state.route.params,
    currentQuery: (state) => state.route.query,
    token: (state) => state.token,
    user: (state) => state.user,
    isUserLogedIn: (state) => state.isUserLogedIn,
    currentPage: (state) => state.currentPage,
    genre: (state) => state.genre
  }
});


export default store;
