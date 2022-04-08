<template>
  <div>Skynet App</div>

  <div class="p-10">
    <BaseAccordian :active="true" title="Accordian title">
      Content goes here
    </BaseAccordian>

    <div class="my-10"></div>

    <BaseMultiSelect
      v-model="optionModel"
      label="Evaluation Criteria"
      option-text="name"
      :options="multiSelectOptions"
    ></BaseMultiSelect>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const optionModel = ref([]);

    setTimeout(() => {
      optionModel.value = [
        {
          id: 1,
          name: "Option 1",
        },
        {
          id: 2,
          name: "Option 2",
        },
      ];
    }, 2000);
    const multiSelectOptions = ref([
      {
        id: 1,
        name: "Option 1",
      },
      {
        id: 2,
        name: "Option 2",
      },
      {
        id: 3,
        name: "Option 3",
      },
    ]);

    return { optionModel, multiSelectOptions };
  },
};
</script>
