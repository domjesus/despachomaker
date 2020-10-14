<template>
  <div class="">
    <div class="row">
      <div class="col col-md-2">
        <b-input-group
          size="md"
          prepend="Esp."
          v-b-tooltip.top.hover
          title="Espécie Número"
        >
          <b-form-input
            name="especie"
            id="especie"
            :value="especie"
            @keyup="workInEspecie($event.target.value)"
            v-mask="'##'"
            placeholder="Especie nº"
          ></b-form-input>
        </b-input-group>
      </div>

      <div class="col col-md-6">
        <b-form-input
          readonly
          v-b-tooltip.top.hover
          title="Espécie extenso"
          name="esp_extenso"
          id="esp_extenso"
          class="form-control"
          :value="especieExtenso"
        ></b-form-input>
      </div>
      <!-- end col -->
    </div>

    <div class="row mt-3">
      <div class="col col-md-4">
        <b-input-group size="md" prepend="NB">
          <b-form-input
            name="numeroBeneficio"
            :class="[
              { 'border border-success alert alert-success': nbIsValid },
              'border border-danger',
            ]"
            id="numeroBeneficio"
            :value="numeroBeneficio"
            @keyup="vldNb($event.target.value)"
            v-mask="'###.###.###-#'"
            placeholder="000.000.000-0"
          ></b-form-input>
        </b-input-group>
        <ToastFactory
          :message="messageToast"
          :title="titleToast"
          :variant="variantToast"
          v-if="showToast"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col col-md-8">
        <b-input-group size="md" prepend="Nome:">
          <b-form-input
            name="nome"
            id="nome"
            :value="nomeSegurado"
            @keyup="changeNome($event.target.value)"
          ></b-form-input>
        </b-input-group>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col col-md-3">
        <b-input-group prepend="Anos" class="mb-2">
          <b-form-input
            aria-label="anos"
            name="ts_anos"
            id="ts_anos"
            :value="ts_anos"
            @keyup="changeAnos($event.target.value)"
            v-mask="'##'"
          ></b-form-input>
        </b-input-group>
      </div>

      <div class="col col-md-3">
        <b-input-group prepend="Meses" class="mb-2">
          <b-form-input
            aria-label="meses"
            name="ts_meses"
            id="ts_meses"
            :value="ts_meses"
            @keyup="changeMeses($event.target.value)"
            v-mask="'##'"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col col-md-3">
        <b-input-group prepend="Dias" class="mb-2">
          <b-form-input
            aria-label="dias"
            name="ts_dias"
            id="ts_dias"
            :value="ts_dias"
            @keyup="changeDias($event.target.value)"
            v-mask="'##'"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="col col-md-3">
        <b-input-group prepend="Carência" class="mb-2">
          <b-form-input
            aria-label="carencia"
            name="carencia"
            id="carencia"
            :value="ts_carencia"
            @keyup="changeCarencia($event.target.value)"
            v-mask="'##'"
          ></b-form-input>
        </b-input-group>
      </div>

      <b-input-group>
        <b-input-group prepend="Decisão" class="mb-5 col-md-4">
          <b-form-select
            v-model="decisao"
            :options="optionsSelect"
            @change="showFormDecisao"
            sm="lg"
          ></b-form-select>
        </b-input-group>
      </b-input-group>
    </div>

    <b-modal
      id="modal-fundamentacoes"
      ref="modal-fundamentacoes"
      title="Fundamentações"
      size="xl"
      hide-footer
    >
      <div id="fundamentacoes" class="fundamentacoes">
        <div v-for="(fund, i) in fundamentacoes" :key="i">
          <div class="fundamenta-container">
            <input
              type="radio"
              :value="fund.descricao"
              :title="fund.fundamentacao"
              name="fundamentacao"
              @change="setaFundamentacao"
              class="radio-fundamenta"
            /><span class="span-fundamenta">{{ fund.descricao }}</span>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- end row -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { doFetch } from "./../../utils/FetchFactory.js";
import { dev } from "./../../auxiliarInterno.js";
import { mask } from "vue-the-mask";
import { validaNb } from "./../../utils/validaNb.js";
import ToastFactory from "./utils/ToastFactory.vue";

