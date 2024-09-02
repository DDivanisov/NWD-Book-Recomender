<template>
  <div class="container py-5">
        <div v-if="loading" class="spinner">Loading...</div>
        <div class="row row-cols-1 row-cols-md-3 g-4 py-5" v-else>
            <div class="col" v-for="item in books" :key="item._id">
                <div class="card">
                    <div class="card-img">
                      <img :src="item.picture_link" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                    </div>
                    <div class="mb-5 justify-content-around">
                      <div>
                        <h4><i class="lni lni-pencil"></i>{{ item.author }}</h4>
                        <h4><i class="lni lni-thumbs-up"></i>{{ item.liked }}</h4>
                      </div>
                        <button class="btn btn-primary" @click="navigateTo({ name: 'book', params: { book_id: item._id }, query:{page: page} })">See more</button>
                    </div>
                </div>
            </div>
        </div>
  </div>
    
  </template>
  
  <script>
  export default {
    props: {
      books: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      page: {
        type: Number,
        required: true
      }
    },
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      }
    }
  };
  </script>
  
  <style  scoped lang="scss">
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.card-img-top{
    border-radius: 50px;
    height: 300px;
    width: 300px; 
    padding: 20px;
}
.card-img{
  align-items: center;
}
.card{
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    background-color: rgb(255, 255, 255, 0.6);
}
.card-text {
  max-height: 100px; 
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap; 
}
.card-body{
    padding: 25px;
    margin-top: -15px;
}
.btn-primary{
    border-radius: 50px;
    width: 120px;
    max-height: 150px
}
.btn-primary:hover{
    background-color: black;
    border: none;
}
</style>
  