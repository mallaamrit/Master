<template>
  <div class="p-10">
    <h1>Component/Docs</h1>

    <h2>Button</h2>
    <BaseButton class="mr-5" color="primary" @click="onClick">
      Click Me!</BaseButton
    >
    <BaseButton color="light">Click Me!</BaseButton>

    <div class="my-10">
      <BaseInput
        disabled
        type="text"
        v-model="text"
        class="custom-input"
        :success="false"
      ></BaseInput>
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

    function onClick() {
      console.log(1);
    }

    return { text, onClick };
  },
};
</script>
