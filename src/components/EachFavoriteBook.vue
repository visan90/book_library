<template>
  <div class="fav-book">
    <div class="fav-book__wrap">
      <img class="fav-book__img" :src="book.imageLink">
      <p class="fav-book__title">{{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <p>Pages: {{ book.pages }}</p>
      <p>
        <a :href="book.link">More on Wikipedia</a>
      </p>
    </div>
    <button
      :disabled="!status"
      @click="checkToIsRead"
      class="fav-book__button"
    >Mark as read</button>
    <button @click="removeFromFavorites(book)" class="fav-book__button">Remove</button>
    <BookRating v-show="!status"/>
  </div>
</template>
<script>
import BookRating from "./BookRating";
export default {
  name: "EachFavoriteBook",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  components: {
    BookRating
  },
  data() {
    return {
      status: true
    };
  },
  methods: {
    removeFromFavorites(book) {
      this.$store.state.favorites.splice(
        this.$store.state.favorites.indexOf(book),
        1
      );
      if (this.status == false) {
        this.$store.state.counter--;
      }
    },
    checkToIsRead() {
      this.status = false;
      this.$store.state.counter++;
    }
  }
};
</script>
<style scoped lang="scss">
.fav-book {
  max-width: 300px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    p {
      line-height: 1.5;
    }
  }
  &__title {
    font-size: 25px;
    margin: 10px auto;
  }
  &__button {
    background: #4db8e6;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    margin: 0 2px;
    &:disabled {
      background: lighten(#4db8e6, 20%);
    }
    &:hover {
      cursor: pointer;
    }
  }
  &__img {
    width: 120px;
    height: 188px;
  }
}

a {
  text-decoration: none;
}
</style>