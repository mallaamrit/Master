<template>
  <div class="flex items-center">
    <input
      id="default-checkbox"
      type="checkbox"
      :checked="isChecked()"
      :value="value"
      :disabled="disabled"
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
      @change="onChange"
    />
    <label
      for="default-checkbox"
      class="ml-2 text-sm font-medium text-gray-900"
      :class="{ ' text-gray-400': disabled, labelCss }"
      @click="labelEvent"
      @keypress="() => {}"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { looseIndexOf } from "@/shared/utils";

export default {
  name: "BaseCheckbox",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Array, Boolean],
      required: false,
      default(val) {
        if (Array.isArray(val)) {
          return [];
        }
        return false;
      },
    },
    value: {
      type: [String, Number, Boolean],
      required: false,
      default(val) {
        if (val.value === undefined || Array.isArray(val.modelValue)) {
          return "";
        }
        return false;
      },
    },
    label: {
      required: false,
      default: "",
      validator: () => true,
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const isChecked = () => {
      if (Array.isArray(props.modelValue)) {
        return looseIndexOf(props.modelValue, props.value) > -1;
      }
      return props.modelValue;
    };

    const onChange = ({ target: { checked, value } }) => {
      if (props.disabled) return;
      let localChecked = props.modelValue;
      if (Array.isArray(props.modelValue)) {
        const index = looseIndexOf(props.modelValue, props.value);
        if (checked && index < 0) {
          localChecked = localChecked.concat(value);
        } else if (!checked && index > -1) {
          localChecked = localChecked
            .slice(0, index)
            .concat(localChecked.slice(index + 1));
        }
      } else {
        localChecked = !!checked;
      }

      // Fire events in a `$nextTick()` to ensure the `v-model` is updated
      nextTick(() => {
        ctx.emit("update:modelValue", localChecked);
      });
    };

    const labelEvent = (e) => {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return {
      labelEvent,
      isChecked,
      onChange,
    };
  },
};
</script>
