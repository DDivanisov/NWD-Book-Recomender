<template>
    <div class="container py-5" >
        <div v-if="loading" class="spinner">Loading...</div>
        <div v-else>
            <div v-if="books.length === 0" class="alert alert-warning">No recommendations available. {{ err }}</div>
            <div class="row row-cols-1 row-cols-md-3 g-4 py-5">
                <div class="col" v-for="item in books" :key="item._id">
                    <div class="card">
                        <div class="card-img">
                            <img :src="item.picture_link || defaultImage" class="card-img-top" alt="Book image">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                        </div>
                        <div class="mb-5 justify-content-around">
                            <div>
                                <h4><i class="lni lni-pencil"></i>{{ item.author }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import services from '../../services/services.js';
import { useStore } from 'vuex';
import env from '../../../env.js'

export default {
    setup() {
        const store = useStore();
        const books = ref([]);
        const loading = ref(true);
        const user = computed(() => store.state.user);
        const defaultImage = 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id1138179183?k=6&m=1138179183&s=612x612&w=0&h=prMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE=';
        const err = ref(null);

        const fetchBookImages = async () => {
            for (const book of books.value) {
                const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(book.title)}+inauthor:${encodeURIComponent(book.author)}&key=${env.googleApiKey}`;
                try {
                    const res = await fetch(googleBooksUrl);
                    const googleData = await res.json();

                    if (googleData.items && Array.isArray(googleData.items)) {
                        let itemWithImage = null;
                        for (const item of googleData.items) {
                            if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
                                itemWithImage = item;
                                break;
                            }
                        }

                        if (itemWithImage) {
                            book.picture_link = itemWithImage.volumeInfo.imageLinks.thumbnail;
                        } else {
                            book.picture_link = defaultImage;
                        }
                    } else {
                        console.warn('Unexpected Google Books API response format:', googleData);
                        book.picture_link = defaultImage;
                    }
                } catch (error) {
                    console.error('Error fetching book image:', error);
                    book.picture_link = defaultImage;
                }
            }
        };

        const getRecommendations = async () => {
            loading.value = true;

            try {
                const bmks = await services.getBookmarks(1, 15, user.value._id);
                const lkG = await services.getGenres(user.value._id);
                
                const bmk = bmks.data.books.map(book => `${book.title} - ${book.author}`);
                const genres = lkG.data.genres;

                if ( bmk.length == 0){
                    err.value = 'No books bookmarked! Pleas do so.'
                }
                else{
                    const response = await services.getRecomended({
                        bookmarks: bmk,
                        likedGenres: genres
                    });
                    const data = response.data;
                    books.value = data.recommendedBooks;

                    setTimeout(() => {
                        fetchBookImages();
                    }, 0);
                }

            } catch (error) {
                console.error('Error fetching books:', error.response.data.msg);
                err.value = error.response.data.msg;
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            getRecommendations();
        });

        return {
            books,
            loading,
            defaultImage,
            err
        };
    }
};
</script>

<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .card-img-top {
    border-radius: 50px;
    height: 300px;
    width: 300px; 
    padding: 20px;
  }
  .card-img {
    align-items: center;
  }
  .card {
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: rgb(255, 255, 255, 0.8);
  }
  .card-text {
    max-height: 200px;  
  }
  .card-body {
    padding: 25px;
    margin-top: -15px;
  }
</style>
