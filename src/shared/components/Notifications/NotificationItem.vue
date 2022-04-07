<script>
/* eslint-disable */
import { onMounted, ref, getCurrentInstance } from "vue";
// import { TransitionRoot } from "@headlessui/vue";
import settings from "../settings";

export default {
  // components: { TransitionRoot },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    parentNode: {
      type: Object,
      default: null,
    },
    selfNode: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const isShowing = ref(props.show);

    // onMounted(() => {
    //   setTimeout(() => {
    //     dismiss();
    //   }, 2000);
    // });

    function dismiss() {
      props.parentNode.removeChild(props.selfNode);
    }

    return { isShowing, settings, dismiss };
  },
};
</script>

<template>
  <div
    class="self-end block w-64 border-1 border-blue-primary px-4 py-2 bg-blue-primary text-white pointer-events-auto cursor-pointer"
    @click="dismiss"
  >
    i am children
  </div>
</template>
