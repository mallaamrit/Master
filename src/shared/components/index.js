import BaseButton from "./BaseButton/BaseButton.vue";
import BaseInput from "./BaseInput/BaseInput.vue";
import BaseCheckbox from "./BaseCheckbox/BaseCheckbox.vue";
import BaseTextarea from "./BaseTextarea/BaseTextarea.vue";
import BaseSelect from "./BaseSelect/BaseSelect.vue";
import BaseAccordian from "./BaseAccordian/BaseAccordian.vue";
import BaseMultiSelect from "./BaseMultiSelect/BaseMultiSelect.vue";
import BaseButtonSwitch from "./BaseButtonSwitch/BaseButtonSwitch.vue";
import BaseDatePicker from "./BaseDatePicker/BaseDatePicker.vue";
import BaseCurrency from "./BaseCurrency/BaseCurrency.vue";
import BaseTextEditor from "./BaseTextEditor/BaseTextEditor.vue";
import BaseSpinner from "./BaseSpinner/BaseSpinner.vue";
import BaseTable from "./BaseTable/BaseTable.vue";
import BaseModal from "./BaseModal/BaseModal.vue";
import BaseDropdown from "./BaseDropdown/BaseDropdown.vue";

const componentsPlugin = {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("BaseInput", BaseInput);
    app.component("BaseTextarea", BaseTextarea);
    app.component("BaseSelect", BaseSelect);
    app.component("BaseCheckbox", BaseCheckbox);
    app.component("BaseAccordian", BaseAccordian);
    app.component("BaseMultiSelect", BaseMultiSelect);
    app.component("BaseButtonSwitch", BaseButtonSwitch);
    app.component("BaseDatePicker", BaseDatePicker);
    app.component("BaseCurrency", BaseCurrency);
    app.component("BaseTextEditor", BaseTextEditor);
    app.component("BaseSpinner", BaseSpinner);
    app.component("BaseTable", BaseTable);
    app.component("BaseModal", BaseModal);
    app.component("BaseDropdown", BaseDropdown);
  },
};

export default componentsPlugin;
