<template>
  <component :is="element">
    <slot />
  </component>
</template>

<script>
import { computed, h } from "vue";
import { RouterLink } from "vue-router";
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_SIZES } from "./types";

const BUTTON_CONFIG = {
  default:
    "inline-block text-center leading-6 align-middle	 rounded-md border transition duration-100 ease-in-out active:outline active:outline-1 active:outline-blue-400 overflow-hidden  font-semibold",
  color: {
    primary: "bg-blue-500 border-blue-500 text-white",
    secondary: "bg-blue-400 border-blue-400 text-white",
    success: "bg-blue-300 border-blue-300 text-black",
    info: "bg-blue-200 border-blue-200 text-black",
    light: "bg-white border-blue-500 text-black",
  },
  size: {
    small: "px-4 py-1 text-xs",
    normal: "px-6 py-2 text-sm",
    large: "px-7 py-4 text-lg",
  },
  disabled: "select-none pointer-events-none",
};

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
    href: {
      type: String,
      default: "",
    },
    to: {
      type: Object || String,
      default(val) {
        if (typeof val === "object") {
          return {};
        }
        return "";
      },
    },
  },
  emits: ["click"],
  setup(props, ctx) {
    const isDisabled = computed(() =>
      props.disabled ? BUTTON_CONFIG.disabled : ""
    );

    const classes = computed(() => [
      BUTTON_CONFIG.default,
      BUTTON_CONFIG.color[props.color],
      BUTTON_CONFIG.size[props.size],
      isDisabled.value,
    ]);

    function onClick(event) {
      if (props.disabled) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        ctx.emit("click", event);
      }
    }

    const events = {
      onClick,
    };

    const isButton = props.type.toLowerCase() !== "link";

    function configure() {
      const config = {
        class: classes.value,
      };
      if (props.disabled === false && props.to) {
        config.to = props.to;
      }
      return config;
    }

    const linkComponent = () =>
      props.disabled === false
        ? h(RouterLink, { ...configure() }, ctx.slots.default)
        : h("a", { ...configure() }, ctx.slots.default);

    const buttonComponent = () =>
      h("button", { class: classes.value, ...events }, ctx.slots.default);

    // const componentData = {
    //   class: '',
    //   props: '',
    //   attrs: '',
    //   events: '',
    // }

    const element = isButton ? buttonComponent() : linkComponent();

    return { element };
  },
};
</script>
