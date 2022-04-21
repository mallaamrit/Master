<template>
  <div class="p-10">
    <h1>Component/Docs</h1>

    <h2>Button</h2>
    <BaseButton>Click Me!</BaseButton>
    <BaseButton color="light" class="ml-4">Click Me!</BaseButton>
    <BaseButton color="dark" class="ml-4">Click Me!</BaseButton>

    <div class="my-10">
      <BaseInput type="text" v-model="text" class="custom-input" />
      {{ text }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import BaseButton from "@/shared/components/BaseButton/BaseButton.vue";

export default {
  components: { BaseButton },
  setup() {
    const text = ref("");

    return { text };
  },
};
</script>

<style lang="scss" scoped></style>
