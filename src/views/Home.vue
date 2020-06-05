<template>
  <div class="home">
    <router-link class="home__button" to="/list">Choose from these 100 must read books</router-link>
    <router-link class="home__button" to="/my-library">My book library</router-link>
    <router-link class="home__button" to="/add-book">Add a book of your choosing to your library</router-link>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.home{
display:flex;
flex-direction: column;
}

</style>