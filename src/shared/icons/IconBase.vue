<template>
  <div :class="classes" v-bind="$attrs" @click="onClick" @keypress="() => {}">
    <slot />
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "IconBase",
  inheritAttrs: false,
  functional: true,
  props: {
    width: {
      type: [Number, String],
      default: 34,
    },
    type: {
      type: String,
      default: "icon",
      validator(val) {
        return ["button", "icon"].includes(val);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "normal",
    },
  },
  emits: ["click"],
  setup(props, ctx) {
    const classes = computed(() => [
      `inline-flex text-gray-600`,
      {
        // Button
        "cursor-pointer hover:bg-[#F8FAFC]": props.type === "button",

        // Size
        "w-8 h-8 px-2 py-2": props.size === "normal",
        "w-5 h-5 px-1 py-1": props.size === "small",

        // Disabled
        "bg-[#F8FAFC] cursor-not-allowed select-none": props.disabled,
        "bg-[#e5e5e5]": !props.disabled,

        // Border
        "rounded-full": props.rounded,
        "rounded-md": !props.rounded,
      },
    ]);

    const onClick = ($event) => {
      if (props.disabled) {
        $event.preventDefault();
        $event.stopPropagation();
        return;
      }
      ctx.emit("click", $event);
    };

    return {
      classes,
      onClick,
    };
  },
};
</script>
