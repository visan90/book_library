<template>
  <div>
    <section class="favorites" v-show="!$store.state.toggle">
      <button class="favorites__button" @click="useToggle">Go back to library</button>
      <h2 class="favorites__title">My Books</h2>
      <p>Total Books: {{ checkFavorite }}</p>
      <p v-if="checkFavorite">Books left to read: {{ checkFavorite - $store.state.counter }}</p>
      <p v-else>No books chosen yet</p>
      <div class="favorites__list">
        <EachFavoriteBook v-for="item in $store.state.favorites" :item='item' :key="item.year+item.pages" />
      </div>
    </section>
  </div>
</template>

<script>
import EachFavoriteBook from './EachFavoriteBook.vue'

export default {
  name: 'FavoriteList',
  components: {
    EachFavoriteBook,
  },
  props: {

  },

  data() {
    return {
      searchedTerm: '',
    }
  },
  computed: {
    checkFavorite() {
      return this.$store.state.favorites.length
    } 
  },
  methods: {
    useToggle() {
      this.$store.state.toggle = !this.$store.state.toggle
    }

  },
}
</script>


<style lang="scss" scoped>
$shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.1);

.favorites {
    max-width: 1600px;
  margin: auto;
  &__button {
  background: #fff;
  border: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
    }
  }
  &__title {
  font-weight: 300;
  text-align: center;
  padding: 10px;
  }
    &__list {
    list-style-type: none;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}


</style>
