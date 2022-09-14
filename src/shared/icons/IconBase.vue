<template>
  <div class="inline-flex rounded-md px-2 py-2 text-gray-600" :class="classes">
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
  },
  setup(props) {
    // const classes = ref("");

    // const configureCss = () => {
    //   if (props.disabled) {
    //     classes.value = "bg-red-600";
    //   }
    // };

    // watch(
    //   () => props.disabled,
    //   () => {
    //     configureCss();
    //   }
    // );

    const classes = computed(() => {
      if (props.disabled) {
        return "bg-red-600";
      }
      return "bg-[#e5e5e5]";
    });

    // const componentData = {
    //   // style: `width: ${props.width}px; height: ${props.width}px;`,
    //   // class: [
    //   //   "inline-flex rounded-md bg-[#e5e5e5] px-2 py-2 text-gray-600",
    //   //   {
    //   //     "hover:bg-[#F8FAFC]": props.type === "button",
    //   //   },
    //   // ],
    //   class: classes.value,
    // };

    return {
      classes,
    };
  },
};
</script>
