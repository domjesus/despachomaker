<template>
  <div class="div-itens mb-5">
    <ul>
      <li v-for="(item, i) in itens" :key="i" :value="item.value">
        <input
          type="radio"
          :checked="item.checked"
          :value="checkItem(item)"
          :name="name"
          @click="setValue($event.target, item)"
        />
        {{ item.text }}
        <details-and-ocorrences :name="item.detail_name" v-if="item.detail" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DetailsAndOcorrences from "./DetailsAndOcorrences";

export default {
  name: "ItensDespachoComponent",
  computed: {},
  props: {
    itens: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dispatch: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "changeVinculos",
      "changeRecolhimentos",
      "changePPP",
      "changeDependentes",
      "changeBpc",
    ]),

    checkItem(item) {
      if (item.checked) {
        this.$store.dispatch(this.dispatch, item.value);

        return item.value;
      }

      return item.value;
    },

    setValue(target) {
      // console.log(target);
      // const alvo = target.name;

      this.$store.dispatch(this.dispatch, target.value);
    },
  },
  components: {
    DetailsAndOcorrences,
  },
};
</script>

<style scoped>
.div-itens {
  text-align: left;
}
</style>