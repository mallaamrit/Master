<template>
  <div class="flex">
    <label class="text-sm text-gray-700 flex">
      <input
        :id="id"
        v-bind="$attrs"
        type="checkbox"
        :value="modelValue"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="h-5 w-5 text-blue-primary border-gray-300 rounded-md cursor-pointer ring-violet-300 ring-offset-2 ring-offset-slate-50 focus:outline-none focus:ring-2"
      />
      <span class="ml-2" :class="labelCss">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    modelValue: {
      required: true,
    },
    label: {
      required: false,
    },
    id: {
      required: false,
    },
    labelCss: {
      type: String,
      required: false,
    },
    excIcon: {
      type: Boolean,
      required: false,
    },
    tooltipLabel: {
      required: false,
    },
  },

  emits: ["update:modelValue"],
};
</script>
