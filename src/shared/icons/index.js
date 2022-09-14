import IconBase from "./IconBase.vue";
import IconCalendar from "./IconCalendar.vue";
import IconTrash from "./IconTrash.vue";

const componentsPlugin = {
  install(app) {
    app.component("IconBase", IconBase);
    app.component("IconCalendar", IconCalendar);
    app.component("IconTrash", IconTrash);
  },
};

export default componentsPlugin;
