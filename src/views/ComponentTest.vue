<template>
  <BaseButton type="link" :to="{ name: 'home' }">LINK!</BaseButton>
  <BaseButton size="small" @click="onClick">BUTTON!</BaseButton>
</template>

<script setup>
import { ref } from "vue";

function onClick() {
  console.log(1);
}

const disabled = ref(false);
setTimeout(() => {
  disabled.value = true;
}, 3000);
</script>