export default {
  data() {
    return {
      decisao: null,
      optionsSelect: [
        { value: null, text: "Selecione uma decisão" },
        { value: "CONC", text: "Concessão" },
        { value: "INDEF", text: "Indeferimento" },
      ],
      fundamentacoes: "",
      conclusao: {
        descricao: "",
        norma: "",
        decisao: "",
      },
      nbIsValid: false,
      showToast: false,
      messageToast: "",
      titleToast: "",
      variantToast: "",
    };
  },
  computed: {
    ...mapGetters({
      nomeSegurado: "getNome",
      numeroBeneficio: "getNb",
      especie: "getEspecie",
      especieExtenso: "getEspecieExtenso",
      ts_anos: "getAnos",
      ts_meses: "getMeses",
      ts_dias: "getDias",
      ts_carencia: "getCarencia",
    }),
  },
  methods: {
    ...mapActions([
      "changeNome",
      "changeNb",
      "changeEspecieExtenso",
      "changeEspecie",
      "changeAnos",
      "changeMeses",
      "changeDias",
      "changeCarencia",
    ]),
    vldNb(value) {
      if (value.length == 13) {
        this.nbIsValid = validaNb(value);

        if (this.nbIsValid) {
          this.$store.dispatch("changeNb", value);

          document.querySelector("#numeroBeneficio").removeAttribute("class");
          document
            .querySelector("#numeroBeneficio")
            .setAttribute("class", "border border-success");
        } else {
          (this.titleToast = "NB inválido!"),
            (this.messageToast =
              "Você informou um número de benefício incorreto/inválido!"),
            (this.variantToast = "danger");

          this.showToast = true;

          setTimeout(() => {
            this.showToast = false;
          }, 5000);
        }
      }
    },
    setaFundamentacao(e) {
      // console.log(this.fundamentacao);

      this.conclusao.descricao = e.target.value;
      this.conclusao.norma = e.target.title;

      this.$store.dispatch("changeConclusao", this.conclusao);
      this.$refs["modal-fundamentacoes"].hide();
    },
    showFormDecisao() {
      if (this.decisao) {
        const bodyData = new FormData();

        bodyData.append("flag", "povoa_despacho_new");
        bodyData.append("fund_tipo", this.decisao);

        this.conclusao.decisao =
          this.decisao == "CONC" ? "CONCEDIDO" : "INDEFERIDO";

        this.$store.dispatch("changeConclusao", this.conclusao);
        this.$emit("fetchingfundamentacao");

        const url = dev
          ? "http://localhost/teletrabalho/ajax/manter_fundamentacao.php"
          : "/ajax/manter_fundamentacao.php";

        const resp = doFetch(url, "POST", bodyData);

        resp.then((r) => {
          this.$refs["modal-fundamentacoes"].show();
          // console.log(r.data);
          this.fundamentacoes = r.data;
          this.$emit("fetchedfundamentacao");
        });
      }
    },
    workInEspecie(value) {
      this.$store.dispatch("changeEspecie", value); //set new value of especie

      // console.log("recovering especie");
      this.$store.dispatch("changeEspecieExtenso", "Aguarde...");

      const bodyData = new FormData();
      bodyData.append("flag", "recupera_especie");
      bodyData.append("especie_nr", value);

      const url = dev
        ? "http://localhost/teletrabalho/ajax/manter_fundamentacao.php"
        : "/ajax/manter_fundamentacao.php";

      if (value.length == 2) {
        const esp_extenso = doFetch(url, "POST", bodyData);

        esp_extenso
          .then((e) => {
            // console.log(e.data);
            this.$store.dispatch("changeEspecieExtenso", e.data);
          })
          .catch((err) => {
            alert(err);
            this.$store.dispatch("changeEspecieExtenso", "");
          });
      }
    },
  },
  directives: {
    mask,
  },
  components: {
    ToastFactory,
  },
};
</script>

<style scoped>
#esp_extenso {
  cursor: not-allowed;
}

.radio-fundamenta {
  width: 2em;
  height: 2em;
  margin-top: 15px;
  padding-top: 10px;
}

.span-fundamenta {
  /* padding-top: 10px; */
  margin-top: 15px;
  /* background-color: aquamarine; */
  padding-left: 15px;
  font-size: 18px;
  font-weight: bold;
}

.fundamenta-container {
  display: flex;
  flex-flow: row;
  border: 1px solid black;
  border-radius: 6px;
  vertical-align: center;
  padding: 10px;
}

.fundamentacoes {
  vertical-align: center;
}
</style>