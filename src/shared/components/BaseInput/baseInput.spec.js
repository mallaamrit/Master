import { mount } from "@vue/test-utils";
import BaseInput from "./BaseInput.vue";

describe("BaseInput", () => {
  it("model value", () => {
    const wrapper = mount(BaseInput, {
      propsData: {
        text: "Input text",
      },
    });

    console.log(wrapper.find("input"));
    // expect(wrapper.find("input").element.value).toEqual("Input text");
  });
});
