<template>
  <div class="w-full">
    <div class="w-full">
      <Disclosure :default-open="active" v-slot="{ open }">
        <DisclosureButton
          class="flex justify-between w-full text-left rounded-mg bg-white-light px-7 py-6"
        >
          <slot name="title">
            <span class="text-lg font-medium">{{ title }}</span>
          </slot>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-black-dark"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-7">
          <slot></slot>
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
  },
};
</script>
