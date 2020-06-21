<template>
  <div class="library__item">
    <div class="item__wrap">
      <img class="item__img" :src="book.imageLink" />
      <span class="item__overlay"></span>
      <button class="item__button" @click="toggleModal">Details</button>
    </div>
    <transition v-if="showModal" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <img class="small" :src="book.imageLink" />
            <div class="details">
              <h2>{{ book.title }}</h2>
              <p>Author: {{ book.author }}</p>
              <p>Pages: {{ book.pages }}</p>
              <p>
                <a target="_blank" :href="book.link">More on Wikipedia</a>
              </p>
              <button
                class="modal__button"
                :disabled="checkBookFavorites"
                @click="addToFavorites()"
              >
                {{
                  !checkBookFavorites
                    ? "Add to My Books"
                    : "Already in My books"
                }}
              </button>
            </div>
            <button class="modal__close" @click="toggleModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EachBook",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapState({
      favoriteBooks: (state) => state.favorites,
    }),
    checkBookFavorites() {
      return this.favoriteBooks.some((item) => item.title === this.book.title);
    },
  },
  methods: {
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
    addToFavorites() {
      this.$store.commit("addBookToFavorites", this.book);
    },
  },
};
</script>
<style lang="scss" scoped>
$shadow: 6px 10px 20px rgba(0, 0, 0, 0.22);
.library__item {
  width: 269px;
  height: 100%;
  padding: 25px;
}
.item__wrap {
  position: relative;
}
.item__img {
  width: 269px;
  height: 402px;
  border-radius: 20px;
  box-shadow: $shadow;
}
.item__overlay {
  width: 50px;
  height: 402px;
  position: absolute;
  left: 0;
  border-radius: 20px 0 0 20px;
  background: rgba(255, 255, 255, 0.5);
}
.item__button {
  background: #fff;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 140px;
  &:hover {
    cursor: pointer;
    transform: scale(1.3, 1.3);
    -webkit-transform: scale(1.3, 1.3);
    -moz-transform: scale(1.3, 1.3);
  }
}
.details {
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 250px;
}

.small {
  width: 188px;
  height: 282px;
}
a {
  text-decoration: none;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  max-width: 700px;
  width: 100%;
  margin: 0px auto;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  opacity: 0.95;
  border-radius: 10px;
  position: relative;
}

.modal-body {
  margin: 20px 0;
}

.modal__button {
  background: #4db8e6;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  &:disabled {
    background: lighten(#4db8e6, 20%);
  }
  &:hover {
    cursor: pointer;
  }
}
.modal__close {
  position: absolute;
  top: -10px;
  border-radius: 20px;
  background: #fff;
  right: -10px;
  border: none;
  padding: 10px 15px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
