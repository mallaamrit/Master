<template>
  <span class="block" v-html="svgIcon" v-bind="$attrs"></span>
</template>

<script>
import { computed } from "vue";
import feather from "feather-icons";

export default {
  name: "BaseIcon",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const svgIcon = computed(() =>
      feather.icons[props.name].toSvg({
        width: 14,
        height: 14,
      })
    );

    const iconClasses = computed(() => ({}));

    return { svgIcon, iconClasses };
  },
};
</script>
