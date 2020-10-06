export default {
  state: {
    vinculos: "",
    recolhimentos: "",
    ppp: "",
    rural: "",
    dependentes: "",
    bpc: "",
    conclusao: {},
  },

  getters: {
    getVinculos(state) {
      return state.vinculos;
    },
    getRecolhimentos(state) {
      return state.recolhimentos;
    },
    getPPP(state) {
      return state.ppp;
    },
    getRural(state) {
      return state.rural;
    },
    getDependentes(state) {
      return state.dependentes;
    },
    getBpc(state) {
      return state.bpc;
    },
    getConclusao(state) {
      return state.conclusao;
    },
  },
  mutations: {
    setVinculos(state, newValue) {
      state.vinculos = newValue;
    },
    setRecolhimentos(state, newValue) {
      state.recolhimentos = newValue;
    },
    setPPP(state, newValue) {
      state.ppp = newValue;
    },
    setRural(state, newValue) {
      state.rural = newValue;
    },
    setDependentes(state, newValue) {
      state.dependentes = newValue;
    },
    setBpc(state, newValue) {
      state.bpc = newValue;
    },
    setConclusao(state, newValue) {
      state.conclusao = newValue;
    },
  },
  actions: {
    changeVinculos(context, newValue) {
      context.commit("setVinculos", newValue);
    },
    changeRecolhimentos(context, newValue) {
      context.commit("setRecolhimentos", newValue);
    },
    changePPP(context, newValue) {
      context.commit("setPPP", newValue);
    },
    changeRural(context, newValue) {
      context.commit("setRural", newValue);
    },
    changeDependentes(context, newValue) {
      context.commit("setDependentes", newValue);
    },
    changeBpc(context, newValue) {
      context.commit("setBpc", newValue);
    },
    changeConclusao(context, newValue) {
      context.commit("setConclusao", newValue);
    },
  },
};
