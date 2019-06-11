<template>
  <div id="app">
    <BookList />
    <FavoriteList />
  </div>
</template>

<script>
import BookList from './components/BookList.vue'
import FavoriteList from './components/FavoriteList.vue'
export default {
  name: 'app',
  components: {
    BookList,
    FavoriteList
  }
}
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
