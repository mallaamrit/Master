<template>
  <div class="p-20">
    <BaseInput
      label="Username"
      class="my-custom-class"
      type="text"
      placeholder="Normal Input"
      @blur="onClick"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  name: "ComponentTest",
  methods: {
    onClick() {
      console.log(1);
    },
  },
};
</script>
