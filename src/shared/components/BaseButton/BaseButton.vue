<script>
import { computed } from "vue";
import settings from "../settings";

export default {
  name: "BaseButton",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: false,
      default: "button",
      validator: (propValue) => ["button", "submit"].includes(propValue),
    },
    color: {
      type: String,
      required: false,
      default: "primary",
      validator: (propValue) =>
        ["primary", "light", "gradient"].includes(propValue),
    },
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: (propValue) =>
        ["small", "medium", "large"].includes(propValue),
    },
    fab: Boolean,
  },

  setup(props) {
    const computedButtonClasses = computed(() => {
      const data = [
        settings.baseButton.theme.default.main,
        [settings.baseButton.theme.default.variant[props.color]],
        [settings.baseButton.theme.default.size[props.size]],
        {
          [settings.baseButton.theme.default.types.fab]: props.fab,
          [settings.baseButton.theme.default.fabSize[props.size]]:
            props.fab && props.size,
        },
      ];

      return data;
    });

    return { computedButtonClasses };
  },
};
</script>

<template>
  <button :type="type" :class="computedButtonClasses" v-bind="$attrs">
    <span class="flex justify-center items-center">
      <slot />
    </span>
  </button>
</template>
