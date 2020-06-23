<template>
  <div class="library__item">
    <div class="item__wrap">
      <img class="item__img" :src="book.imageLink" />
      <span class="item__overlay"></span>
      <button class="item__button" @click="openModal">Details</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EachBook",
  props: {
    book: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openModal() {
      this.$store.commit("openModal", this.book);
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
</style>
