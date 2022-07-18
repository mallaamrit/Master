<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-block rounded-md border transition duration-100 ease-in-out active:outline active:outline-1 active:outline-blue-400 overflow-hidden text-sm font-semibold"
    :class="classes"
    @click="handleClickEvent"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
import { computed } from "vue";
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_SIZES } from "./types";

export default {
  name: "BaseButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "button",
      validator(value) {
        return BUTTON_TYPES.includes(value);
      },
    },
    color: {
      type: String,
      default: "primary",
      validator(value) {
        return BUTTON_COLORS.includes(value);
      },
    },
    size: {
      type: String,
      default: "normal",
      validator(value) {
        return BUTTON_SIZES.includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, context) {
    const classes = computed(() => ({
      [`button-${props.color}`]: !!props.color,
      [`button-${props.size}`]: !!props.size,
      [`pointer-events-none select-none`]: props.disabled,
    }));

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

<style scoped>
.button-primary {
  @apply bg-blue-500 border-blue-500 text-white;
}

.button-secondary {
  @apply bg-blue-400 border-blue-400 text-white;
}

.button-success {
  @apply bg-blue-300 border-blue-300 text-black;
}

.button-info {
  @apply bg-blue-200 border-blue-200 text-black;
}

.button-light {
  @apply bg-white border-blue-500 text-black;
}

.button-normal {
  @apply px-6 py-[13px];
}

.button-small {
  @apply px-4 py-[5px];
}

.button-large {
  @apply px-7 py-4;
}
</style>
