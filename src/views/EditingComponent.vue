<template>
  <div class="main">
    <div class="heade-img-locale" v-if="userNome">
      <img src="https://teletrabalho.net/scpr/brasao_pq.png" /><br />
      <p>Instituto Nacional do Seguro Social</p>
      <br />
      <div class="localization mb-5">
        GEX {{ gex }}<br />
        {{ olNome }} - {{ olNumero }} <br />
        {{ cidade }} - {{ new Date().toLocaleDateString() }}
      </div>
    </div>

    <div class="alert alert-warning" v-else>
      Atenção! Dados do usuário não recuperados!
    </div>

    <div
      class="segurado mb-3"
      v-if="nomeSegurado && especie && numeroBeneficio"
    >
      <div class="row">
        <div class="col col-md-2">
          <label for="nomeSegurado">Nome:</label>
        </div>
        <div class="col col-md-6">
          <input
            type="text"
            name="nomeSegurado"
            :value="nomeSegurado"
            class="form-control disabled"
            readonly="true"
          />
        </div>
      </div>

      <div class="row mb-3 mt-3">
        <div class="col col-md-2 mt-2">
          <label for="esp">Esp:</label>
        </div>

        <div class="col col-md-1">
          <input
            type="text"
            :value="especie"
            class="form-control disabled"
            readonly="true"
          />
        </div>

        <div class="col col-sm-1 mt-2 text-center">
          <label for="nb">NB:</label>
        </div>

        <div class="col col-md-3">
          <input
            type="text"
            name="nb"
            :value="numeroBeneficio"
            class="form-control disabled"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <p class="alert alert-warning no-print">
        Não foi informado Nome ou Espécie ou NB
      </p>
    </div>

    <div class="textos">
      <h4>
        Assunto: Trata-se de requerimento de {{ especieExtenso }} o qual foi
        {{ conclusao.decisao }}, tendo em vista {{ trataConclusao }}, com
        fundamento no {{ conclusao.norma }}.
      </h4>

      <div class="vinculos mt-3">{{ vinculos }} {{ obsVinculos }}</div>
      <div class="recolhimentos mt-3">
        Recolhimentos: {{ recolhimentos }} {{ obsRecolhimentos }}
      </div>
      <div class="ppp mt-3">PPP: {{ ppp }} {{ obsPPP }}</div>
      <div class="rural mt-3">Rural: {{ rural }} {{ obsRural }}</div>
      <div class="dependentes mt-3">
        Dependentes: {{ dependentes }} {{ obsDependentes }}
      </div>
      <div class="bpc mt-3">Bpc: {{ bpc }} {{ obsBpc }}</div>
      <div class="obsGerais mt-3" v-show="obsGerais">
        Obs Gerais: {{ obsGerais }}
      </div>

      <div class="ts mt-3" v-show="tsAnos && tsMeses && tsDias">
        O tempo comprovado foi de {{ tsAnos }} anos, {{ tsMeses }} mes(es) e
        {{ tsDias }} dia(s).
      </div>

      <div class="carencia mt-3" v-show="tsCarencia">
        A carência comprovada foi de {{ tsCarencia }} contribuição(ões).
      </div>
      <div class="conclusao">
        Considerando o exposto o benefício foi {{ conclusao.decisao }}
      </div>
    </div>

    <div id="servidor_aux" class="mt-5" v-if="userNome">
      <div id="servidor">
        {{ userNome }}<br />
        {{ userCargo }}<br />
        Matr&iacute;cula: {{ userMatricula }}
      </div>
    </div>

    <div class="alert alert-warning no-print" v-else>
      Atenção! Dados do usuário não recuperados!<br />
      <router-link to="/">
        <button
          v-b-tooltip.right.hover
          title="Voltar para edição."
          class="btn btn-md span-edit"
        >
          <span class="span-edit">
            <font-awesome-icon icon="arrow-left" />
          </span>
        </button>
      </router-link>
    </div>

    <div class="back-to-edit mb-2 no-print">
      <router-link to="/">
        <button
          v-b-tooltip.right.hover
          title="Voltar para edição."
          class="btn btn-sm"
        >
          <span class="span-edit">
            <font-awesome-icon icon="arrow-left" size="lg" />
          </span>
        </button>
      </router-link>

      <div @click="print">
        <font-awesome-icon icon="print" size="lg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dev } from "../../auxiliarInterno";

library.add(faArrowLeft, faPrint);

export default {
  name: "EditingComponent",
  computed: {
    ...mapGetters({
      userNome: "getUsuarioNome",
      userMatricula: "getUsuarioMatricula",
      userCargo: "getUsuarioCargo",
      cidade: "getCidade",
      gex: "getGex",
      olNumero: "getOlNumero",
      olNome: "getOlNome",
      nomeSegurado: "getNome",
      numeroBeneficio: "getNb",
      especie: "getEspecie",
      especieExtenso: "getEspecieExtenso",
      vinculos: "getVinculos",
      recolhimentos: "getRecolhimentos",
      ppp: "getPPP",
      rural: "getRural",
      dependentes: "getDependentes",
      bpc: "getBpc",
      obsVinculos: "getObsVinculos",
      obsRecolhimentos: "getObsRecolhimentos",
      obsPPP: "getObsPPP",
      obsRural: "getObsRural",
      obsDependentes: "getObsDependentes",
      obsBpc: "getObsBpc",
      obsGerais: "getObsGerais",
      conclusao: "getConclusao",
      tsAnos: "getAnos",
      tsMeses: "getMeses",
      tsDias: "getDias",
      tsCarencia: "getCarencia",
    }),
    trataConclusao() {
      const conclusaotmp = this.conclusao.descricao;
      // const conclusao = this.$store.getConclusao();
      if (!conclusaotmp) return "MOTIVO DE CONCLUSÃO NÃO INFORMADO";

      return conclusaotmp.split("-")
        ? conclusaotmp.split("-")[0]
        : conclusaotmp.descricao;
    },
  },
  methods: {
    print() {
      window.print();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (confirm("Caso tenha editado o texto ele não será salvo. Confirma?"))
      next();
  },
  mounted() {
    // console.log(this.$store);

    const elements = document.querySelectorAll(
      ".vinculos,.recolhimentos,.ppp,.rural,.dependentes,.bpc,.obsGerais,.ts,.carencia,.conclusao"
    );
    elements.forEach((el) => {
      el.setAttribute("contenteditable", "true");
      el.setAttribute("v-b-tooltip.top", "true");
      el.setAttribute("title", "Para editar clique em cima do texto!");
    });

    // console.log(elements);
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.textos {
  display: flex;
  flex-flow: column;
  align-items: left;
}
.textos > div {
  /* border: 1px solid black; */
  /* border-radius: 6px; */
  text-align: left;
  padding: 15px;
  text-align: justify;
}
.span-edit {
  width: 35px;
  height: 35px;
  /* position: absolute; */
  /* top: 5px; */
  /* left: 5px;*/
  position: relative;
}

label {
  font-weight: bold;
}

.disabled {
  cursor: not-allowed;
}

.back-to-edit {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-flow: row;
  align-items: center;
  width: fit-content;
  /* margin-left: 50%; */
}

.about {
  /* display: inline-flex; */
  height: fit-content;
}

#servidor_aux {
  bottom: 0;
  position: relative;
  width: 100%;
  text-align: center;
}
#servidor > p {
  padding: 0;
}

@media print {
  .no-print {
    display: none;
  }
  input {
    background: none;
    border: none;
  }
}

.print {
  cursor: pointer;
  padding-left: 30px;
  width: 65px;
  height: 65px;
}
</style>