<template>
  <div class="has-tooltip">
    <slot />
    <!-- <div
      class=" text-black text-center py-0 mt-0 top-full right-0/4 -ml-2 absolute px-1 rounded-sm opacity-0 transition-opacity z-10"
    > -->
    <span
      class="tooltip border p-1 after:contents after:absolute after:-ml-1 after:bg-transparent text-xs bg-white"
      :class="textCss"
      >{{ text }}</span
    >
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    textCss: {
      type: String,
      default: "",
    },
  },
};
</script>
