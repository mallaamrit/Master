<template>
  <div>
    <label :class="{ hidden: !label && !$slots.label }" class="block font-semibold mb-1 text-sm">
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <OnClickOutside @trigger="onClickOutside">
      <div class="relative">
        <div
          class="appearance-none border text-gray-700 focus:shadow-outline text-left flex justify-between rounded-md overflow-hidden h-[42px]"
          :class="{
            'border-b-0 rounded-bl-none rounded-br-none': open,
            'base-input-error': error,
            'base-input-success': success,
            'base-input-normal': !success && !error,
          }"
          @click.self="toggleDropdown"
          @keydown="handleKeyDown"
        >
          <!-- Search input -->
          <input
            v-if="open && search"
            ref="searchInputRef"
            v-model="searchKeyword"
            type="text"
            class="focus:outline-none px-3 bg-transparent leading-6 text-sm"
            v-bind="$attrs"
            @input="searchOptions"
          />
          <!-- Select -->
          <div
            v-else
            class="flex gap-2 items-center mx-5 flex-wrap"
            @click.self="toggleDropdown"
            @keydown="handleKeyDown"
          >
            <span
              v-for="data in selectedData"
              :key="data[uid]"
              class="flex items-center text-sm !bg-blue-350 font-normal pl-2 rounded-full whitespace-nowrap"
              style="height: 26px"
              >{{ data[optionText] }}
              <button
                type="button"
                class="bg-blue-450 rounded-full w-5 h-5 leading-5 !p-0 ml-2 mr-1 text-center"
                @click="removeSelected(data)"
              >
                <BaseIcon class="text-white" style="margin-left: 3px" name="x" />
              </button>
            </span>
            <span
              v-if="selectedData.length <= 0"
              class="text-sm"
              style="color: #a9a3af"
              @click.self="toggleDropdown"
              @keydown="handleKeyDown"
              >{{ placeholder }}</span
            >
          </div>
          <div class="flex items-center">
            <SelectorIcon aria-hidden="true" class="w-5 h-5 text-gray-400 mr-2" />
          </div>
        </div>
        <div
          v-if="open"
          class="absolute bg-white min-w-full z-50 border border-blue-normal rounded-br-md rounded-bl-md overflow-hidden"
          :class="{
            'border-t-0': open,
            'base-input-error': error,
            'base-input-success': success,
            'base-input-normal': !success && !error,
          }"
        >
          <ul class="text-left block overflow-y-auto">
            <li
              v-for="(option, i) in filterOptions"
              :key="i"
              class="px-4 hover:bg-blue-light cursor-pointer py-3 text-sm"
              @click="onSelect(option)"
              @keydown="onSelect(option)"
            >
              {{ option[optionText] }}
            </li>
            <li v-if="filterOptions.length === 0" class="px-4 py-3 text-sm">No data found</li>
          </ul>
        </div>
      </div>
    </OnClickOutside>
  </div>
</template>

<script>
import { ref, computed, watchEffect, nextTick } from "vue";
import BaseIcon from "@/shared/components/BaseIcon/BaseIcon.vue";
import { SelectorIcon } from "@heroicons/vue/solid";
import { OnClickOutside } from "@vueuse/components";

export default {
  name: "BaseMultiSelect",
  components: { SelectorIcon, OnClickOutside, BaseIcon },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      required: false,
      default: () => {},
    },
    options: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    optionText: {
      type: String,
      default: "",
    },
    uid: {
      type: String,
      required: false,
      default: "id",
    },
    search: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    success: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["onSelected", "update:modelValue"],
  setup(props, context) {
    const searchInputRef = ref(null);
    const open = ref(false);
    const selectedData = ref([]);
    const searchKeyword = ref("");

    // return object from props.option which are not in selectedData
    const filterOptions = computed(() => {
      if (selectedData.value.length > 0) {
        const list = [];
        props.options.forEach((option) => {
          const i = selectedData.value.findIndex((data) => data[props.uid] === option[props.uid]);
          if (i === -1) {
            list.push(option);
          }
        });
        return list;
      }
      return props.options;
    });

    function onClickOutside() {
      if (open.value) open.value = false;
    }

    function toggleDropdown() {
      if (!open.value) {
        searchKeyword.value = "";
        open.value = true;
        nextTick(() => {
          if (searchInputRef.value !== null) {
            searchInputRef.value.focus();
          }
        });
      } else {
        open.value = false;
      }
    }

    function setPreSelectedData(options, preSelectedData) {
      if (options.length > 0 && preSelectedData.length > 0) {
        const commonData = options.filter((option) => preSelectedData.includes(option[props.uid]));
        selectedData.value = commonData;
      }
    }

    function updateModelValue() {
      const modelValue = selectedData.value.map((option) => option[props.uid]);
      context.emit("update:modelValue", modelValue);
      context.emit("onSelected", modelValue);
    }

    function onSelect(data) {
      open.value = false;
      selectedData.value.push(data);
      updateModelValue();
    }

    function removeSelected(data) {
      const index = selectedData.value.findIndex((o) => o[props.uid] === data[props.uid]);
      if (index !== -1) {
        selectedData.value.splice(index, 1);
      }
      updateModelValue();
    }

    function handleKeyDown() {}

    watchEffect(() => {
      setPreSelectedData(props.options, props.modelValue);
    });

    return {
      searchInputRef,
      open,
      selectedData,
      searchKeyword,
      filterOptions,
      onClickOutside,
      toggleDropdown,
      setPreSelectedData,
      updateModelValue,
      onSelect,
      removeSelected,
      handleKeyDown,
    };
  },
};
</script>

<style scoped lang="scss"></style>
