import { mount } from "@vue/test-utils";
import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
  it("model value", async () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: "text",
        modelValue: "a",
      },
      attachTo: document.body,
    });

    const $input = wrapper.find("input");
    // expect($input.element.value).toEqual("a");
    // $input.element.value = "b";
    // await $input.trigger("input");
    // expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    // expect(wrapper.emitted("update:modelValue").length).toBe(1);
    console.log($input.vm);

    wrapper.unmount();
  });
});
