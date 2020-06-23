<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <img class="small" :src="modalBook.imageLink" />
          <div class="details">
            <h2>{{ modalBook.title }}</h2>
            <p>Author: {{ modalBook.author }}</p>
            <p>Pages: {{ modalBook.pages }}</p>
            <p>
              <a target="_blank" :href="modalBook.link">More on Wikipedia</a>
            </p>
            <button
              class="modal__button"
              :disabled="checkBookFavorites"
              @click="addToFavorites()"
            >
              {{
                !checkBookFavorites ? "Add to My Books" : "Already in My books"
              }}
            </button>
          </div>
          <button class="modal__close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BookModal",
  props: {
    modalBook: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      favoriteBooks: (state) => state.favorites,
    }),
    checkBookFavorites() {
      return this.favoriteBooks.some(
        (item) => item.title === this.modalBook.title
      );
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal");
    },
    addToFavorites() {
      this.$store.commit("addBookToFavorites", this.modalBook);
    },
  },
};
</script>
<style lang="scss" scoped>
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
