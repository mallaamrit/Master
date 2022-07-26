<template>
  <Combobox v-model="selectedPerson">
    <ComboboxInput @change="query = $event.target.value" :display-value="(person) => person.name" />
    <ComboboxOptions>
      <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" :disabled="person.unavailable">
        {{ person.name }}
      </ComboboxOption>
    </ComboboxOptions>
  </Combobox>
</template>

<script setup>
import { ref, computed } from "vue";
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from "@headlessui/vue";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const selectedPerson = ref(people[0]);
const query = ref("");

const filteredPeople = computed(() =>
  query.value === "" ? people : people.filter((person) => person.name.toLowerCase().includes(query.value.toLowerCase()))
);
</script>
