<template>
  <div class="fav-book" :class="book.readStatus ? 'fav-book--read': 'fav-book--notread'">
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
      v-show="!book.readStatus"
      @click="changeToIsRead()"
      class="fav-book__button"
    >Mark as read</button>
    <button @click="removeFromFavorites()" class="fav-book__button">Remove book</button>
    <BookRating v-show="book.readStatus" :book= "book"/>
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
  methods: {
    removeFromFavorites() {
      this.$store.commit('removeBookFromFavorites', this.book)
    },
    changeToIsRead() {
      this.$store.dispatch('checkToMarkAsRead', this.book.title)

    }
  }
};
</script>
<style scoped lang="scss">
.fav-book--read {
  box-shadow: 4px 6px 10px rgb(119, 221, 119);
}
.fav-book--notread {
  box-shadow: 4px 6px 10px rgb(255, 129, 123);
}
.fav-book {
  max-width: 300px;
  padding: 20px;
  text-align: center;
  
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