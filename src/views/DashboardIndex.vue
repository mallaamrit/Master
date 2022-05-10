<template>
  <div class="p-20 bg-[#FAFAFA] min-h-screen">
    <div class="bg-[#faf0f0] p-10 border-2 border-gray-100 rounded shadow-sm">
      <h1 class="font-semibold text-2xl">Component/Docs</h1>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Base Button</h2>
        <BaseButton class="mr-5" color="primary" @click="onClick">
          Click Me!</BaseButton
        >
        <BaseButton color="light">Click Me!</BaseButton>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Base Input</h2>
        <BaseInput type="text" v-model="text"></BaseInput>
        <div>Input value: {{ text }}</div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Base Select</h2>
        <BaseSelect
          v-model="selectedOption"
          :options="selectOptions"
          label="Country"
          option-text="text"
        ></BaseSelect>
        <div>
          Selected country:
          <span v-if="selectedOption !== ''">{{
            selectOptions.find((opt) => opt.id === selectedOption).text
          }}</span>
        </div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Base Select</h2>
        <BaseTextEditor v-model="textEditor"></BaseTextEditor>
        <div>Editor data: {{ textEditor }}</div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Custom Dropdown</h2>
        <BaseDropdown>
          <template #selector>
            <BaseButton>+ Add Vendor</BaseButton>
          </template>
          <div class="rounded-lg px-4 py-2 bg-red-400">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
              <li>Option 4</li>
            </ul>
          </div>
        </BaseDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const text = ref("");
    const selectOptions = ref([
      {
        id: 1,
        text: "Australia",
        value: "aus",
      },
      {
        id: 2,
        text: "Canada",
        value: "ca",
      },
    ]);
    const selectedOption = ref("");
    const textEditor = ref(
      "<p><strong><em>some random datasssssss\nasdasdasd</em></strong>\n</p>"
    );

    function onClick() {
      console.log("clicked....");
    }

    return { text, selectOptions, selectedOption, onClick, textEditor };
  },
};
</script>
