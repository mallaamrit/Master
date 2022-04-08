<template>
  <div>
    <label :class="{ hidden: !label }" class="block font-medium mb-1">
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <OnClickOutside @trigger="onClickOutside">
      <div class="relative">
        <div
          class="appearance-none border-2 text-gray-700 leading-tight focus:shadow-outline text-left flex justify-between border-green-primary rounded-md overflow-hidden"
          :class="{
            'border-b-0 rounded-bl-none rounded-br-none': open,
            '!border-red-500': error,
            '!border-blue-primary': success,
          }"
          @click.self="toggleDropdown"
          @keydown="toggleDropdown"
        >
          <!-- Search input -->
          <input
            v-if="open && search"
            ref="dropDownSearch"
            v-model="searchKeyword"
            type="text"
            class="focus:outline-none px-3 py-3 bg-transparent"
            v-bind="$attrs"
            @input="searchOptions"
          />
          <!-- Select -->
          <div v-else class="flex gap-6 items-center h-12 mx-5">
            <span
              v-for="data in selectedData"
              :key="data[uid]"
              class="flex items-center text-sm bg-blue-tertiary font-normal pl-2 rounded-full"
              style="height: 26px"
              >{{ data[optionText] }}
              <button
                class="bg-blue-highlight rounded-full w-5 h-5 leading-5 !p-0 ml-2 mr-1"
                @click.self="removeSelected(data)"
              ></button>
            </span>
          </div>
          <div class="flex items-center">
            <SelectorIcon
              aria-hidden="true"
              class="w-5 h-5 text-gray-400 mr-2"
              @click.self="toggleDropdown"
            />
          </div>
        </div>
        <div
          v-if="open"
          class="absolute bg-white min-w-full z-50 border-2 border-green-primary rounded-br-md rounded-bl-md overflow-hidden"
          :class="{
            'border-t-0': open,
            '!border-red-500': error,
            '!border-blue-primary': success,
          }"
        >
          <ul class="text-left block overflow-y-auto">
            <li
              v-for="(option, i) in filterOptions"
              :key="i"
              class="px-4 hover:bg-blue-light cursor-pointer py-3"
              @click="onSelect(option)"
              @keydown="onSelect(option)"
            >
              {{ option[optionText] }}
            </li>
            <li v-if="filterOptions.length === 0" class="px-4 py-3">
              No data found
            </li>
          </ul>
        </div>
      </div>
    </OnClickOutside>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { SelectorIcon } from "@heroicons/vue/solid";
import { OnClickOutside } from "@vueuse/components";

export default {
  name: "BaseMultiSelect",
  components: { SelectorIcon, OnClickOutside },
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
      default: "label",
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
  },
  emits: ["onSelected", "update:modelValue"],
  setup(props, context) {
    const open = ref(false);
    const selectedData = ref([]);
    const searchKeyword = ref("");

    // return object from props.option which are not in selectedData
    const filterOptions = computed(() => {
      if (selectedData.value.length > 0) {
        const list = [];
        props.options.forEach((option) => {
          const i = selectedData.value.findIndex(
            (data) => data.id === option.id
          );
          if (i === -1) {
            list.push(option);
          }
        });
        return list;
      }
      return props.options;
    });

    watch(
      () => props.modelValue,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          selectedData.value = newVal;
        }
      },
      { immediate: true }
    );

    function onClickOutside() {
      if (open.value) open.value = false;
    }

    function toggleDropdown() {
      if (!open.value) {
        searchKeyword.value = "";
        open.value = true;
      } else {
        open.value = false;
      }
    }

    function onSelect(data) {
      open.value = false;
      selectedData.value.push(data);
      context.emit("update:modelValue", selectedData);
      context.emit("onSelected", selectedData);
    }

    function removeSelected(data) {
      const index = selectedData.value.findIndex((o) => o.id === data.id);
      if (index !== -1) {
        selectedData.value.splice(index, 1);
      }
    }

    return {
      open,
      selectedData,
      searchKeyword,
      filterOptions,
      onClickOutside,
      toggleDropdown,
      onSelect,
      removeSelected,
    };
  },
};
</script>

<style scoped lang="scss"></style>
