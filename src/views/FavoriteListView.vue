<template>
  <section class="favorites">
    <div class="favorites__link-wrap">
      <router-link to="/" class="favorites__link">
        Home
      </router-link>
      <router-link to="/add-lbook" class="favorites__link">
        Add my favourite book
      </router-link>
    </div>
    <h2 class="favorites__title">My Books</h2>
    <p class="favorites__text">Total Books: {{ checkFavoritesLength }}</p>
    <p v-if="checkFavoritesLength" class="favorites__text">
      Books left to read: {{ checkUnreadBooks }}
    </p>
    <p v-else class="favorites__text">No books read yet</p>
    <div class="favorites__list">
      <EachFavoriteBook
        v-for="book in favoriteBooks"
        :key="book.title + book.pages"
        :book="book"
      />
    </div>
  </section>
</template>

<script>
import EachFavoriteBook from "../components/EachFavoriteBook.vue";
import { mapState } from "vuex";

export default {
  name: "FavoriteList",
  components: {
    EachFavoriteBook,
  },
  computed: {
    ...mapState({
      favoriteBooks: (state) => state.favorites,
    }),
    checkFavoritesLength() {
      return this.favoriteBooks.length;
    },
    checkUnreadBooks() {
      return this.favoriteBooks.filter((book) => book.readStatus === false)
        .length;
    },
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

.favorites__link-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
}

.favorites__link {
  background: #fff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  color: #000000;
  padding: 10px 0;
  width: 180px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: #4db8e6;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
