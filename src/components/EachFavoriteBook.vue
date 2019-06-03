<template>
       <div class="favorites__book">
          <img class="small" :src ="item.imageLink">
          <h2>{{item.title}}</h2>
          <p>Author: {{item.author}}</p>
          <p>Pages: {{item.pages}}</p>
          <p><a :href="item.link">More on Wikipedia</a></p>
          <button :disabled = !status @click="checkToIsRead">{{status ? 'Not Read' : 'Read'}}</button>
          <button class="Button" @click="removeFromFavorites(item)">Remove from Favorites</button>
          <BookRating v-show="!status"></BookRating>      
    </div>
</template>
<script>

import BookRating from './BookRating'
export default {
  name: 'EachFavoriteBook',
  props: ['item'],
  components:{
  BookRating
  },
  data(){
    return{
  status: true
    }
  },
  methods: {
removeFromFavorites(item) {
        this.$store.state.favorites.splice(this.$store.state.favorites.indexOf(item),1)
        if(this.status==false){
          this.$store.state.counter --
        }
      },
checkToIsRead(){
  this.status =false
  this.$store.state.counter ++
}
  }
}
</script>
<style scoped>

.favorites__book {
  max-width: 450px;
}

.details{
  width: 269px;
  height: 402px;
  margin:33px
}

.small{
  width:120px;
  height: 188px;
}
a {
  text-decoration: none;
}
</style>