export default {
  state: {
    anos: "",
    meses: "",
    dias: "",
    carencia: "",
  },
  getters: {
    getAnos(state) {
      return state.anos;
    },
    getMeses(state) {
      return state.meses;
    },
    getDias(state) {
      return state.dias;
    },
    getCarencia(state) {
      return state.carencia;
    },
  },
  mutations: {
    setAnos(state, newValue) {
      state.anos = newValue;
    },
    setMeses(state, newValue) {
      state.meses = newValue;
    },
    setDias(state, newValue) {
      state.dias = newValue;
    },
    setCarencia(state, newValue) {
      state.carencia = newValue;
    },
  },
  actions: {
    changeAnos(context, newValue) {
      context.commit("setAnos", newValue);
    },
    changeMeses(context, newValue) {
      context.commit("setMeses", newValue);
    },
    changeDias(context, newValue) {
      context.commit("setDias", newValue);
    },
    changeCarencia(context, newValue) {
      context.commit("setCarencia", newValue);
    },
  },
};
