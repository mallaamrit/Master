<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-block rounded-md border-2 border-blue-500 px-6 py-2.5 transition duration-100 ease-in-out active:outline active:outline-1 active:outline-blue-400 overflow-hidden text-sm"
    :class="classes"
    @click="handleClickEvent"
    v-bind="$attrs"
  >
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, context) {
    // Required non-static classes
    const classes = computed(() => ({
      [`base-button-${props.color}`]: !!props.color,
      "pointer-events-none": props.disabled,
    }));

    // event listeners
    function handleClickEvent(event) {
      if (props.disabled) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        context.emit("click");
      }
    }

    return { classes, handleClickEvent };
  },
};
</script>
