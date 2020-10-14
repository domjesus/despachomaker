<template>
  <div class="main">
    <b-modal
      id="modalNewUser"
      ref="modalNewUser"
      size="xl"
      @ok.prevent="sendForm"
    >
      <h3>Informe os dados abaixo para salvar um novo usuário!</h3>
      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="userName">Nome: </label>
        </div>
        <div class="col col-md-8">
          <input
            type="text"
            name="usuario_nome"
            class="form-control"
            v-model="user.usuario_nome"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="matricula">Matrícula: </label>
        </div>

        <div class="col col-md-2">
          <input
            type="text"
            name="usuario_matr"
            class="form-control"
            v-model="user.usuario_matr"
            v-mask="'#######'"
            placeholder="números"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="cargo">Cargo: </label>
        </div>
        <div class="col col-md-4">
          <input
            type="text"
            name="usuario_cargo"
            class="form-control"
            v-model="user.usuario_cargo"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="gex">Gex: </label>
        </div>

        <div class="col col-md-4">
          <input
            type="text"
            name="gex"
            class="form-control"
            v-model="user.gex"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="cidade-uf">Cidade/UF: </label>
        </div>
        <div class="col col-md-4">
          <input
            type="text"
            name="cidade"
            class="form-control"
            v-model="user.cidade"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="ol_numero">OL Número</label>
        </div>

        <div class="col col-md-2">
          <input
            type="text"
            name="ol_numero"
            class="form-control"
            v-model="user.ol_numero"
            v-mask="'##.###.###'"
            placeholder="00.000.000"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col col-md-2">
          <label for="ol_nome">OL Nome</label>
        </div>
        <div class="col col-md-4">
          <input
            type="text"
            name="ol_nome"
            class="form-control"
            v-model="user.ol_nome"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { dev } from "../../auxiliarInterno";
import { doFetch } from "../../utils/FetchFactory";
import { mask } from "vue-the-mask";

export default {
  name: "FormNewUser",
  props: {
    show: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      user: {
        gex: "",
        cidade: "",
        ol_numero: "",
        ol_nome: "",
        usuario_nome: "",
        usuario_matr: "",
        usuario_cargo: "",
      },
    };
  },
  methods: {
    sendForm() {
      let bodyData = new FormData();
      bodyData.append("flag", "gravar_new");
      bodyData.append("saveNewUser", "true");

      Object.entries(this.user).map((u) => {
        // console.log(u);

        bodyData.append(u[0], u[1]);
      });

      const url = dev
        ? "http://localhost/teletrabalho/ajax/manter_sessao_dados_usuario.php"
        : "/ajax/manter_sessao_dados_usuario.php";

      const newUser = doFetch(url, "POST", bodyData);

      newUser
        .then((res) => {
          this.$bvToast.toast(res.data.msg, {
            title: "Status",
            variant: "success",
            solid: true,
          });
          this.$refs["modalNewUser"].hide();
        })
        .catch((err) => {
          this.$bvToast.toast(err, {
            title: "Erro!",
            variant: "danger",
            solid: true,
          });
        });

      //   console.log(bodyData.entries());
    },
  },

  watch: {
    show() {
      this.$refs["modalNewUser"].show();
    },
  },
  directives: {
    mask,
  },
};
</script>

<style scoped>
.main {
  display: flexbox;
  align-items: left;
  justify-content: left;
  text-align: left;
}
label {
  font-weight: bold;
  padding-top: 5px;
}
</style>