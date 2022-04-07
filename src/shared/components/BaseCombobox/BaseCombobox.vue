<template>
  <div class="w-96">
    <Combobox v-model="selectedValue">
      <div class="relative mt-1">
        <div
          class="relative w-full text-left bg-white rounded-sm cursor-default focus:outline-none border border-green-primary focus-within:outline-none sm:text-sm overflow-hidden py-1"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none"
            :display-value="(id) => (id != null ? getSelectedLabel(id) : '')"
            autocomplete="off"
            @focus="test"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              v-if="open"
              class="child-options absolute w-full overflow-auto text-base bg-white max-h-80 focus:outline-none border border-blue-light sm:text-sm"
            >
              <div
                v-if="filteredOptions.length === 0 && query !== ''"
                class="cursor-default select-none relative py-2 px-4 text-gray-700"
              >
                No Data Found
              </div>

              <ComboboxOption
                v-for="person in filteredOptions"
                as="template"
                :key="person.id"
                :value="person.id"
                v-slot="{ selected, active }"
              >
                <li
                  class="cursor-default select-none relative py-3 pl-10 pr-4"
                  :class="{
                    'text-black bg-blue-light': active,
                    'text-gray-900': !active,
                    'bg-blue-light': selected,
                  }"
                >
                  <span class="block truncate font-medium">
                    {{ person.name }}
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </div>
    </Combobox>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, computed, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { SelectorIcon } from "@heroicons/vue/solid";

export default {
  name: "BaseCombobox",
  components: {
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxOptions,
    ComboboxOption,
    TransitionRoot,
    SelectorIcon,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
  },
  setup(props) {
    const selectedValue = ref(null);
    const query = ref("");
    const open = ref(false);

    function getSelectedLabel(id) {
      const data = props.options.find((a) => a.id === id);
      return data[props.label];
    }

    function setActiveData() {
      selectedValue.value = props.modelValue;
    }

    function test() {
      open.value = true;
    }

    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        console.log("watch triggered");
        if (newValue !== oldValue) {
          setActiveData();
        }
      }
    );

    const filteredOptions = computed(() =>
      query.value === ""
        ? props.options
        : props.options.filter((person) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.value.toLowerCase().replace(/\s+/g, ""))
          )
    );

    return {
      selectedValue,
      query,
      getSelectedLabel,
      filteredOptions,
      open,
      test,
    };
  },
};
</script>

<style scoped lang="scss"></style>
