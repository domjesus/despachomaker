<template>
  <div
    class="content-buttons"
    v-b-tooltip.botton
    title="Clique para adicionar o texto às observações!"
  >
    <div v-for="(button, i) in buttons" :key="i" class="div-button">
      <button
        class="btn btn-primary btn-md"
        :title="button.value"
        @click="povoaText($event.target.title)"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuxButtons",
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
  methods: {
    povoaText(text) {
      const obs_gerais = document.querySelector("#obs_gerais");

      const txt_obs_gerais = obs_gerais.value;
      obs_gerais.value = txt_obs_gerais + text;
      this.$store.dispatch("changeObsGerais", obs_gerais.value);
    },
  },
};
</script>

<style scoped>
.content-buttons {
  display: flex;
  flex-flow: row;
}
.div-button {
  padding: 30px;
  min-width: 90px;
  /* width: 80px; */
}
button {
  width: 100px;
}
</style>