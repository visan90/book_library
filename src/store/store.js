import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        favorites: [],
        books: [],
      },

      actions: {
        loadData({
          commit
        }) {
          axios.get("https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json").then((response) => {
            commit('updateBooks', response.data)
          })
        },
        checkToMarkAsRead({ commit, state }, bookTitle) {
          var getObject = state.favorites.find(item => item.title == bookTitle)
          var objectIndex = state.favorites.indexOf(getObject)
          commit('markAsRead', objectIndex)
        },
        createBookRating({ commit, state }, data){
          var getObject = state.favorites.find(item => item.title == data.bookTitle)
           var objectIndex = state.favorites.indexOf(getObject)
           var rating = {...state.favorites[objectIndex], review: data.review, rating: data.rating}
           commit('addBookRating', {rating: rating, index: objectIndex})
         },
      },

      mutations: {
        updateBooks(state, payload) {
          state.books = payload
        },
       addBookToFavorites(state, payload) {
         //added aditional verification in order to avoid "Add to My Books" button disabled workaround
         if (state.favorites.includes(payload) == false) {
            state.favorites.push({...payload, readStatus: false});
      }
       },
       removeBookFromFavorites(state, payload) {
        state.favorites.splice(state.favorites.indexOf(payload),1);
       },
       markAsRead(state, objectIndex) {
         state.favorites[objectIndex].readStatus = true
       },
       addBookRating(state, data){
         state.favorites[data.index]= data.rating
       }
      },

      getters: {
      
      }
})