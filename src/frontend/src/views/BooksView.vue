<template>
  <div>
    <FilterTab 
      @genreSelected="filterBooksByGenre" 
      :genre="genre"
    />
    <div v-if="loading == false && books.length === 0" class="alert alert-warning" style="margin-top: 200px;">No books.</div>
    <BooksShow
      :books="books"
      :loading="loading"
      :page="currentPage"
    />
    <PrevPageNext
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="getAllBooks"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import PrevPageNext from '../components/PrevPageNext.vue';
import BooksShow from '../components/BooksShow.vue';
import FilterTab from '@/components/FilterTab.vue';
import services from '../../services/services.js';

export default {
  components: {
    PrevPageNext,
    BooksShow,
    FilterTab
  },
  setup() {
    const store = useStore();
    const books = ref([]);
    const totalBooks = ref(0);
    const totalPages = ref(0);
    const loading = ref(true);
    const limit = 15;
    const currentPage = computed(() => store.state.currentPage);
    const genre = computed(() => store.state.genre);

    const getAllBooks = async (page, selectGenre) => {
      const genreToUse = selectGenre || genre.value;
      store.dispatch('setPage', page);
      loading.value = true;
      try {
        console.log(genreToUse);
        const response = await services.getBooks(page, limit, genreToUse);
        if (response.status !== 200) throw new Error('Network response was not ok');
        const data = response.data;
        books.value = data.books;
        totalBooks.value = data.totalBooks;
        totalPages.value = data.totalPages;
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        loading.value = false;
      }
    };

    const filterBooksByGenre = (selectGenre) => {
      store.dispatch('setGenre', selectGenre);
      getAllBooks(1, selectGenre);
    };

    onMounted(() => {
      getAllBooks(currentPage.value, genre.value);
    });

    return {
      books,
      totalBooks,
      totalPages,
      currentPage,
      loading,
      getAllBooks,
      filterBooksByGenre,
      genre
    };
  }
};
</script>

<style scoped lang="scss">
</style>
