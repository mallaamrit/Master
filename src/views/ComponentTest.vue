<template>
  <IconBase
    class="text-red-500"
    data-download-campaign
    type="button"
    :disabled="disabled"
    @click="onClick"
  >
    <IconTrash />
  </IconBase>
  &nbsp;
  <IconBase data-download-campaign type="button" rounded>
    <IconTrash />
  </IconBase>
  &nbsp;
  <IconBase data-download-campaign type="button" rounded size="small">
    <IconTrash />
  </IconBase>
  &nbsp;
  <IconBase flat>
    <IconTrash />
  </IconBase>
</template>

<script setup>
import { ref } from "vue";

const disabled = ref(false);
setTimeout(() => {
  console.log("called");
  disabled.value = true;
}, 1000);

const onClick = () => {
  console.log(1);
};
</script>
