<template>
  <div></div>
</template>

<script>
export default {
  name: "ToastFactory",
  props: {
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: "success",
    },
  },
  created() {
    this.$bvToast.toast(this.message, {
      title: this.title,
      variant: this.variant,
      solid: true,
      autoHideDelay: 5000,
      appendToast: true,
    });
  },
};
</script>
