<template>
  <section class="library" v-show="$store.state.toggle">
    <button class="library__button" @click="useToggle">My Books</button>
    <h2 class="library__title">Best 100 books to read</h2>
    <div class="library__searchbar">
      <input
        class="library__searchbar--input"
        type="text"
        v-model="searchedTerm"
        placeholder="Search by title or author"
      >
      <i class="fas fa-search library__searchbar--icon"></i>
    </div>
    <div class="library__list">
      <EachBook v-for="item in filteredList" :item="item" :key="item.imageLink"/>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import EachBook from "./EachBook.vue";
export default {
  name: "BookList",
  components: {
    EachBook
  },
  methods: {
    useToggle() {
      this.$store.state.toggle = !this.$store.state.toggle;
    }
  },
  data() {
    return {
      searchedTerm: ""
    };
  },
  computed: {
    filteredList() {
      return this.$store.state.books.filter(item => {
        return (
          item.title.toLowerCase().includes(this.searchedTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(this.searchedTerm.toLowerCase())
        );
      });
    }
  },
  created() {
    axios
      .get(
        "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json"
      )
      .then(response => {
        this.$store.state.books = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
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
</style>
