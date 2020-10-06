export default {
  state: {
    textos: [],
    obs_vinculos: "",
    obs_recolhimentos: "",
    obs_ppp: "",
    obs_rural: "",
    obs_dependentes: "",
    obs_bpc: "",
    obs_gerais: "",
  },
  getters: {
    getTextos(state) {
      return state.textos;
    },
    getObsVinculos(state) {
      return state.obs_vinculos;
    },
    getObsRecolhimentos(state) {
      return state.obs_recolhimentos;
    },
    getObsPPP(state) {
      return state.obs_ppp;
    },
    getObsRural(state) {
      return state.obs_rural;
    },
    getObsDependentes(state) {
      return state.obs_dependentes;
    },
    getObsBpc(state) {
      return state.obs_bpc;
    },
    getObsGerais(state) {
      return state.obs_gerais;
    },
  },
  mutations: {
    setTextos(state, newValue) {
      state.textos = newValue;
    },
    setObsVinculos(state, newValue) {
      state.obs_vinculos = newValue;
    },
    setObsRecolhimentos(state, newValue) {
      state.obs_recolhimentos = newValue;
    },
    setObsPPP(state, newValue) {
      state.obs_ppp = newValue;
    },
    setObsRural(state, newValue) {
      state.obs_rural = newValue;
    },
    setObsDependentes(state, newValue) {
      state.obs_dependentes = newValue;
    },
    setObsBpc(state, newValue) {
      state.obs_bpc = newValue;
    },
    setObsGerais(state, newValue) {
      state.obs_gerais = newValue;
    },
  },
  actions: {
    changeTextos(context, newValue) {
      context.commit("setTextos", newValue);
    },
    changeObsVinculos(context, newValue) {
      context.commit("setObsVinculos", newValue);
    },
    changeObsRecolhimentos(context, newValue) {
      context.commit("setObsRecolhimentos", newValue);
    },
    changeObsPPP(context, newValue) {
      context.commit("setObsPPP", newValue);
    },
    changeObsRural(context, newValue) {
      context.commit("setObsRural", newValue);
    },
    changeObsDependentes(context, newValue) {
      context.commit("setObsDependentes", newValue);
    },
    changeObsBpc(context, newValue) {
      context.commit("setObsBpc", newValue);
    },
    changeObsGerais(context, newValue) {
      context.commit("setObsGerais", newValue);
    },
  },
};
