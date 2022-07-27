<template>
  <div class="p-5 bg-[#FFFFFF] min-h-screen">
    <div class="bg-[#faf0f0] p-10 border-2 border-gray-100 rounded shadow-sm">
      <h1 class="font-semibold text-2xl">Component/Docs</h1>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Button</h2>
        <div class="flex">
          <div class="w-1/2 flex items-center flex-wrap pr-2 gap-5">
            <BaseButton color="primary" @click="callEvent">Primary</BaseButton>
            <BaseButton color="secondary" @click="callEvent">Secondary</BaseButton>
            <BaseButton color="success" @click="callEvent">Success</BaseButton>
            <BaseButton color="info" @click="callEvent">Info</BaseButton>
            <BaseButton color="light" @click="callEvent">Light</BaseButton>
            <BaseButton disabled @click="callEvent">Disabled</BaseButton>
            <BaseButton size="normal" @click="callEvent">NORMAL BUTTON</BaseButton>
            <BaseButton size="small" @click="callEvent">SMALL BUTTON</BaseButton>
            <BaseButton size="large" @click="callEvent">EXTRA LARGE BUTTON</BaseButton>
          </div>

          <div class="w-1/2 pl-2">
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
        <h2 class="font-medium text-2xl mb-2">Input</h2>
        <div class="flex">
          <div class="w-1/2 pr-2">
            <div class="mb-2">
              <BaseInput
                label="Username"
                class="mb-2"
                type="text"
                placeholder="Normal Input"
                @blur="callEvent"
                @click="callEvent"
              />
            </div>
            <div class="mb-2">
              <BaseInput class="mb-2" type="text" v-model="text" :error="true" placeholder="Error Input" />
            </div>
            <div class="mb-2">
              <BaseInput class="mb-2" type="text" v-model="text" :success="true" placeholder="Success Input" />
            </div>
            <div class="mb-2">
              <BaseInput class="mb-2" type="text" v-model="text" disabled placeholder="Disabled Input" />
            </div>
            <div class="mb-2">
              <BaseInput
                class="mb-2"
                type="text"
                v-model="text"
                placeholder="Input with slots"
                @click="callEvent"
                @click:append="callEvent"
                @click:prepend="callEvent"
              >
                <template #prepend>icon</template>
                <template #append>icon</template>
              </BaseInput>
            </div>
          </div>
          <div class="w-1/2 pl-2">
            <label class="block font-semibold text-2xl">Props:</label>
            <div><b class="mr-2">modelValue: v-model</b> reactive model</div>
            <div><b class="mr-2">name: String</b> name of input</div>
            <div><b class="mr-2">label: String</b> input label</div>
            <div><b class="mr-2">type: String</b> input type | default: text</div>
            <div><b class="mr-2">disabled: Boolean</b> input type | default: text</div>
            <div><b class="mr-2">success: Boolean</b> input state | default: false</div>
            <div><b class="mr-2">error: Boolean</b> input state | default: false</div>
            <div><b class="mr-2">placeholder: String</b> input placeholder</div>
            <br />
            <div><b class="mr-2">Slots:</b> #prepend #append #label</div>
            <br />
            <label class="block font-semibold text-2xl">Events:</label>
            <div>@update:modelValue | @click | @blur | @click:append | @click:prepend</div>
          </div>
        </div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Colors</h2>
        <div class="p-2 text-xs bg-blue-100">bg-blue-100</div>
        <div class="p-2 text-xs bg-blue-200">bg-blue-200</div>
        <div class="p-2 text-xs bg-blue-300">bg-blue-300</div>
        <div class="p-2 text-xs bg-blue-400">bg-blue-400</div>
        <div class="p-2 text-xs bg-blue-500">bg-blue-500</div>
        <br />
        <div class="p-2 text-xs bg-green-400">bg-green-400</div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Modal</h2>
        <BaseButton @click="modalOpen = true">Open Modal</BaseButton>
        <BaseModal :open="modalOpen" title="Modal Title" title-css="text-[20px]" @close="modalOpen = false">
          <div class="mb-10">Modal content goes here!</div>
          <BaseButton @click="modalOpen = false">Close</BaseButton>
        </BaseModal>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Accordian</h2>
        <BaseAccordian class="mb-10" title="Default Accordian" :active="true">
          <div class="py-2 px-6 bg-white">Accordian content goes here</div>
        </BaseAccordian>
        <BaseAccordian accordian-css="!bg-blue-500 rounded-none" :active="true">
          <template #title> Custom accorddian</template>
          <template #default="{ close }">
            <div class="py-2 px-6 bg-white">
              Accordian content goes here
              <BaseButton @click="close">Close</BaseButton>
            </div>
          </template>
        </BaseAccordian>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Checkbox</h2>
        <div class="mb-4">
          <h3 class="font-medium text-md mb-2">Model as Boolean</h3>
          <BaseCheckbox v-model="checkbox" />
          Checkbox value: {{ checkbox }}
        </div>

        <div class="mb-4">
          <h3 class="font-medium text-md mb-2">Model as array</h3>
          <BaseCheckbox v-model="selected" :value="1" label="1" />
          <BaseCheckbox v-model="selected" value="Dean" label="Dean" />
          Selected Checkbox values: {{ selected }}
        </div>

        <div class="mb-4">
          <h3 class="font-medium text-md mb-2">Disabled State</h3>
          <BaseCheckbox v-model="checkbox" disabled label="Disabled" />
          <BaseCheckbox />
        </div>
      </div>

      <div class="my-16">
        <h2 class="font-medium text-2xl mb-2">Checkbox</h2>
        <BaseSelect :options="options" option-text="text" uid="id" v-model="selectValue" search />
        <BaseSelect :options="options" option-text="text" uid="id" v-model="selectValue" search />
        <BaseSelect :options="options" option-text="text" uid="id" v-model="selectValue" search />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_SIZES } from "@/shared/components/BaseButton/types";

const arrayToString = (array, seperator) => array.join(` ${seperator} `);

const text = ref("");

const callEvent = () => {
  console.log("triggered");
};

const modalOpen = ref(false);
const checkbox = ref(true);
const selected = ref(["1"]);

const options = ref([
  {
    id: 1,
    text: "Option 1 asdasdasd asdasdasd asdasdasd asdasdasd asdasdas",
  },
  {
    id: 2,
    text: "Option 2",
  },
]);
const selectValue = ref(1);
</script>
