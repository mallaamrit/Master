import BaseButton from "./BaseButton/BaseButton.vue";
import BaseInput from "./BaseInput/BaseInput.vue";
import BaseSelect from "./BaseSelect/BaseSelect.vue";

import "../assets/styles/index.scss";

const componentsPlugin = {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("BaseInput", BaseInput);
    app.component("BaseSelect", BaseSelect);
  },
};

export default componentsPlugin;
