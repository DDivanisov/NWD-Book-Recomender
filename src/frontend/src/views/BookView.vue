<template>
  <section class="main-wrap">
        <div class="book" v-if="book">
            <div class="image-gallery">
                <img :src="book.picture_link" id="bookImg" alt="">
            </div>
            <div class="book-details">
                <div class="details">
                    <h2>{{ book.title }}</h2>
                    <h3>{{ book.author }}</h3>
                    <h4>{{ book.page_num }}</h4>
                    <p>{{ book.description }}</p>
                </div>
                <div class="genres">
                  <span v-for="(gen, index) in book.genres" :key="index" class="genre">
                    {{ gen }}
                  </span>
                </div>
                <div class="liked">
                    <h3>{{ book.liked }}</h3>
                    <i class="lni lni-heart"></i>
                </div>
                <div class="sub-btn">
                    <button class="bookmark" @click="Bookmark()" v-if="!isbookmarked && user != null" ><i class="lni lni-thumbs-up"></i> Bookmark</button>
                    <button class="bookmark" @click="UnBookmark()" v-if="isbookmarked && user != null"><i class="lni lni-thumbs-down"> UnBookmark</i></button>
                </div>
            </div>
        </div>
    </section>
    <div v-if="user!=null && book != null" class="comments">
      <ComentsShow
        :username="user.username"
        :comments="book.comments"
        :book_id="book._id" 
        :loading="false"
      />
    </div>
  </template>
  
<script>
    import { ref, onMounted, nextTick, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import ComentsShow from '../components/ComentsShow.vue';
    import services from '../../services/services.js';
  
    export default {
    components: {
      ComentsShow
    },
    setup() {
      const store = useStore();
      const book = ref(null);
      const route = useRoute();
      const isbookmarked = ref(false);
      const user = computed(() => store.state.user); 
      
      const getBook = async () => {
        const response = await services.getBook(route.params.book_id);
        book.value = response.data;
        if(user.value != null)
          await isBookmarked();
      };
  
      const isBookmarked = async () => {
        try {
          const res = await services.getBookmark(user.value._id, book.value._id);
          if(res.data){
            isbookmarked.value = true;
          }
        }
        catch(err){
          console.log(err.response.data.msg);
          isbookmarked.value = false;
        }
      };
  
      const Bookmark = async () => {
        try{
          await services.modifyBook(1, book.value._id);
          book.value.liked += 1;
        }
        catch(err){
          console.log(err.response.data.msg);
        }
        const bookmark = {
          book_id: book.value._id,
          user_id: user.value._id
        }
        try{
          await services.createBookmark(bookmark);
        }
        catch(err){
          console.log(err.response.data.msg);
        }
        isBookmarked();
        await nextTick();
      };
  
      const UnBookmark = async () => {
        try{
          await services.modifyBook(-1, book.value._id);
          book.value.liked -= 1;
        }
        catch(err){
          console.log(err.response.data.msg);
        }
        const bookmark = {
          book_id: book.value._id,
          user_id: user.value._id
        }
        try{
          await services.deleteBookmark(bookmark);
        }
        catch(err){
          console.log(err.msg);
        }
        isBookmarked();
        await nextTick();
      };
  
      onMounted(() => {
        getBook();
      });
  
      return {
        book,
        user,
        isbookmarked,
        Bookmark,
        UnBookmark
      };
    }
    };
</script>
  
  <style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  .main-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  .book {
    width: 80%;
    display: flex;
  }
  
  .image-gallery {
    flex-basis: 47%;
    max-height: 700px;
    background: #011627;
    box-shadow: -10px 5px 10px 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.07);
    position: relative;
  }
  
  .book-details {
  flex-basis: 53%;
  background: lightblue;
  box-shadow: -10px 5px 10px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 30px 40px 40px;
  overflow-y: auto; 
  max-height: 700px; 
}

#bookImg {
  width: 100%;
  height: 90%;
  margin-top: 30px;
  object-fit: contain; 
}
  
  .details {
    margin-bottom: 20px;
  }
  
  .details h2 {
    font-size: 25px;
    font-weight: 600;
    line-height: 35px;
    text-transform: capitalize;
    margin-bottom: 10px;
    color: #011627;
  }
  
  .book-details .details h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 35px;
    margin-bottom: 10px;
    color: #011627;
  }
  
  .book-details .details h4 {
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    color: #f72585;
    margin-bottom: 10px;
  }
  
  .book-details .details p {
    font-size: 12px;
    font-weight: 500;
    line-height: 25px;
    color: #011627;
  }
  
  .genres {
  display: flex;
  flex-wrap: wrap; 
  gap: 10px; 
}

.genre {
  background-color: lightpink; 
  border-radius: 12px; 
  padding: 5px 10px; 
  max-width: 200px;
  max-height: 30px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
  position: relative; 
}
  
  .book-details .liked {
    margin-bottom: 50px;
    margin-top: 50px;
    display: flex;
    max-height: 50px;
  }
  
  
  .liked h3 {
    width: 70px;
    font-size: 20px;
    font-weight: 500;
    color: #011627;
    text-align: center;
  }

  .liked i {
    width: 70px;
    height: 50px;
  }
  
  .book-details .sub-btn {
    padding: 0 30px;
  }
  
  .sub-btn .bookmark {
    max-width: 300px;
    max-height: 100px;
    padding: 10px;
    border: 0;
    outline: 0;
    background: #0077b6;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    border-radius: 30px;
    box-shadow: 0 10px 10px rgba(85, 63, 240, 0.25);
    cursor: pointer;
    transition: .4s linear;
    position: relative;
  }
  
  .sub-btn .bookmark:hover {
    background: #00b4d8;
  }
  .comments {
    margin-top: 100px;
  }
</style>
