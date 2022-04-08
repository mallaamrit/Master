<template>
  <button
    :type="type"
    :class="['border-2 px-8 py-2.5 rounded-md', classes]"
    v-bind="$attrs"
  >
    <span class="flex justify-center items-center">
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
      required: false,
      default: "button",
    },
    color: {
      type: String,
      required: false,
      default: "primary",
    },
    size: {
      type: String,
      required: false,
      default: "medium",
    },
    fab: Boolean,
  },
  setup(props) {
    const classes = computed(() => ({
      "border-blue-highlight bg-blue-highlight text-white":
        props.color === "primary",

      "border-blue-highlight bg-white text-blue-highlight":
        props.color === "light",
    }));

    return { classes };
  },
};
</script>
