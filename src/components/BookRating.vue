<template>
  <div class="rating">
    <button
      v-if="!reviewStatus"
      class="rating__button"
      @click="reviewStatus = !reviewStatus"
    >
      {{ review != "" ? "Edit review" : "Add review" }}
    </button>
    <div v-if="!reviewStatus && rating">
      <StarRating
        v-model="rating"
        :read-only="true"
        :show-rating="false"
        :rating="rating"
        :star-size="20"
      ></StarRating>
    </div>
    <p v-if="!reviewStatus" :class="review === '' ? '' : 'rating__review'">
      {{ review }}
    </p>
    <div v-else class="rating__add-review">
      <p>Rating:</p>
      <StarRating
        v-model="rating"
        :rating="rating"
        :star-size="20"
      ></StarRating>
      <p>Review:</p>
      <textarea
        :value="review"
        type="text"
        maxlength="100"
        @change="getText($event)"
      ></textarea>
      <button class="rating__button" @click="saveReview()">Done</button>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "BookRating",
  components: {
    StarRating,
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reviewStatus: false,
      review: "",
      rating: null,
    };
  },
  mounted() {
    if (this.book.review) {
      this.review = this.book.review;
    }
    if (this.book.rating) {
      this.rating = this.book.rating;
    }
  },

  methods: {
    getText(event) {
      this.review = event.target.value;
    },
    saveReview() {
      this.reviewStatus = !this.reviewStatus;
      this.$store.dispatch("sendToBookRating", {
        review: this.review,
        rating: this.rating,
        bookTitle: this.book.title,
      });
    },
  },
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
      content: '"';
    }
    &:after {
      content: '"';
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
