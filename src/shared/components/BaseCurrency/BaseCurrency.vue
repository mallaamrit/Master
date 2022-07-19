<template>
  <div class="w-full">
    <label
      :class="{ hidden: !label && !$slots.label }"
      class="block font-semibold mb-1 text-sm"
      :for="uniqueNameIdentifier"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <div
      class="flex items-center rounded-md overflow-hidden h-[42px] border border-blue-normal bg-white"
      :class="{
        'base-input-error': error,
        'base-input-success': success,
        'base-input-normal': !success && !error,
      }"
      @click="setFocus"
      @keydown="setFocus"
    >
      <!-- <span
        :class="{ hidden: !label && !$slots.label }"
        class="font-medium ml-[11px] mr-0 inline-block text-sm"
      >
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </span> -->
      <span v-if="!isFocused && convertedCurrency !== ''" class="block text-sm font-medium leading-none px-4 w-full">{{
        convertedCurrency
      }}</span>
      <span
        v-if="!isFocused && convertedCurrency === ''"
        class="block text-sm font-medium leading-none px-4 w-full text-[#b6a3af]"
        >{{ placeholder }}</span
      >
      <input
        v-if="isFocused"
        ref="baseCurrency"
        :id="uniqueNameIdentifier"
        :type="type"
        :value="modelValue"
        autocomplete="off"
        class="appearance-none w-full focus:outline-none px-4 leading-none text-sm"
        @keypress="onChange"
        @blur="convertCurrency($event.target.value)"
        @foucs="isFocused = true"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, watch } from "vue";

export default {
  name: "BaseCurrency",
  inheritAttrs: false,
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
    prefix: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const convertedCurrency = ref("");
    const baseCurrency = ref(null);
    const isFocused = ref(false);
    const uniqueNameIdentifier = computed(() => props.name.replace(/\s/g, ""));

    function onChange(event) {
      const keyCode = event.keyCode ? event.keyCode : event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault();
      }
    }

    function updateModelValue(data) {
      if (data === "") {
        context.emit("update:modelValue", "");
      } else {
        context.emit("update:modelValue", parseFloat(data).toFixed(2));
      }
    }

    function convertCurrency(data) {
      const dollarUSLocale = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      isFocused.value = false;
      if (data !== "") {
        convertedCurrency.value = dollarUSLocale.format(data);
      } else {
        convertedCurrency.value = "";
      }
      updateModelValue(data);
    }

    function setFocus() {
      isFocused.value = true;
      nextTick(() => {
        if (baseCurrency.value !== null) {
          baseCurrency.value.focus();
        }
      });
    }

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue !== "") {
          convertCurrency(props.modelValue);
        }
      },
      { immediate: true }
    );

    return {
      convertedCurrency,
      isFocused,
      setFocus,
      uniqueNameIdentifier,
      onChange,
      baseCurrency,
      convertCurrency,
      updateModelValue,
    };
  },
};
</script>

<style scoped></style>
