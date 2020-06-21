import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/list",
    name: "Home",
    component: Home,
  },
  {
    path: "/list",
    name: "book-list-view",
    component: () =>
      import(
        /* webpackChunkName: "book-list-view" */ "../views/BookListView.vue"
      ),
  },
  {
    path: "/my-library",
    name: "my-library",
    component: () =>
      import(
        /* webpackChunkName: "my-library" */ "../views/FavoriteListView.vue"
      ),
  },
  {
    path: "/add-book",
    name: "add-lbook",
    component: () =>
      import(/* webpackChunkName: "my-library" */ "../views/AddBookView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
