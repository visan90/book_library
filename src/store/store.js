import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    favorites: [],
    books: [],
  },

  actions: {
    loadData({ commit }) {
      axios
        .get(
          "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json"
        )
        .then((response) => {
          const normalizedBooks = response.data.map((book) => ({
            title: book.title,
            author: book.author,
            pages: book.pages,
            link: book.link,
            imageLink: book.imageLink,
          }));
          commit("updateBooks", normalizedBooks);
        });
    },
    checkToMarkAsRead({ commit, state }, bookTitle) {
      const getObject = state.favorites.find((item) => item.title == bookTitle);
      const objectIndex = state.favorites.indexOf(getObject);
      commit("markAsRead", objectIndex);
    },
    sendToBookRating({ commit, state }, data) {
      const getObject = state.favorites.find(
        (item) => item.title == data.bookTitle
      );
      const objectIndex = state.favorites.indexOf(getObject);
      const ratingValues = { review: data.review, rating: data.rating };
      commit("addBookRating", {
        ratingValues: ratingValues,
        index: objectIndex,
      });
    },
  },

  mutations: {
    updateBooks(state, normalizedBooks) {
      state.books = normalizedBooks;
    },
    addBookToFavorites(state, payload) {
      //added aditional verification in order to avoid "Add to My Books" button disabled workaround
      if (state.favorites.includes(payload) == false) {
        state.favorites.push({
          ...payload,
          readStatus: false,
          rating: null,
          review: "",
        });
      }
    },
    removeBookFromFavorites(state, payload) {
      state.favorites.splice(state.favorites.indexOf(payload), 1);
    },
    markAsRead(state, objectIndex) {
      state.favorites[objectIndex].readStatus = true;
    },
    addBookRating(state, data) {
      state.favorites[data.index].rating = data.ratingValues.rating;
      state.favorites[data.index].review = data.ratingValues.review;
    },
    addPersonalBook(state, newBook) {
      state.favorites.push(newBook);
    },
  },

  getters: {},
});
