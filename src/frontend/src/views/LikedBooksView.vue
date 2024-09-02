<template>
    <div>
      <BooksShow
        :books="books"
        :loading="loading"
        :page="currentPage"
      />
      <div v-if="loading == false && books.length === 0" class="alert alert-warning" style="margin-top: 100px;">No bookmarks.</div>
      <PrevPageNext
        :currentPage="currentPage"
        :totalPages="totalPages"
        @pageChange="getAllBooks"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import PrevPageNext from '../components/PrevPageNext.vue';
  import services from '../../services/services.js';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import BooksShow from '../components/BooksShow.vue';
  
  export default {
    components: {
      PrevPageNext,
      BooksShow
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const books = ref([]);
      const totalBooks = ref(0);
      const totalPages = ref(0);
      const currentPage = ref(1);
      const loading = ref(true);
      const limit = 15;
      const user = computed(() => store.state.user);
  
      const getAllBooks = async (page) => {
        loading.value = true;
        try {
          const response = await services.getBookmarks(page, limit, user.value._id);
          if (response.status !== 200) throw new Error('Network response was not ok');
          const data = response.data;
          books.value = data.books;
          totalBooks.value = data.totalBooks;
          totalPages.value = data.totalPages === 0 ? 1 : data.totalPages;
          currentPage.value = data.currentPage;
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const navigateTo = (path) => {
        router.push(path);
      };
  
      onMounted(() => {
        getAllBooks(currentPage.value);
      });
  
      return {
        books,
        totalBooks,
        totalPages,
        currentPage,
        loading,
        getAllBooks,
        navigateTo,
        user
      };
    }
  };
  </script>
  
  <style scoped lang="scss">
  .books {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
  }
  
  .spinner {
    flex: 1 1 100%;
    text-align: center;
    font-size: 24px;
    margin: 20px;
  }
  
  .book-card {
    display: flex;
    flex-direction: column;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
  }
  
  .card-img-top {
    width: 100%;
    height: 40%; /* Adjust the height as needed */
    object-fit: cover;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .card-subtitle {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .card-genres {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    max-height: 50px;
    overflow: hidden;
  }
  
  .genre {
    margin: 2px;
    padding: 5px 10px;
    background-color: #eee;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .pagination button {
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .pagination span {
    font-size: 18px;
  }
  </style>
  