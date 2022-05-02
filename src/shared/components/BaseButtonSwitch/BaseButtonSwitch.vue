<template>
  <div>
    <label
      :class="{ hidden: !label && !$slots.label }"
      class="block font-semibold mb-1 text-sm"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>

    <div class="flex text-sm font-semibold">
      <div
        v-for="(option, index) in options"
        :key="option.id"
        class="px-4 text-center items-center w-1/2"
        :class="[getComputedClass(index, option.id), getDefaultClass(index)]"
        @click="$emit('update:modelValue', option.id)"
        @keydown="$emit('update:modelValue', option.id)"
      >
        <label class="block leading-[42px]">
          <input type="radio" hidden :name="uniqueNameIdentifier" />
          {{ option.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    uid: {
      type: String,
      default: "id",
    },
    optionText: {
      type: String,
      default: "name",
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const uniqueNameIdentifier = computed(() => props.label.replace(/\s/g, ""));

    function getComputedClass(index, data) {
      if (index === 0) {
        if (data === props.modelValue) {
          return "border border-[#16a1eb] bg-[#dcf1fc] rounded-tl-md rounded-bl-md";
        }
        return "border border-green-primary rounded-tl-md rounded-bl-md border-r-0";
      }

      if (data === props.modelValue) {
        return "border border-[#16a1eb] bg-[#dcf1fc] rounded-tr-md rounded-br-md";
      }
      return "border border-green-primary rounded-tr-md rounded-br-md border-l-0";
    }

    function getDefaultClass(index) {
      if (props.modelValue === "" && index === 0) {
        return "";
      }
      return "";
    }

    return { uniqueNameIdentifier, getComputedClass, getDefaultClass };
  },
};
</script>
