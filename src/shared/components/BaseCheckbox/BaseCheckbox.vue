<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      value=""
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    labelCss: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>
