<template>
  <div class="main">
    <div class="divs-hided no-print" v-if="divsHided.length > 0">
      <p class="bg-info">Textos ocultados. Clique para mostrar</p>

      <div v-for="(div, i) in divsHided" :key="i">
        <span
          class="btn btn-success"
          @click="showDiv(div, i)"
          style="margin: 10px"
          title="Clique para mostrar!"
        >
          {{ div }} <font-awesome-icon icon="arrow-down" size="lg"
        /></span>
      </div>
    </div>
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
        <div class="col col-md-2 mt-2" v-if="especie != 99">
          <label for="esp">Esp:</label>
        </div>

        <div class="col col-md-1" v-if="especie != 99">
          <input
            type="text"
            :value="especie"
            class="form-control disabled"
            readonly="true"
          />
        </div>

        <div class="col col-md-2 mt-2 text-center" v-if="especie == 99">
          <label for="nb">Protocolo:</label>
        </div>

        <div class="col col-sm-1 mt-2 text-center" v-if="especie != 99">
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
      <h5>
        Assunto: Trata-se de requerimento de {{ especieExtenso }} o qual foi
        {{ conclusao.decisao }}, tendo em vista {{ trataConclusao }}, com
        fundamento no {{ conclusao.norma }}.
      </h5>

      <div class="vinculos mt-3">
        {{ vinculos }} {{ obsVinculos
        }}<span class="no-print btn btn-danger" @click="hideDiv('vinculos')">
          <font-awesome-icon icon="minus-circle" size="lg" />
        </span>
      </div>
      <div class="recolhimentos mt-3">
        {{ recolhimentos }} {{ obsRecolhimentos }}
        <span class="no-print btn btn-danger" @click="hideDiv('recolhimentos')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>
      <div class="ppp mt-3">
        {{ ppp }} {{ obsPPP }}
        <span class="no-print btn btn-danger" @click="hideDiv('ppp')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>
      <div class="rural mt-3">
        {{ rural }} {{ obsRural }}
        <span class="no-print btn btn-danger" @click="hideDiv('rural')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>
      <div class="dependentes mt-3" v-show="dependentes || obsDependentes">
        {{ dependentes }} {{ obsDependentes }}
        <span class="no-print btn btn-danger" @click="hideDiv('dependentes')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>
      <div class="bpc mt-3" v-show="bpc || obsBpc">
        {{ bpc }} {{ obsBpc }}
        <span class="no-print btn btn-danger" @click="hideDiv('bpc')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>
      <div class="obsGerais mt-3" v-show="obsGerais">
        Obs Gerais: {{ obsGerais }}
        <span class="no-print btn btn-danger" @click="hideDiv('obsGerais')"
          ><font-awesome-icon icon="minus-circle" size="lg"
        /></span>
      </div>

      <div class="ts mt-3" v-show="tsAnos && tsMeses && tsDias">
        O tempo comprovado foi de {{ tsAnos }} anos, {{ tsMeses }} mes(es) e
        {{ tsDias }} dia(s).
      </div>

      <div class="carencia mt-3" v-show="tsCarencia">
        A carência comprovada foi de {{ tsCarencia }} contribuição(ões).
      </div>
      <div class="conclusao">
        <p v-if="especie == 99">
          Considerando o exposto o requerimento da certidão de tempo de
          contribuição foi
          {{ conclusao.decisao }}.
        </p>
        <p v-if="especie != 99">
          Considerando o exposto o benefício foi {{ conclusao.decisao }}
        </p>
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
    </div>

    <div class="back-to-edit mb-2 no-print">
      <router-link to="/">
        <button
          v-b-tooltip.right.hover
          title="Voltar para edição."
          class="btn btn-sm"
        >
          <span class="span-edit fa-3x">
            <font-awesome-icon icon="arrow-left" size="lg" />
          </span>
        </button>
      </router-link>

      <div @click="print" class="print fa-3x">
        <font-awesome-icon icon="print" size="lg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faPrint,
  faMinusCircle,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faArrowLeft, faPrint, faMinusCircle, faArrowDown);

export default {
  name: "EditingComponent",
  data() {
    return {
      divsHided: [],
    };
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
    hideDiv(divClassName) {
      document
        .querySelector("." + divClassName)
        .setAttribute("style", "display:none");
      this.divsHided.push(divClassName);
    },
    showDiv(divClassName, i) {
      document
        .querySelector("." + divClassName)
        .setAttribute("style", "display:block");
      this.divsHided.splice(i, 1);
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
  font-size: 18px;
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
  /* padding-left: 30px; */
  /* width: 65px;
  height: 65px; */
}
h5 {
  text-align: justify;
}

.divs-hided {
  /* display: flex;
  flex-flow: column; */
  position: absolute;
  top: 15px;
  right: 15px;
  width: auto;
  height: auto;
  z-index: 1;
  background-color: floralwhite;
  padding: 1.5em;

  border: 1px solid black;
  border-radius: 6px;
}
.divs-hided > p {
  color: #fff;
  font-weight: bold;
  padding: 0.8em;
}
</style>