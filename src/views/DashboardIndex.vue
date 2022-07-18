<template>
  <div class="p-10 bg-[#FFFFFF] min-h-screen">
    <div class="bg-[#faf0f0] p-10 border-2 border-gray-100 rounded shadow-sm">
      <h1 class="font-semibold text-2xl">Component/Docs</h1>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Button</h2>
        <div class="flex">
          <div class="w-1/2 flex flex-wrap">
            <div class="m-2">
              <BaseButton color="primary">Primary</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton color="secondary">Secondary</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton color="success">Success</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton color="info">Info</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton color="light">Light</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton disabled @click="click">Disabled</BaseButton>
            </div>

            <div class="m-2">
              <BaseButton size="normal">NORMAL BUTTON</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton size="small">SMALL BUTTON</BaseButton>
            </div>
            <div class="m-2">
              <BaseButton size="large">EXTRA LARGE BUTTON</BaseButton>
            </div>
          </div>

          <div class="w-1/2">
            <label class="block font-semibold text-2xl">Props:</label>
            <div>
              <b class="mr-5">color: String</b>
              {{ arrayToString(BUTTON_COLORS, "|") }}
            </div>
            <div>
              <b class="mr-5">type: String</b>
              {{ arrayToString(BUTTON_TYPES, "|") }}
            </div>
            <div>
              <b class="mr-5">size: String</b>
              {{ arrayToString(BUTTON_SIZES, "|") }}
            </div>
            <div><b class="mr-5">disabled: Boolean</b> true | false</div>

            <label class="block font-semibold text-2xl mt-5">Events:</label>
            <div>@click = (event) => {}</div>
            <div>@dblclick = (event) => {}</div>
          </div>
        </div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-lg mb-2">Input</h2>
        <div class="mb-2">
          <BaseInput
            class="mb-2"
            type="text"
            v-model="text"
            placeholder="Normal Input"
          />
        </div>
        <div class="mb-2">
          <BaseInput
            class="mb-2"
            type="text"
            v-model="text"
            :error="true"
            placeholder="Error Input"
          />
        </div>
        <div class="mb-2">
          <BaseInput
            class="mb-2"
            type="text"
            v-model="text"
            :success="true"
            placeholder="Success Input"
          />
        </div>
        <div class="mb-2">
          <BaseInput
            class="mb-2"
            type="text"
            v-model="text"
            disabled
            placeholder="Disabled Input"
          />
        </div>
        <div class="mb-2">
          <BaseInput
            class="mb-2"
            type="text"
            v-model="text"
            placeholder="Input with slots"
          >
            <template #contentRight>icon</template>
            <template #contentLeft>icon</template>
          </BaseInput>
        </div>
      </div>

      <div>Color Pallete | BEOOH</div>
      <div class="p-2 text-xs bg-blue-100">bg-blue-100</div>
      <div class="p-2 text-xs bg-blue-200">bg-blue-200</div>
      <div class="p-2 text-xs bg-blue-300">bg-blue-300</div>
      <div class="p-2 text-xs bg-blue-400">bg-blue-400</div>
      <div class="p-2 text-xs bg-blue-500">bg-blue-500</div>
      <br />
      <div class="p-2 text-xs bg-green-400">bg-green-400</div>

      <!-- <div class="my-16">
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
      </div> -->
    </div>
  </div>
</template>

<script setup>
import {
  BUTTON_COLORS,
  BUTTON_TYPES,
  BUTTON_SIZES,
} from "@/shared/components/BaseButton/types";
import { ref } from "vue";

const arrayToString = (array, seperator) => array.join(` ${seperator} `);

const text = ref("");

const click = () => {
  console.log("click");
};
</script>
