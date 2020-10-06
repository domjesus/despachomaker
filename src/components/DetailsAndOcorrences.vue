<template>
  <div>
    <div v-if="name == 'vinculos_nao_aceitos'">
      <input type="text" :name="name" class="form-control" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsAndOcorrences",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>