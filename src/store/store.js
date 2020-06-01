import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        favorites: [],
        books: [],
        counter: 0,
        toggle: true
      },
      mutations: {
       saveBookLibrary(state,payload) {
         state.books = payload
       }
      },
      getters: {
      
      }
})