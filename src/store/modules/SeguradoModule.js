export default {
  state: {
    nome: "",
    nb: "",
    especie: "",
    especieExtenso: "",
  },
  getters: {
    getNome(state) {
      return state.nome;
    },
    getNb(state) {
      return state.nb;
    },
    getEspecie(state) {
      return state.especie;
    },
    getEspecieExtenso(state) {
      return state.especieExtenso;
    },
  },
  mutations: {
    setNome(state, newValue) {
      state.nome = newValue;
    },
    setNb(state, newValue) {
      state.nb = newValue;
    },
    setEspecie(state, newValue) {
      state.especie = newValue;
    },
    setEspecieExtenso(state, newValue) {
      state.especieExtenso = newValue;
    },
  },
  actions: {
    changeNome(context, newValue) {
      context.commit("setNome", newValue);
    },
    changeNb(context, newValue) {
      context.commit("setNb", newValue);
    },
    changeEspecie(context, newValue) {
      context.commit("setEspecie", newValue);
    },
    changeEspecieExtenso(context, newValue) {
      context.commit("setEspecieExtenso", newValue);
    },
  },
};
