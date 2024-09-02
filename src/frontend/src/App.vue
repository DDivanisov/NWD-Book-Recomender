<template>
    <div class="wrapper">
      <aside id="sidebar">
        <div class="d-flex">
          <button class="toggle-btn" type="button">
            <i class="lni lni-menu"></i>
          </button>
          <div class="sidebar-logo">
            <a style="color: white;">Book Recommendor</a>
          </div>
        </div>
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" :class="{ active: isActive('home') }" @click="rout('home')">
              <i class="lni lni-home"></i>
              <span>Home</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" :class="{ active: isActive('books') }" @click="rout('books')">
              <i class="lni lni-book"></i>
              <span>Books</span>
            </a>
          </li>
          <li class="sidebar-item" v-if="isUserLoggedIn">
            <a href="#" class="sidebar-link" :class="{ active: isActive('bookmarks') }" @click="rout('bookmarks')">
              <i class="lni lni-heart"></i>
              <span>Bookmarks</span>
            </a>
          </li>
          <li class="sidebar-item" v-if="!isUserLoggedIn">
            <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
               data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
              <i class="lni lni-protection"></i>
              <span>Authentication</span>
            </a>
            <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
              <li class="sidebar-item">
                <a href="#" class="sidebar-link" :class="{ active: isActive('login') }" @click="rout('login')">
                  <i class="lni lni-enter"></i>
                  <span>Log in</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link" :class="{ active: isActive('register') }" @click="rout('register')">
                  <i class="lni lni-enter"></i>
                  <span>Register</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" v-if="isUserLoggedIn" @click="logout">
              <i class="lni lni-exit"></i>
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </aside>
      <div class="main p-3">
        <div class="text-center">
          <router-view />
        </div>
      </div>
    </div>
  </template>
  

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();
const isUserLoggedIn = computed(() => store.state.isUserLogedIn);

const logout = async () => {
  try {
    await store.dispatch('setToken', null);
    await store.dispatch('setUser', null);
    await store.dispatch('setPage', 1);
    await store.dispatch('setGenre', 'All');
    rout('home');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
const rout = (path) =>{
  router.push({name: path});
}
const collapseSidebar = () => {
  const sidebar = document.querySelector("#sidebar");
  if (sidebar.classList.contains("expand")) {
    sidebar.classList.remove("expand");
  }
};
onMounted(() => {
  const hamBurger = document.querySelector(".toggle-btn");
  if (hamBurger) {
    hamBurger.addEventListener("click", function () {
      document.querySelector("#sidebar").classList.toggle("expand");
    });
  }
});
watch(route, () => {
  collapseSidebar();
});
const isActive = (path) => {
  return route.name === path;
};
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

::after,
::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


li {
    list-style: none;
}

h1 {
    font-weight: 600;
    font-size: 1.5rem;
}

.wrapper {
    display: flex;
}

.main {
    min-height: 100vh;
    overflow-y: auto;
    width: 100%;
    overflow: hidden;
    transition: all 0.35s ease-in-out;
    background-image: url('../public/bookshelf.jpg');
}

#sidebar {
    width: 70px;
    min-width: 70px;
    z-index: 1000;
    transition: all .25s ease-in-out;
    background-color: #0e2238;
    display: flex;
    flex-direction: column;
}

#sidebar.expand {
    width: 260px;
    min-width: 260px;
}

.toggle-btn {
    background-color: transparent;
    cursor: pointer;
    border: 0;
    padding: 1rem 1.5rem;
}

.toggle-btn i {
    font-size: 1.5rem;
    color: #FFF;
}

.sidebar-logo {
    margin: auto 0;
}

.sidebar-logo a {
    color: #FFF;
    font-size: 1.15rem;
    font-weight: 600;
}

#sidebar:not(.expand) .sidebar-logo,
#sidebar:not(.expand) a.sidebar-link span {
    display: none;
}

.sidebar-nav {
    padding: 2rem 0;
    flex: 1 1 auto;
}

a.sidebar-link {
    padding: .625rem 1.625rem;
    color: #FFF;
    display: block;
    font-size: 0.9rem;
    white-space: nowrap;
    border-left: 3px solid transparent;
    text-decoration: none;
}

.sidebar-link i {
    font-size: 1.1rem;
    margin-right: .75rem;
}

a.sidebar-link:hover {
    background-color: rgba(255, 255, 255, .075);
    border-left: 3px solid #3b7ddd;
}

.sidebar-item {
    position: relative;
}

#sidebar:not(.expand) .sidebar-item .sidebar-dropdown {
    position: absolute;
    top: 0;
    left: 70px;
    background-color: #0e2238;
    padding: 0;
    min-width: 15rem;
    display: none;
    opacity: 0;
    transition: opacity 0.25s ease-in-out;
}

#sidebar:not(.expand) .sidebar-item:hover .has-dropdown+.sidebar-dropdown {
    display: block;
    max-height: 15em;
    max-height: 15em;
    opacity: 1;
}
#sidebar:not(.expand) .sidebar-item:hover .has-dropdown + .sidebar-dropdown a.sidebar-link span {
    display: inline; 
    visibility: visible;
}

#sidebar.expand .sidebar-link[data-bs-toggle="collapse"]::after {
    border: solid;
    border-width: 0 .075rem .075rem 0;
    content: "";
    display: inline-block;
    padding: 2px;
    position: absolute;
    right: 1.5rem;
    top: 1.4rem;
    transform: rotate(-135deg);
    transition: all .2s ease-out;
}

#sidebar.expand .sidebar-link[data-bs-toggle="collapse"].collapsed::after {
    transform: rotate(45deg);
    transition: all .2s ease-out;
}

a.sidebar-link.active {
  background-color: rgba(255, 255, 255, .075);
  border-left: 3px solid #3b7ddd;
  font-weight: 600;
}

a.sidebar-link.active i {
  color: #3b7ddd;
}

a.sidebar-link.active span {
  color: #3b7ddd;
}
</style>
