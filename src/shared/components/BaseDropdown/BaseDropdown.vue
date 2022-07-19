<template>
  <div class="relative">
    <div data-cy="base-dropdown" @click="toggleDropdown" @keydown="toggleDropdown">
      <slot name="selector">
        <span>{{ label }}</span>
      </slot>
    </div>
    <div v-if="open" data-cy="base-dropdown-content" class="absolute">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BaseDropdown",
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  setup() {
    const open = ref(false);

    function toggleDropdown() {
      open.value = !open.value;
    }

    return { open, toggleDropdown };
  },
};
</script>

<style lang="scss" scoped></style>
