<template>
  <div class="flex">
    <label for="a" class="text-sm text-gray-700 flex">
      <input
        :id="id"
        v-bind="$attrs"
        type="checkbox"
        :value="value"
        :checked="value"
        @change="$emit('update:value', $event.target.checked)"
        class="focus:ring-blue-primary h-5 w-5 text-blue-primary border-gray-300 rounded cursor-pointer"
      />
      <span class="ml-2" :class="labelCss">
        {{ label }}
      </span>

      <base-tooltip
        v-if="excIcon"
        :text="tooltipLabel"
        text-css="inline-block w-96 text-left p-2 text-white bg-gray-600"
      >
        <svg
          v-if="excIcon"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </base-tooltip>
    </label>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    value: {
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

  emits: ["update:value"],
};
</script>
