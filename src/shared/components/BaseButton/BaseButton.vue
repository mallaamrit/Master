<template>
  <button :type="type" class="base-button" :class="classes" v-bind="$attrs">
    <span class="base-button_content">
      <slot />
    </span>
  </button>
</template>

<script>
import { computed } from "vue";

export default {
  name: "BaseButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "button",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    const classes = computed(() => ({
      "base-button_primary": props.color === "primary",
      "base-button_light": props.color === "light",
    }));

    return { classes };
  },
};
</script>
