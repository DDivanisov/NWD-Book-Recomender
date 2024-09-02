import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/index' 
import App from './App.vue'
import router from './router'


const app = createApp(App)


router.afterEach((to) => {
    store.dispatch('updateRoute', {
      path: to.path,
      query: to.query,
      params: to.params
    });
  });
  
app.use(store).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap.js';