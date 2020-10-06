import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import SeguradoModule from "./modules/SeguradoModule";
import TSCarencia from "./modules/TSCarencia";
import UsuarioModule from "./modules/UsuarioModule";
import DespachoEditModule from "./modules/DespachoEditModule";
import TextosDeItensModule from "./modules/TextosDeItensModule";

export default new Vuex.Store({
  modules: {
    SeguradoModule,
    TSCarencia,
    UsuarioModule,
    DespachoEditModule,
    TextosDeItensModule,
  },
});
