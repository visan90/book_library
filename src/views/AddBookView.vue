<template>
  <div class="book">
      <p>Add your desired book</p>
    <router-link to="/">Homepage</router-link>
    <label class="book__info">Title
        <input v-model="newBook.title" type="text"/>
    </label>
    <label class="book__info">Author
        <input v-model="newBook.author" type="text"/>
    </label>
    <label class="book__info">Number of pages
        <input v-model="newBook.pages" type="number"/>
    </label>
    <label class="book__info">Wikipedia Link
        <input v-model="newBook.link" type="text"/>
    </label>
    <label class="book__info">Upload a book cover
        <input
        type="file"
        accept="image/*"
        @change="uploadImage($event)"
        class="games-list__input"
        id="game_image"
        ref="fileInput"
      />
    </label>
    <button @click="saveBook()">Add book</button>
  </div>
</template>

<script>

export default {
  name: "AddBook",
  components: {

  },
  data() {
    return {
    newBook:{
        author: "",
        imageLink: "",
        link: "",
        pages: null,
        title: "",
        readStatus: false,
        review: "",
        rating: null

    }
    };
  },
  methods:{
        uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.newBook.imageLink = e.target.result;
      };
    },
    saveBook(){
        this.$store.commit("addPersonalBook", this.newBook)
    }
  }
};
</script>
<style scoped lang="scss">
.book{
    display: flex;
    flex-direction: column;
}
.book__info{
    padding: 5px 0;
}
</style>