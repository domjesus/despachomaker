<template>
  <div class="main mb-3">
    <p class="bg-info">
      Digite abaixo observações para '{{ name.split("_")[1].toUpperCase() }}'
    </p>
    <br />
    <textarea
      :name="name"
      :id="name"
      cols="100"
      rows="5"
      @keyup="setValue($event.target)"
    ></textarea>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TextAreaObservacoes",
  props: {
    name: {
      type: String,
      required: true,
    },
    dispatch: {
      type: String,
      required: true,
    },
  },
  computed: {},
  methods: {
    // ...mapActions(["changeObservacoes"]),
    setValue(target) {
      this.$store.dispatch(this.dispatch, target.value);
    },
  },
};
</script>

<style scoped>
.main {
  display: block;
  justify-content: left;
  text-align: left;
}
textarea {
  border-radius: 6px;
  width: 100%;
}
p {
  font-weight: bold;
  width: fit-content;
  margin: 15px;
  padding: 10px;
  border-radius: 10px;
}
</style>>
