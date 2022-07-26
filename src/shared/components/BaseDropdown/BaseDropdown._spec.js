// import { mount } from "@vue/test-utils";
// import BaseDropdown from "./BaseDropdown.vue";

// describe("BaseDropdown.vue", () => {
//   it("should open/close dropdown when clicked on selector", async () => {
//     const wrapper = mount(BaseDropdown, {
//       slots: {
//         default: "content",
//       },
//     });

//     // verify open
//     await wrapper.find('[data-cy="base-dropdown"]').trigger("click");
//     expect(wrapper.find('[data-cy="base-dropdown-content"]').text()).toContain("content");

//     // verify close
//     await wrapper.find('[data-cy="base-dropdown"]').trigger("click");
//     console.log(wrapper.find('[data-cy="base-dropdown-content"]'));
//     expect(wrapper.find('[data-cy="base-dropdown-content"]').exists()).toBeFalsy();
//   });
// });
