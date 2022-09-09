<template>
  <div class="b-input" :class="attrs.class">
    {{ attrs }}
    <label :class="{ hidden: !label && !$slots.label }" class="block text-sm font-semibold mb-1" :for="getId">
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <div
      class="b-input-control flex items-center bg-white border rounded-md overflow-hidden px-3 py-2"
      :class="[computeClasses]"
    >
      <span v-if="$slots.prepend" class="b-input-prepend" @click="prependClicked" @keypress="() => {}">
        <slot name="prepend"></slot>
      </span>
      <input
        :id="getId"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full text-sm bg-white focus:outline-none leading-6"
        @input="onInputEvent"
        @keypress="onKeydown"
        @click="inputClicked"
        @blur="inputBlured"
      />
      <span v-if="$slots.append" class="b-input-append" @click="appendClicked" @keypress="() => {}">
        <slot name="append"></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, useAttrs } from "vue";

export default {
  name: "BaseInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    id: {
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
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "off",
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
  emits: ["update:modelValue", "click", "click:append", "click:prepend", "blur"],
  setup(props, ctx) {
    const attrs = useAttrs();

    const getId = computed(() => {
      if (props.id) {
        return props.id;
      }
      return `input-${Math.floor(Math.random() * 1000)}`;
    });

    const computeClasses = computed(() => [
      { "input-success": props.success },
      { "input-error": props.error },
      { "input-normal": !props.success && !props.error },
      { "input-disabled pointer-events-none select-none": props.disabled },
    ]);

    function onInputEvent($event) {
      ctx.emit("update:modelValue", $event.target.value);
    }

    function onKeydown($event) {
      if (props.disabled) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    }

    function inputClicked() {
      ctx.emit("click");
    }

    function inputBlured() {
      ctx.emit("blur");
    }

    function appendClicked() {
      ctx.emit("click:append");
    }

    function prependClicked() {
      ctx.emit("click:prepend");
    }

    return {
      attrs,
      getId,
      computeClasses,
      onInputEvent,
      onKeydown,
      inputBlured,
      inputClicked,
      appendClicked,
      prependClicked,
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
