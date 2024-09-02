<template>
    <div class="genre-selection">
      <h2>Select Your Favorite Genres</h2>
      <div class="genres" v-if="selectedGenres">
        <div 
          v-for="(genre, index) in genres" 
          :key="index" 
          :class="['genre', { selected: selectedGenres.includes(genre) }]" 
          @click="toggleGenre(genre)"
        >
          {{ genre }}
        </div>
      </div>
      <button @click="submitGenres" class="submit-btn">Submit</button>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import services from '../../services/services';

export default {
  setup() {
    const store = useStore();
    const genres = ref([
      'Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 
      'Romance', 'Historical', 'Non-Fiction', 'Biography', 'Self-Help', 
      'Horror', 'Adventure', 'Comedy', 'Drama'
    ]);
    const user = computed(() => store.state.user); 
    const selectedGenres = ref([]);

    const fetchSelectedGenres = async () => {
      try {
        const response = await services.getGenres(user.value._id);
        selectedGenres.value = response.data.genres || [];
      } catch (error) {
        console.error('Error fetching selected genres:', error);
      }
    };

    const toggleGenre = (genre) => {
      if (selectedGenres.value.includes(genre)) {
        removeGenre(genre);
      } else {
        selectedGenres.value.push(genre);
      }
    };

    const removeGenre = async (genre) => {
      selectedGenres.value = selectedGenres.value.filter(g => g !== genre);
    };

    const submitGenres = async () => {
      try {
        await updateGenres(selectedGenres.value);
        alert('Genres submitted successfully!');
      } catch (error) {
        console.error('Error submitting genres:', error);
      }
    };

    const updateGenres = async (genres) => {
      try {
        await services.addLikedGenres({ 
          user_id: user.value._id,
          genres
        });
      } catch (error) {
        console.error('Error updating genres:', error);
      }
    };

    onMounted(() => {
      fetchSelectedGenres();
    });

    return {
      genres,
      selectedGenres,
      toggleGenre,
      removeGenre,
      submitGenres
    };
  }
};
</script>

<style scoped lang="scss">
  .genre-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: rgb(250, 250, 250, 0.7);
    margin-top: 7%;
    margin-left: 7%;
    max-width: 80%;
    max-height: 70vh;
    h2 {
      margin-bottom: 20px;
    }
  
    .genres {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      width: 100%;
      max-width: 600px;
      margin-bottom: 20px;
    }
  
    .genre {
      padding: 10px;
      min-height: 50px;
      max-height: 100px;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3s;
      position: relative;
      
      &.selected {
        background-color: #4caf50;
        color: white;
        border-color: #388e3c;
      }
    }
  
    .submit-btn {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
  
      &:hover {
        background-color: #388e3c;
      }
    }
  }
</style>
  