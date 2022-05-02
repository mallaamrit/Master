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
      class="flex items-center bg-white border rounded-md overflow-hidden px-3 py-2"
      :class="computeClasses"
    >
      <slot name="icon">
        <span class="mx-2">
          <BaseIcon v-if="icon" :name="icon"></BaseIcon>
        </span>
      </slot>
      <input
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        autocomplete="off"
        class="w-full text-sm bg-white focus:outline-none leading-6"
        @input="onInputEvent"
        @keydown="onKeydown"
        v-bind="$attrs"
      />
      <slot name="clearable">
        <span v-if="clearable" class="max-w-[100px]">
          <BaseIcon name="x-circle" @click="onClear"></BaseIcon>
        </span>
      </slot>
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
      type: String,
      default: "",
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
    clearable: {
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
      { "pointer-events-none": props.disabled },
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

    function onClear() {
      context.emit("update:modelValue", " ");
    }

    return { uniqueNameIdentifier, computeClasses, onInputEvent, onKeydown, onClear };
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
