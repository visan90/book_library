<template>
  <div class="book-form">
    <div class="book-form__link-wrap">
      <router-link to="/" class="book-form__link">
        Home
      </router-link>
      <router-link to="/my-library" class="book-form__link">
        My library
      </router-link>
    </div>
    <p class="book-form__title">Add your desired book</p>
    <form class="book-form__form" @submit.prevent="saveBook">
      <label class="book-form__input-wrapper">
        <span class="book-form__input-label">Title</span>
        <input
          v-model="$v.newBook.title.$model"
          class="book-form__input"
          type="text"
        />
      </label>
      <span
        v-if="$v.newBook.title.$error && !$v.newBook.title.required"
        class="error"
        >Book title is required</span
      >
      <label class="book-form__input-wrapper">
        <span class="book-form__input-label">Author</span>
        <input
          v-model="$v.newBook.author.$model"
          class="book-form__input"
          type="text"
        />
      </label>
      <span
        v-if="$v.newBook.author.$error && !$v.newBook.author.required"
        class="error"
        >Author is required</span
      >
      <label class="book-form__input-wrapper">
        <span class="book-form__input-label">Number of pages</span>
        <input
          v-model="$v.newBook.pages.$model"
          class="book-form__input"
          type="number"
          min="1"
        />
      </label>
      <span
        v-if="$v.newBook.pages.$error && !$v.newBook.pages.required"
        class="error"
        >Number of pages is required</span
      >
      <label class="book-form__input-wrapper">
        <span class="book-form__input-label">Wikipedia Link</span>
        <input
          v-model="$v.newBook.link.$model"
          class="book-form__input"
          type="text"
        />
      </label>
      <span
        v-if="$v.newBook.link.$error && !$v.newBook.link.required"
        class="error"
        >A link to the book on Wiki is required</span
      >
      <label class="book-form__input-wrapper"
        >Upload a book cover
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="book-form__upload"
          @change="uploadImage($event)"
        />
      </label>
      <button class="book-form__button" type="submit">Add book</button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddBook",
  components: {},
  mixins: [validationMixin],
  data() {
    return {
      newBook: {
        author: "",
        imageLink: "",
        link: "",
        pages: null,
        title: "",
        readStatus: false,
        review: "",
        rating: null,
      },
    };
  },
  validations: {
    newBook: {
      title: {
        required,
      },
      author: {
        required,
      },
      link: {
        required,
      },
      pages: {
        required,
      },
    },
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.newBook.imageLink = e.target.result;
      };
    },
    saveBook() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("addPersonalBook", this.newBook);
        this.$router.push("my-library");
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../public/variables.scss";
@import "../../public/mixins.scss";

.book-form {
  max-width: 1600px;
  margin: auto;
}
.book-form__form {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.book-form__title {
  @media only screen and (max-width: $breakpoint-medium) {
    padding-top: 120px;
  }
}
.book-form__input-wrapper {
  display: flex;
  flex-direction: column;
  margin: 15px 0 12px;
}
.book-form__input {
  margin: auto;
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

.book-form__link-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
}

.book-form__link {
  @include button;
  &:hover {
    cursor: pointer;
    color: #4db8e6;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.error {
  color: #fd6958;
  font-size: 14px;
}
.book-form__button {
  width: 260px;
  margin: 15px auto 0;
  background: #4db8e6;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  &:hover {
    cursor: pointer;
  }
}
.book-form__upload {
  margin: 5px auto 0;
}
</style>
