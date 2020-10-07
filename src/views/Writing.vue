/* eslint-disable no-unused-vars */

<template>
  <div>
    <b-card no-body>
      <b-tabs pills card>
        <b-tab title="Dados Cadastrais" active>
          <dados-basicos />
        </b-tab>
        <b-tab title="Vínculos">
          <itens-despacho-component
            :itens="vinculos"
            name="vinculos"
            dispatch="changeVinculos"
          />

          <observacoes name="obs_vinculos" dispatch="changeObsVinculos" />
        </b-tab>
        <b-tab title="Recolhimentos">
          <itens-despacho-component
            :itens="recolhimentos"
            name="recolhimentos"
            dispatch="changeRecolhimentos"
          />
          <observacoes
            name="obs_recolhimentos"
            dispatch="changeObsRecolhimentos"
          />
        </b-tab>
        <b-tab title="PPPs">
          <itens-despacho-component
            :itens="ppp"
            name="ppp"
            dispatch="changePPP"
          />
          <observacoes name="obs_ppp" dispatch="changeObsPPP" />
        </b-tab>
        <b-tab title="Rural">
          <itens-despacho-component
            :itens="rural"
            name="rural"
            dispatch="changeRural"
          />
          <observacoes name="obs_rural" dispatch="changeObsRural" />
        </b-tab>
        <b-tab title="Dependentes"
          ><itens-despacho-component
            :itens="dependentes"
            name="dependentes"
            dispatch="changeDependentes"
          />
          <observacoes name="obs_dependentes" dispatch="changeObsDependentes" />
        </b-tab>
        <b-tab title="Bpc"
          ><itens-despacho-component
            :itens="bpc"
            name="bpc"
            dispatch="changeBpc"
          />
          <observacoes name="obs_bpc" dispatch="changeObsBpc" />
        </b-tab>
        <b-tab title="Observações">
          <observacoes name="obs_gerais" dispatch="changeObsGerais" />
          <aux-buttons :buttons="btnAuxiliares" />
        </b-tab>

        <b-tab title="Config">
          <b-card-text>
            <div class="" v-if="userAuth || userNome">
              User nome: {{ userNome }} - matrícula: {{ userMatricula }} -
              cargo: {{ userCargo }} - OLNome: {{ olNome }} - OlNumero
              {{ olNumero }} - Gex {{ gex }} - Cidade {{ cidade }}
              <br />
              <button class="btn btn-lg btn-danger" @click="logout">
                Sair
              </button>
            </div>
            <div v-else>
              <p class="alert alert-warning">Usuário não informado!</p>

              <new-user :show="addNewUser" />
            </div> </b-card-text
        ></b-tab>
      </b-tabs>

      <div
        id="user"
        class="user mt-3 mr-3"
        v-if="userAuth || userNome"
        v-b-tooltip.top.hover
        :title="userNome"
      >
        <font-awesome-icon icon="user-alt" />
      </div>

      <div id="user" class="user mt-2" v-else>
        <div class="col-col-md-2">
          <b-input-group>
            <b-input
              name="matricula"
              id="matricula"
              placeholder="Matricula"
              class="form-control"
            />
            <b-input-group-append>
              <b-button
                variant="primary"
                @click="fetchAuth"
                v-b-tooltip.top.hover
                title="Já tem cadastro? Informe a matrícula!"
                >Go!</b-button
              >
            </b-input-group-append>
            <b-input-group-append>
              <b-button
                variant="warning"
                @click="showFormToNewUser"
                v-b-tooltip.top.hover
                title="Não tenho cadastro!"
                >+</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <router-link to="/editing" class="mt-5"
        ><span class="alert alert-primary span-view"
          >Visualizar</span
        ></router-link
      >
    </b-card>

    <div class="modal-fetch">
      <div>
        <b-modal
          ref="modal-1"
          centered
          no-close-on-backdrop
          hide-footer
          title="Pesquisando"
        >
          <p>Recuperando textos...</p>
          <b-spinner label="Loading..."></b-spinner>
        </b-modal>
      </div>
    </div>
    <div class="alert alert-danger" v-if="error">{{ errorMsg }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import DadosBasicos from "./../components/DadosBasicos.vue";
import ItensDespachoComponent from "./../components/ItensDespachoComponent.vue";
import { mapGetters, mapActions } from "vuex";
import NewUser from "./../components/FormNewUser.vue";
import Observacoes from "./../components/TextAreaObservacoes.vue";
import AuxButtons from "./../components/AuxButtons.vue";
import { doFetch } from "./../../utils/FetchFactory.js";
import { dev, prod } from "./../../auxiliarInterno.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserAlt);

import {
  setCookie,
  deleteCookies,
  getCookie,
} from "./../../utils/CookieManager";

export default {
  name: "Writing",
  data() {
    return {
      userAuth: false,
      vinculos: [],
      recolhimentos: [],
      ppp: [],
      rural: [],
      dependentes: [],
      bpc: [],
      btnAuxiliares: [],
      fetching: false,
      error: false,
      errorMsg: "",
      textos: [],
      addNewUser: 0,
    };
  },
  methods: {
    ...mapActions(["changeUsuarioInfos", "changeTextos"]),

    showFormToNewUser() {
      this.addNewUser = Math.random(1, 1000);
    },
    fetchAuth() {
      const matricula = document.querySelector("#matricula").value;

      if (!matricula) {
        this.$bvToast.toast(`Informe a matrícula!`, {
          title: `Erro`,
          variant: "danger",
          solid: true,
        });

        return;
      }

      const bodyData = new FormData();
      bodyData.append("flag", "recupera_sessao_new");
      bodyData.append("matricula", matricula);

      const url = dev
        ? "http://localhost/teletrabalho/ajax/manter_sessao_dados_usuario.php"
        : "../ajax/manter_sessao_dados_usuario.php";

      console.log(url);

      const method = "POST";

      const user = doFetch(url, method, bodyData);

      this.fetching = true;

      user
        .then((m) => {
          // console.log("retorno BD: ");

          // console.log(m.data);

          if (m.data) {
            this.$store.dispatch("changeUsuarioInfos", m.data);

            setCookie(m.data);

            this.$bvToast.toast(
              `Usuário '${m.data.usuario_nome}' recuperado com sucesso`,
              {
                title: `Bem vindo ${m.data.usuario_nome}`,
                variant: "success",
                solid: true,
              }
            );

            this.userAuth = true;
            this.error = false;
          } else {
            this.$bvToast.toast(
              `Desculpe, não deu certo! Talvez o seu usuário não tenha sido criado ainda. Clique no botão '+' ao lado de 'Go' e cadastre seus dados.`,
              {
                title: `Não achei nada!`,
                variant: "danger",
                solid: true,
              }
            );
          }
          this.fetch = false;
        })
        .catch((err) => {
          this.$bvToast.toast(err, {
            title: `Não achei nada!`,
            variant: "danger",
            solid: true,
          });
          this.fetch = false;
        });
    },

    filterItens() {
      this.vinculos = this.textos.vinculos;
      this.recolhimentos = this.textos.recolhimentos;
      this.ppp = this.textos.ppp;
      this.rural = this.textos.rural;
      this.dependentes = this.textos.dependentes;
      this.bpc = this.textos.bpc;
      this.btnAuxiliares = this.textos.auxButtons;
    },

    getOneCookie(cname) {
      return getCookie(cname);
      // console.log(`User name ${userNome}`);
    },

    setCookieToLocale() {
      const isAuth = this.getOneCookie("userIsAuth");
      let userInfos = [];

      if (isAuth) {
        const n = document.cookie.split(";");
        // console.log(n);

        for (let i = 0; i < n.length; i++) {
          const splited = n[i].split("=");
          // console.log(splited);

          let field = splited[0].trim();
          let value = splited[1].trim();
          userInfos[field] = value;

          // console.log(field + " - " + value);
        }
        // console.log(userInfos);

        this.$store.dispatch("changeUsuarioInfos", userInfos);
      }
    },
    delCookies() {
      deleteCookies();
    },
    logout() {
      this.$store.dispatch("changeUsuarioInfos", []);
      this.userAuth = false;

      this.$bvToast.toast(`Logout com sucesso!`, {
        title: `Logout`,
        variant: "info",
        solid: true,
      });

      return this.delCookies();
    },
  },
  computed: {
    ...mapGetters({
      userNome: "getUsuarioNome",
      userMatricula: "getUsuarioMatricula",
      userCargo: "getUsuarioCargo",
      cidade: "getCidade",
      gex: "getGex",
      olNumero: "getOlNumero",
      olNome: "getOlNome",
      conclusao: "getConclusao",
    }),
  },
  components: {
    DadosBasicos,
    ItensDespachoComponent,
    NewUser,
    Observacoes,
    AuxButtons,
    FontAwesomeIcon,
  },
  mounted() {
    // const user = this.getCookie("userNome");
    // console.log(`User: ${user}`);

    this.setCookieToLocale();

    // console.log(this.$route);

    // if (!this.justFetched) {
    // this.$store.dispatch("changeJustFetched", true);
    // console.log("load/reload...");

    this.$refs["modal-1"].show();

    const url = dev
      ? "http://localhost/teletrabalho/ajax/RecuperaTextoDespacho.php"
      : "../ajax/RecuperaTextoDespacho.php";

    console.log(url);

    const texto = doFetch(url, "POST", {});

    texto
      .then((t) => {
        // console.log(t.data);

        this.textos = t.data;
        this.$store.dispatch("changeTextos", t.data);

        this.filterItens();
        // this.itens = t.data.vinculos;
        this.$refs["modal-1"].hide();
      })
      .catch((err) => {
        this.error = true;
        this.errorMsg = err;
        this.$refs["modal-1"].hide();
      });

    // console.log(this.data);
    // } else {
    // this.textos = this.textosFetched;
    // this.filterItens();
    // }

    // console.log(this.textosFetched);
  },
};
</script>

<style scoped>
.user {
  position: absolute;
  top: 5px;
  right: 5px;
}
.modal-fetch {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.span-view {
  position: absolute;
  bottom: 5px;
  left: 15px;
  font-size: 18px;
  font-weight: bold;
}

input[type="radio"] {
  width: 1.8em;
  height: 1.8em;
}
</style>