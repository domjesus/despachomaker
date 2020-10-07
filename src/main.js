import Vue from "vue";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(faUserSecret);

// Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Vuex);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);

import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
