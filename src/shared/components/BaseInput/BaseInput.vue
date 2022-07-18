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
      <span v-if="$slots.contentRight" class="mr-2">
        <slot name="contentRight"></slot>
      </span>
      <input
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        autocomplete="off"
        class="w-full text-sm bg-white focus:outline-none leading-6"
        @input="onInputEvent"
        @keypress="onKeydown"
      />
      <span v-if="$slots.contentLeft" class="ml-2">
        <slot name="contentLeft"></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "BaseInput",
  inheritAttrs: false,
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
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "input-clear"],
  setup(props, context) {
    const uniqueNameIdentifier = computed(() => props.name.replace(/\s/g, ""));

    const computeClasses = computed(() => [
      { "input-success": props.success },
      { "input-error": props.error },
      { "input-normal": !props.success && !props.error },
      { "pointer-events-none select-none": props.disabled },
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
      context.emit("update:modelValue", "");
      context.emit("input-clear");
    }

    return {
      uniqueNameIdentifier,
      computeClasses,
      onInputEvent,
      onKeydown,
      onClear,
    };
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-success {
  @apply border-green-400;
}
.input-error {
  @apply border-error;
}
.input-normal {
  @apply border-blue-300;
}
</style>
