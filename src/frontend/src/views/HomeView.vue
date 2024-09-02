<template>
  <div class="container">
    <div class="link-left" @click="rout('likeGenres')">
      <span class="link">Like genres</span>
    </div>
    <div class="link-right" @click="rout('foryou')">
      <span class="link">Recomendations</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const rout = (path) =>{
  router.push({name: path});
}
</script>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
  height: 95vh;
}

.link-left {
  display: flex;
  align-self: flex-start;
  border: 1px black solid;
  padding: 100px;
  margin: 10px;
  margin-top: 2%;
  background: url('../../public/heart_bg.png') no-repeat center/contain  rgb(255, 255, 255, 0.6);
  border-radius: 15px;
}

.link-right {
  display: flex;
  align-self: flex-end;
  border: 1px black solid;
  margin: 10px;
  margin-top: 2%;
  padding: 100px;
  background: url('../../public/for-you-bg.png') no-repeat center/contain  rgb(255, 255, 255, 0.6);
  border-radius: 15px;
}

.link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 40px;
}
.link-left, .link-right {
  width: 400px; 
  padding: 20px;
  height: 600px;
  display: flex;
  justify-content: center; 
  align-items: center;
}
.link-left:hover, .link-right:hover {
  cursor: pointer;
  background-color: lightblue;
  opacity: 0.7;

  .link {
    font-weight: bold;
    color: blue;
  }
}
</style>
