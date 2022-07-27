import { mount } from "@vue/test-utils";
import { h, ref } from "vue";
import Input from "./TestInput.vue";

describe("Input", () => {
  it("update model value on input change event", async () => {
    const input = ref("a");
    const wrapper = mount(<Input data-test-ref="input" v-model={input.value} />);

    const $input = wrapper.find('[data-test-ref="input"]');
    expect($input.element.value).toBe("a");

    $input.element.value = "b";
    await $input.trigger("input");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue").length).toBe(1);

    expect(input.value).toBe("b");
  });

  it("renders text from props input-value", () => {
    const wrapper = mount(<Input data-test-ref="input" value="a" />);
    const $input = wrapper.find('[data-test-ref="input"]');
    expect($input.element.value).toBe("a");
    expect(wrapper.vm.modelValue).toBe("");
  });

  it("renders label if label props is passed", async () => {
    const wrapper = mount(<Input />);
    expect(wrapper.find(".form_input_label").exists()).toBe(false);

    await wrapper.setProps({ label: "a" });
    expect(wrapper.find(".form_input_label").exists()).toBe(true);
    expect(wrapper.find(".form_input_label").text()).toBe("a");
  });

  it("renders slot label", () => {
    const wrapper = mount(Input, {
      slots: {
        label: h("div", { class: "custom-label" }, "a"),
      },
    });

    expect(wrapper.find(".custom-label").exists()).toBe(true);
    expect(wrapper.find(".custom-label").text()).toBe("a");
  });

  it("has type text as default and can be changed", async () => {
    const wrapper = mount(<Input data-test-ref="input-field" />);
    expect(wrapper.find('[data-test-ref="input-field"]').attributes("type")).toBe("text");

    await wrapper.setProps({ type: "password" });
    expect(wrapper.find('[data-test-ref="input-field"]').attributes("type")).toBe("password");
  });

  it("");
});
