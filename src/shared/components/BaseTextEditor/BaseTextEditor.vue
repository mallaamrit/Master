<template>
  <label :class="{ hidden: !label && !$slots.label }" class="block font-semibold mb-1 text-sm">
    <slot name="label" v-bind="{ label }">{{ label }}</slot>
  </label>
  <div
    class="border border-blue-normal rounded-md h-[147px]"
    :class="[{ '!border-green-primary': success }, { '!border-red-500': error }]"
  >
    <QuillEditor
      v-model:content="editorText"
      @update:content="onContentUpdate"
      @blur="$emit('blur')"
    ></QuillEditor>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "BaseTextEditor",
  inheritAttrs: false,
  components: { QuillEditor },
  emits: ["update:modelValue", "blur"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const editorText = ref("");
    function onContentUpdate(data) {
      context.emit("update:modelValue", data);
    }

    watch(
      () => props.modelValue,
      (data) => {
        if (data !== "") {
          editorText.value = data;
        }
      }
    );

    return { editorText, onContentUpdate };
  },
};
</script>

<style lang="scss">
.ql-toolbar {
  border: 0px !important;
  border-width: 0;
  border-bottom: 1px solid #cccccc !important;
  border-bottom-width: 1px !important;
}
.ql-container {
  border: 0px !important;
  border-width: 0;
}
</style>
