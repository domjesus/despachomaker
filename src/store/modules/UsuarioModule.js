export default {
  state: {
    usuario_nome: "",
    usuario_cargo: "",
    usuario_matr: "",
    gex: "",
    cidade: "",
    ol_numero: "",
    ol_nome: "",
  },
  getters: {
    getUsuarioNome(state) {
      return state.usuario_nome;
    },
    getUsuarioCargo(state) {
      return state.usuario_cargo;
    },
    getUsuarioMatricula(state) {
      return state.usuario_matr;
    },
    getGex(state) {
      return state.gex;
    },
    getCidade(state) {
      return state.cidade;
    },
    getOlNumero(state) {
      return state.ol_numero;
    },
    getOlNome(state) {
      return state.ol_nome;
    },
  },
  mutations: {
    setUsuarioInfos(state, userArray) {
      // console.log("no store");
      // console.log(userArray);

      state.usuario_nome = userArray.usuario_nome;
      state.usuario_cargo = userArray.usuario_cargo;
      state.usuario_matr = userArray.usuario_matr;
      state.gex = userArray.gex;
      state.cidade = userArray.cidade;
      state.ol_numero = userArray.ol_numero;
      state.ol_nome = userArray.ol_nome;
    },
  },

  actions: {
    changeUsuarioInfos(context, userArray) {
      context.commit("setUsuarioInfos", userArray);
    },
  },
};
