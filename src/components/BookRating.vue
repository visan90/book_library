<template>
  <div class="rating">
    <p>Rating:</p>
    <star-rating v-model="rating" v-bind:star-size="20"></star-rating>
      <button
        v-if="!reviewStatus"
        @click="reviewStatus =!reviewStatus"
        class="rating__button"
      >{{review != '' ? 'Edit review' : 'Add review'}}</button>
      <p :class="review==='' ? '': 'rating__review'" v-if="!reviewStatus">{{ review }}</p>
      <div v-else class="rating__add-review">
        <textarea type="text" v-model="review" maxlength="100"></textarea>
        <button @click="saveRating()" class="rating__button">Done</button>
      </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "BookRating",
  props: {
    bookTitle: {
      type: String,
      required: true
    }
  },
  components: {
    StarRating
  },
  data() {
    return {
      reviewStatus: false,
      review: "",
      rating: null
    };
  },
  methods:{
    saveRating(){
      this.reviewStatus =!this.reviewStatus
      console.log(this.bookTitle)
      this.$store.dispatch('createBookRating', {review: this.review, rating: this.rating, bookTitle: this.bookTitle})
    }
  }
};
</script>
<style scoped lang="scss">
.rating {
  margin-top: 20px;
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
  &__review {
    font-style: italic;
    margin-top: 10px;
    &:before {
      content: '"'
    }
    &:after {
      content: '"'
    }
  }
  &__add-review {
    textarea {
      display: block;
      margin: auto;
      text-align: center;
      margin-bottom: 10px;
      resize: none;

    }
  }
}
.vue-star-rating {
  justify-content: center;
  margin-bottom: 10px;
}
</style>