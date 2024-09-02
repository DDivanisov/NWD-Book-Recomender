<template>
  <div class="container">
    <div class="link-left">
      <router-link to="/likeGenres" class="link">What genres you like</router-link>
    </div>
    <div class="link-right">
      <router-link to="/foryou" class="link">Books that are recommended for you</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped lang="scss">

.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
}

.link-left {
  display: flex;
  justify-content: flex-start;
  border: 1px black solid;
  padding: 10px;
  margin: 10px;
}

.link-right {
  display: flex;
  justify-content: flex-end;
  border: 1px black solid;
  margin: 10px;
  padding: 10px;
}

.link {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
</style>
