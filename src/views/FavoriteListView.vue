<template>
    <section class="favorites">
      <router-link to="/">Homepage</router-link>
      <h2 class="favorites__title">My Books</h2>
      <p class="favorites__text">Total Books: {{ checkFavorite }}</p>
      <p class="favorites__text" v-if="checkFavorite">Books left to read: {{ checkFavorite - booksRead }}</p>
      <p class="favorites__text" v-else>No books chosen yet</p>
      <div class="favorites__list">
        <EachFavoriteBook
          v-for="book in favoriteBooks"
          :book="book"
          :key="book.year+book.pages"
        />
      </div>
    </section>
</template>

<script>
import EachFavoriteBook from "../components/EachFavoriteBook.vue";
import { mapState } from 'vuex'

export default {
  name: "FavoriteList",
  components: {
    EachFavoriteBook
  },
  data() {
    return {
      searchedTerm: ""
    };
  },
  computed: {
    ...mapState({
       favoriteBooks: state => state.favorites,
       booksRead: state => state.counter
     }),
    checkFavorite() {
      return this.favoriteBooks.length;
    }
  },
};
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
    position: fixed;
    z-index: 2;
    &:hover {
      cursor: pointer;
      transform: scale(1.3, 1.3);
      -webkit-transform: scale(1.3, 1.3);
      -moz-transform: scale(1.3, 1.3);
    }
  }
  &__title {
    font-weight: 300;
    text-align: center;
    margin: auto;
    padding: 10px;
  }
  &__text {
    text-align: center;
    margin: auto;
  }
  &__list {
    list-style-type: none;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 310px);
    grid-gap: 20px;
    grid-auto-rows: auto;
    justify-content: center;
  }
}
</style>
