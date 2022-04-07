<template>
  <div>
    <label
      :class="{ hidden: !label }"
      class="block font-medium mb-1"
      :for="uniqueNameIdentifier"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <div
      class="flex items-center border-2 border-green-primary rounded-md overflow-hidden py-3 px-2"
      :class="[
        { '!border-blue-primary': success },
        { '!border-red-500': error },
      ]"
    >
      <slot name="icon">
        <BaseIcon v-if="icon" name="dollar-sign"></BaseIcon>
      </slot>
      <input
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        autocomplete="off"
        class="w-full focus:outline-none"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import BaseIcon from "../BaseIcon/BaseIcon.vue";

export default {
  name: "BaseInput",
  inheritAttrs: false,
  components: { BaseIcon },
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    icon: {
      type: Boolean,
      required: false,
      default: false,
    },
    success: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const uniqueNameIdentifier = computed(() => props.name.replace(/\s/g, ""));

    return { uniqueNameIdentifier };
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
