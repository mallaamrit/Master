<template>
  <div>
    <label
      :class="{ hidden: !label && !$slots.label }"
      class="block font-semibold mb-1 text-sm"
      :for="uniqueNameIdentifier"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <div
      class="flex items-center border border-blue-normal rounded-md overflow-hidden py-3 px-2 bg-white"
      :class="[{ '!border-green-primary': success }, { '!border-red-500': error }]"
    >
      <slot name="icon">
        <BaseIcon v-if="icon" name="dollar-sign"></BaseIcon>
      </slot>
      <textarea
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        autocomplete="off"
        class="w-full focus:outline-none text-sm pl-2"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      ></textarea>
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
textarea {
  resize: none;
}
</style>
