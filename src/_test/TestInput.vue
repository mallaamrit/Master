<script>
const INPUT_TYPES = [
  "text",
  "password",
  "email",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "color",
];

export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    inputValue: {
      type: [String, Number],
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
      validator(value) {
        return INPUT_TYPES.includes(value);
      },
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const onInput = ({ target: { value } }) => {
      ctx.emit("update:modelValue", value);
    };

    return { onInput };
  },
};
</script>

<template>
  <div>
    <div v-if="label !== '' || $slots.label" class="form_input_label">
      <slot name="label">{{ label }}</slot>
    </div>
    <input :type="type" :value="modelValue" @input="onInput" v-bind="$attrs" />
  </div>
</template>
