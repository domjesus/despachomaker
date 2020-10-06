import Vue from "vue";
import VueRouter from "vue-router";
import Writing from "../views/Writing.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "writing",
    component: Writing,
  },
  {
    path: "/editing",
    name: "Editing",
    // meta: {
    //   reload: true,
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditingComponent.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
