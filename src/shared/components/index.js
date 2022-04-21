import BaseButton from "./BaseButton/BaseButton.vue";
import BaseInput from "./BaseInput/BaseInput.vue";
import BaseSelect from "./BaseSelect/BaseSelect.vue";
import BaseAccordian from "./BaseAccordian/BaseAccordian.vue";
import BaseMultiSelect from "./BaseMultiSelect/BaseMultiSelect.vue";

const componentsPlugin = {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("BaseInput", BaseInput);
    app.component("BaseSelect", BaseSelect);
    app.component("BaseAccordian", BaseAccordian);
    app.component("BaseMultiSelect", BaseMultiSelect);
  },
};

export default componentsPlugin;
