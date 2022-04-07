<script>
import { ref } from "vue";
// import { TransitionRoot } from "@headlessui/vue";

export default {
  // components: { TransitionRoot },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isShowing = ref(props.show);

    return { isShowing };
  },
};
</script>

<template>
  <div
    class="notification-container fixed top-0 right-0 bottom-0 left-0 overflow-hidden z-50 pointer-events-none p-10 flex flex-col gap-5"
  ></div>
</template>
