<template>
  <IconBase data-download-campaign type="button" :disabled="disabled">
    <IconTrash />
  </IconBase>
</template>

<script setup>
import { ref } from "vue";

const disabled = ref(false);
setTimeout(() => {
  console.log("called");
  disabled.value = true;
}, 3000);
</script>
