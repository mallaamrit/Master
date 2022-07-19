<template>
  <div>
    <label
      :class="{
        hidden: !label && !$slots.label,
        'text-gray-disabled': disabled,
      }"
      class="block font-semibold mb-1 text-sm"
    >
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <date-picker v-model="baseDate" :input-debounce="500" :min-date="minDate" :popover="{ visibility: 'focus' }">
      <template #default="{ inputValue, inputEvents }">
        <div
          class="flex justify-between items-center border border-blue-normal rounded-md h-[42px] px-4 bg-white overflow-hidden"
          :class="[
            {
              'bg-blue-disabled pointer-events-none': disabled,
            },
            { '!border-green-primary': success },
            { '!border-red-500': error },
          ]"
        >
          <input
            class="border-none focus:outline-none h-[42px] text-sm w-2/3"
            :class="{ 'bg-blue-disabled pointer-events-none': disabled }"
            :value="inputValue"
            :placeholder="placeholder"
            readonly
            v-on="inputEvents"
          />
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-4 h-4 fill-current"
          >
            <path
              fill="#9eb2cc"
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            ></path>
          </svg> -->
          <div class="w-1/3">
            <img class="ml-auto" :src="CalendarIcon" alt="" />
          </div>
        </div>
      </template>
    </date-picker>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { DatePicker } from "v-calendar";
import moment from "moment";
import CalendarIcon from "../../assets/icons/calendar.svg";
import "v-calendar/dist/style.css";

export default {
  name: "BaseDatePicker",
  components: { DatePicker },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: [String, Object],
      default: undefined,
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
    const baseDate = ref(props.modelValue);

    watch(baseDate, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        context.emit("update:modelValue", moment(newVal).format("MM-DD-yyyy"));
      }
    });

    return { baseDate, moment, CalendarIcon };
  },
};
</script>

<style lang="scss" scoped></style>
