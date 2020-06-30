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
    <BookModal v-if="toggleModal" :modal-book="modalBook" name="modal" />
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
import BookModal from "../components/BookModal";
import { mapState } from "vuex";

export default {
  name: "BookList",
  components: {
    EachBook,
    BookModal,
  },
  data() {
    return {
      searchedBook: "",
    };
  },
  computed: {
    ...mapState({
      books: (state) => state.books,
      toggleModal: (state) => state.toggleModal,
      modalBook: (state) => state.modalBook,
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
@import "../../public/variables.scss";
@import "../../public/mixins.scss";

.library {
  max-width: 1600px;
  margin: auto;
}
.library__button {
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
.library__title {
  font-weight: 300;
  text-align: center;
  padding: 10px;
  @media only screen and (max-width: $breakpoint-medium) {
    padding-top: 120px;
  }
}
.library__searchbar {
  position: relative;
  text-align: center;
  margin: auto;
  width: 300px;
  height: 100%;
}
.library__searchbar--input {
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
.library__searchbar--icon {
  height: 16px;
  position: absolute;
  top: 12px;
  right: 20px;
  transition: all 0.2s;
  transition-delay: 0.1s;
}

.library__list {
  list-style-type: none;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.library__link-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
}

.library__link {
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
