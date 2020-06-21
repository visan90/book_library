<template>
  <section class="library">
    <div class="library__link-wrap">
      <router-link to="/add-book" class="library__link">
        Add my favourite book
      </router-link>
      <router-link to="/my-library" class="library__link">
        My library
      </router-link>
    </div>
    <h2 class="library__title">Best 100 books to read</h2>
    <div class="library__searchbar">
      <input
        v-model="searchedBook"
        class="library__searchbar--input"
        type="text"
        placeholder="Search by title or author"
      />
      <i class="fas fa-search library__searchbar--icon"></i>
    </div>
    <div class="library__list">
      <EachBook
        v-for="book in filteredBookList"
        :key="book.title + book.pages"
        :book="book"
      />
    </div>
  </section>
</template>

<script>
import EachBook from "../components/EachBook";
import { mapState } from "vuex";

export default {
  name: "BookList",
  components: {
    EachBook,
  },
  data() {
    return {
      searchedBook: "",
    };
  },
  computed: {
    ...mapState({
      books: (state) => state.books,
    }),
    filteredBookList() {
      return this.books.filter((item) => {
        return (
          item.title.toLowerCase().includes(this.searchedBook.toLowerCase()) ||
          item.author.toLowerCase().includes(this.searchedBook.toLowerCase())
        );
      });
    },
  },
  created() {
    this.$store.dispatch("loadData");
  },
};
</script>

<style lang="scss" scoped>
$shadow: 0px 1rem 2rem rgba(0, 0, 0, 0.1);
.library {
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
    padding: 10px;
  }
  &__searchbar {
    position: relative;
    text-align: center;
    margin: auto;
    width: 300px;
    height: 100%;
    &--input {
      width: 260px;
      height: 20px;
      border: none;
      outline: none;
      border-radius: 10rem;
      box-shadow: $shadow;
      padding: 10px;
      transition: all 0.2s;
      transition-delay: 0.1s;
    }
    &--icon {
      height: 16px;
      position: absolute;
      top: 12px;
      right: 20px;
      transition: all 0.2s;
      transition-delay: 0.1s;
    }
  }
  &__list {
    list-style-type: none;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
.library__link-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
}

.library__link {
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
