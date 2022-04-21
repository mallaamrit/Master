<template>
  <div>
    <label
      :class="{ hidden: !label && !$slots.label }"
      class="block text-sm font-semibold mb-1"
      :for="uniqueNameIdentifier"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <div
      class="flex items-center bg-white border-2 rounded-md overflow-hidden py-3 px-2"
      :class="computeClasses"
    >
      <slot name="icon">
        <BaseIcon v-if="icon" name="dollar-sign"></BaseIcon>
      </slot>
      <input
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        autocomplete="off"
        class="w-full bg-white focus:outline-none leading-none"
        @input="onInputEvent"
        @keydown="onKeydown"
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
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const uniqueNameIdentifier = computed(() => props.name.replace(/\s/g, ""));

    const computeClasses = computed(() => [
      { "base-input-success": props.success },
      { "base-input-error": props.error },
      { "base-input-normal": !props.success && !props.error },
      // { "pointer-events-none": props.disabled },
    ]);

    function onInputEvent($event) {
      context.emit("update:modelValue", $event.target.value);
    }

    function onKeydown($event) {
      if (props.disabled) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }

    return { uniqueNameIdentifier, computeClasses, onInputEvent, onKeydown };
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
