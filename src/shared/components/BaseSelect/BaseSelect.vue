<template>
  <div>
    <label :class="{ hidden: !label && !$slots.label }" class="block font-semibold mb-1 text-sm">
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </label>
    <OnClickOutside @trigger="onClickOutside">
      <div class="relative">
        <div
          class="appearance-none text-gray-700 leading-tight focus:shadow-outline text-left flex justify-between border rounded-md overflow-hidden bg-white py-2"
          :class="{
            'border-b-0 rounded-bl-none rounded-br-none': open,
            'base-input-error': error,
            'base-input-success': success,
            'base-input-normal': !success && !error,
          }"
          @click="toggleDropdown"
          @keydown="handleKeyDown"
        >
          <!-- Search input -->
          <input
            v-if="open && search"
            type="text"
            class="min-w-0 focus:outline-none bg-transparent px-4 leading-6 text-sm"
            v-model="searchKeyword"
            :placeholder="selectedOption[optionText]"
            ref="dropDownSearch"
            @input="searchOptions"
            @keypress.tab="handleKeyDown"
            v-bind="$attrs"
          />
          <!-- Select -->
          <input
            v-else
            type="text"
            disabled
            :placeholder="placeholder"
            :value="selectedOption[optionText]"
            class="min-w-0 focus:outline-none bg-transparent px-4 leading-6 text-sm"
          />
          <div class="flex items-center">
            <SelectorIcon class="w-5 h-5 text-gray-400 mr-2" aria-hidden="true" />
          </div>
        </div>
        <div
          v-if="open"
          class="absolute bg-white min-w-full z-50 border border-blue-50 rounded-br-md rounded-bl-md overflow-hidden"
          :class="{
            'border-t-0': open,
            '!border-red-500': error,
            '!border-green-50': success,
          }"
        >
          <ul class="text-left block overflow-y-auto">
            <li
              class="px-4 hover:bg-blue-150 cursor-pointer py-3 text-sm"
              :class="{ 'bg-blue-light': isSelected(option) }"
              v-for="(option, i) in filterOptions"
              :key="i"
              @click="onSelect(option)"
              @keydown="onSelect(option)"
            >
              <slot name="option" v-bind="{ option }">{{ option[optionText] }}</slot>
            </li>
            <li class="px-4 py-3 text-sm" v-if="filterOptions.length === 0">No data found</li>
          </ul>
        </div>
      </div>
    </OnClickOutside>
  </div>
</template>

<script>
import { SelectorIcon } from "@heroicons/vue/solid";
import { OnClickOutside } from "@vueuse/components";

export default {
  name: "BaseSelect",
  inheritAttrs: false,
  components: { SelectorIcon, OnClickOutside },
  props: {
    /**
     * v-model:value
     */
    modelValue: {
      type: [String, Number],
      default: "",
    },
    /**
     * UseCase
     * Ex: [{id: 1, country: 'Australia'}, {id: 1, country: 'Canada'}]
     *
     * @type Array
     */
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    /**
     * Ex: [{id: 1, country: 'Australia'}, {id: 1, country: 'Canada'}]
     * label can be 'country'
     * @type text
     */
    label: {
      type: String,
      required: false,
      default: "",
    },
    optionText: {
      type: String,
      default: "",
    },
    /**
     * Set property binding to v-model:value
     */
    uid: {
      type: String,
      required: false,
      default: "id",
    },
    /**
     * Enable/Disable Search feature
     */
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
  emits: ["onSelected", "update:modelValue", "focusout"],
  data() {
    return {
      open: false,
      selectedOption: {},
      searchKeyword: "",
    };
  },

  watch: {
    modelValue: {
      handler() {
        this.computeActiveOption();
      },
      immediate: true,
    },
    options() {
      this.computeActiveOption();
    },
  },

  computed: {
    filterOptions() {
      if (this.search && this.searchKeyword !== "") {
        return this.options.filter((option) => {
          if (option[this.optionText].toLowerCase().includes(this.searchKeyword.toLowerCase())) {
            return true;
          }
          return false;
        });
      }
      return this.options;
    },
  },

  methods: {
    onClickOutside() {
      if (this.open) {
        this.open = false;
        this.$emit("focusout");
      }
    },
    setSelectedOption(data) {
      this.selectedOption = data;
    },
    toggleDropdown() {
      if (!this.open) {
        this.searchKeyword = "";
        this.open = true;

        if (this.search) {
          this.$nextTick(() => {
            this.$refs.dropDownSearch.focus();
          });
        }
      } else {
        this.open = false;
      }
    },
    onSelect(data) {
      this.open = false;
      this.selectedOption = data;
      this.$emit("update:modelValue", data[this.uid]);
      this.$emit("onSelected", data[this.uid]);
    },
    searchOptions($event) {
      this.searchKeyword = $event.target.value;
    },
    isSelected(option) {
      if (this.selectedOption[this.optionText] === option[this.optionText]) {
        return true;
      }
      return false;
    },
    handleKeyDown($event) {
      // On tab key press
      if ($event.keyCode === 9) {
        this.toggleDropdown();
      }
    },
    closeDropdown() {
      console.log("closing dropdown");
    },

    //
    computeActiveOption() {
      if (this.modelValue !== "" && this.options.length > 0) {
        const data = this.options.find(
          // eslint-disable-next-line
          (option) => option[this.uid] == this.modelValue
        );
        if (data !== undefined) {
          this.setSelectedOption(data);
          this.$emit("onSelected", data[this.uid]);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
