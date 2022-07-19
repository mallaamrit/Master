<template>
  <div class="w-full">
    <div class="w-full">
      <Disclosure :default-open="active" v-slot="{ open, close }">
        <DisclosureButton
          class="flex justify-between items-center w-full text-left rounded-md bg-white px-6 h-[68px]"
          :class="accordianCss"
        >
          <slot name="title">
            <span class="text-2xl font-semibold leading-none">{{ title }}</span>
          </slot>
          <ChevronUpIcon :class="open ? 'transform rotate-180' : ''" class="w-5 h-5 text-black-dark" />
        </DisclosureButton>
        <DisclosurePanel>
          <slot :close="close"></slot>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";

export default {
  name: "BaseAccordian",
  components: { Disclosure, DisclosureButton, DisclosurePanel, ChevronUpIcon },
  props: {
    title: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    accordianCss: {
      type: String,
      default: "",
    },
  },
};
</script>
