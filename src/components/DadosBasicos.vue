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
        <b-input-group size="md" prepend="NB" title="Número de Benefício">
          <b-form-input
            name="numeroBeneficio"
            id="numeroBeneficio"
            :value="numeroBeneficio"
            @keyup="changeNb($event.target.value)"
          ></b-form-input>
        </b-input-group>
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
      size="lg"
      hide-footer
    >
      <div id="fundamentacoes" style="text-align: left">
        <div v-for="(fund, i) in fundamentacoes" :key="i">
          <input
            type="radio"
            :value="fund.descricao"
            :title="fund.fundamentacao"
            name="fundamentacao"
            @change="setaFundamentacao"
          />{{ fund.descricao }}
        </div>
      </div>
    </b-modal>

    <!-- end row -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { doFetch } from "./../../utils/FetchFactory";

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
      fundamentacao: {
        descricao: "",
        norma: "",
        decisao: "",
      },
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
    setaFundamentacao(e) {
      // console.log(this.fundamentacao);

      this.fundamentacao.descricao = e.target.value;
      this.fundamentacao.norma = e.target.title;

      this.$store.dispatch("changeConclusao", this.fundamentacao);
      this.$refs["modal-fundamentacoes"].hide();
    },
    showFormDecisao() {
      if (this.decisao) {
        const bodyData = new FormData();

        bodyData.append("flag", "povoa_despacho_new");
        bodyData.append("fund_tipo", this.decisao);

        this.fundamentacao.decisao =
          this.decisao == "CONC" ? "CONCEDIDO" : "INDEFERIDO";

        this.$store.dispatch("changeConclusao", this.conclusao);

        const url =
          "http://localhost/teletrabalho/ajax/manter_fundamentacao.php";

        this.$refs["modal-fundamentacoes"].show();

        const resp = doFetch(url, "POST", bodyData);

        resp.then((r) => {
          // console.log(r.data);
          this.fundamentacoes = r.data;
        });
      }
    },
    workInEspecie(value) {
      this.$store.dispatch("changeEspecie", value); //set new value of especie

      // console.log("recovering especie");

      const bodyData = new FormData();
      bodyData.append("flag", "recupera_especie");
      bodyData.append("especie_nr", value);

      const options = {
        url: "http://localhost/teletrabalho/ajax/manter_fundamentacao.php",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: bodyData,
      };

      if (value.length == 2) {
        const esp_extenso = axios(options);

        esp_extenso.then((e) => {
          // console.log(e.data);
          this.$store.dispatch("changeEspecieExtenso", e.data);
        });
      }
    },
  },
};
</script>

<style scoped>
#esp_extenso {
  cursor: not-allowed;
}

input[type="radio"] {
  border: 1px;
  width: 2em;
  height: 2em;
}
</style>