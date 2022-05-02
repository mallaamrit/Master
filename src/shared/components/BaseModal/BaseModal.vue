<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot :show="open">
    <Dialog
      :initial-focus="getActiveElement()"
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="$emit('close')"
    >
      <div
        class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-[#696D72] bg-opacity-75 transition-opacity"
            :class="overlayCss"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 w-3/12 lg:w-[555px]"
            :class="{ modalCss }"
          >
            <div>
              <div class="flex sm:mt-1">
                <DialogTitle
                  as="h3"
                  class="flex-1 text-lg leading-6 font-medium text-blue-primary"
                >
                  <slot name="title">{{ title }}</slot>
                </DialogTitle>
                <XIcon
                  @click="$emit('close')"
                  class="h-6 w-6 bg-[#9EB3CC] text-white rounded-xl p-0.5 cursor-pointer"
                  aria-hidden="true"
                />
              </div>
              <slot></slot>
            </div>
            <div class="mt-5 sm:mt-6">
              <slot name="bottom" />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
// import { ref } from "vue";
import { XIcon } from "@heroicons/vue/outline";

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },

  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    modalCss: {
      type: String,
      default: "",
    },
    overlayCss: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  setup() {
    function getActiveElement() {
      return document.activeElement;
    }

    return { getActiveElement };
  },
};
</script>
