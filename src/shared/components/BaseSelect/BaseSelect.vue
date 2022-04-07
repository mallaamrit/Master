<template>
  <OnClickOutside @trigger="onClickOutside">
    <div class="relative">
      <div
        class="appearance-none border-2 text-gray-700 leading-tight focus:shadow-outline text-left flex justify-between border-green-primary rounded-md overflow-hidden"
        :class="{
          'border-b-0 rounded-bl-none rounded-br-none': open,
          '!border-red-500': error,
          '!border-blue-primary': success,
        }"
        @click="toggleDropdown"
        @keydown="toggleDropdown"
      >
        <!-- Search input -->
        <input
          v-if="open && search"
          type="text"
          class="focus:outline-none px-3 py-3 bg-transparent"
          v-model="searchKeyword"
          :placeholder="selectedOption[label]"
          ref="dropDownSearch"
          @input="searchOptions"
          v-bind="$attrs"
        />
        <!-- Select -->
        <input
          v-else
          type="text"
          disabled
          :value="selectedOption[label]"
          class="focus:outline-none px-3 py-3.5 bg-transparent"
        />
        <div class="flex items-center">
          <SelectorIcon class="w-5 h-5 text-gray-400 mr-2" aria-hidden="true" />
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
            class="px-4 hover:bg-blue-light cursor-pointer py-3"
            :class="{ 'bg-blue-light': isSelected(option) }"
            v-for="(option, i) in filterOptions"
            :key="i"
            @click="onSelect(option)"
            @keydown="onSelect(option)"
          >
            {{ option[label] }}
          </li>
          <li class="px-4 py-3" v-if="filterOptions.length === 0">
            No data found
          </li>
        </ul>
      </div>
    </div>
  </OnClickOutside>
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
      required: false,
      default: () => {},
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
      default: "label",
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
  },
  emits: [
    /**
     * When a row/option is selected event is emitted
     * Passed data to event is selected row/option object
     * <base-select @onSelect="doSomething" />
     */
    "onSelected",
    "update:modelValue",
  ],
  data() {
    return {
      open: false,
      selectedOption: {},
      searchKeyword: "",
    };
  },

  watch: {
    modelValue: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          const data = this.options.find(
            (option) => option[this.uid] === newValue
          );
          this.setSelectedOption(data);
        }
      },
    },
  },

  computed: {
    filterOptions() {
      if (this.search && this.searchKeyword !== "") {
        return this.options.filter((option) => {
          if (
            option[this.label]
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase())
          ) {
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
      if (this.open) this.open = false;
    },
    setSelectedOption(data) {
      this.selectedOption = data;
    },
    toggleDropdown() {
      if (!this.open) {
        this.searchKeyword = "";
      }

      this.open = true;

      if (this.search) {
        this.$nextTick(() => {
          this.$refs.dropDownSearch.focus();
        });
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
      if (this.selectedOption[this.label] === option[this.label]) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
