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
        }
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
       markAsRead(state, payload) {
         var getObject = state.favorites.find(item => item.title == payload)
         var objectIndex = state.favorites.indexOf(getObject)
         state.favorites[objectIndex].readStatus = true
       },
       addBookRating(state, payload){
        var getObject = state.favorites.find(item => item.title == payload.bookTitle)
         var objectIndex = state.favorites.indexOf(getObject)
         state.favorites[objectIndex].review = payload.review
         state.favorites[objectIndex].rating = payload.rating
         console.log(state.favorites)
       }
      },

      getters: {
      
      }
})