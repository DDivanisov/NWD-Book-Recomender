import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Home', icon: '/home.svg' }
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('../views/BooksView.vue'),
    meta: { title: 'Books', icon: '/book.svg'}
  },
  {
    path: '/book/:book_id',
    name: 'book',
    component: () => import('../views/BookView.vue'),
    meta: { title: 'Book Details' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { title: 'Register', icon: '/enter.svg'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Log In', icon: '/enter.svg' }
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('../views/LikedBooksView.vue'),
    meta: { requiresAuth: true, title: 'Bookmarks', icon: '/bookmark.svg' }
  },
  {
    path: '/likeGenres',
    name: 'likeGenres',
    component: () => import('../views/GenresULikeView.vue'),
    meta: { requiresAuth: true, title: 'Like Genres', icon: '/goodreads.svg' }
  },
  {
    path: '/foryou',
    name: 'foryou',
    component: () => import('../views/RecomendedBooksView.vue'),
    meta: { requiresAuth: true, title: 'Recomendations', icon: '/target.svg' }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isUserLogedIn;
  const user = store.getters.user;

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.meta.icon) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = to.meta.icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login' });
    } else if (to.matched.some(record => record.meta.requiresRole) && (!user || user.username !== 'adminDarko')) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
