<template>
  <section class="favorites">
    <div class="favorites__link-wrap">
      <router-link to="/" class="favorites__link">
        Home
      </router-link>
      <router-link to="/add-book" class="favorites__link">
        Add my favourite book
      </router-link>
    </div>
    <div class="favorites__content">
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
@import "../../public/variables.scss";
@import "../../public/mixins.scss";

.favorites {
  max-width: 1600px;
  margin: auto;
}
.favorites__button {
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
.favorites__content {
  @media only screen and (max-width: $breakpoint-medium) {
    padding-top: 120px;
  }
}
.favorites__title {
  font-weight: 300;
  text-align: center;
  margin: auto;
  padding: 10px;
}
.favorites__text {
  text-align: center;
  margin: auto;
}
.favorites__list {
  list-style-type: none;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 310px);
  grid-gap: 20px;
  grid-auto-rows: auto;
  justify-content: center;
}

.favorites__link-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
}

.favorites__link {
  @include button;
  &:hover {
    cursor: pointer;
    color: #4db8e6;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
