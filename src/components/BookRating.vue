<template>
          <div>
            <p>Rating:</p>
            <star-rating v-bind:star-size="25"></star-rating>
             <div>
          <button v-if="!reviewStatus" @click="reviewStatus =!reviewStatus">{{review != '' ? 'Edit review' : 'Add review'}}</button>
          <p v-if="!reviewStatus">{{review}}</p>
          <div v-else>
          <textarea type="text" v-model="review"></textarea>
          <button @click="reviewStatus =!reviewStatus">Done</button>
          </div>
          </div>
          </div>    

</template>
<script>
import StarRating from 'vue-star-rating'
export default {
  name: 'BookRating',
  props: {},
  components:{
  StarRating
  },
  data(){
    return{
  reviewStatus: false,
  review: ''
    }
  }
}
</script>
<style scoped>

</style>