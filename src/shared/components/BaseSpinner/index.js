/* eslint-disable */
import { render, h } from "vue";
import BaseSpinner from "./BaseSpinner.vue";

export default {
  start() {
    console.log("start called");
    // let container = document.querySelector(".base-spinner");

    // if (container === null) {
    //   container = document.createElement("div");
    //   container.classList.add("base-spinner");
    // }

    // const spinnerVNode = h(BaseSpinner);
    // document.body.append(container);
    // render(spinnerVNode, container);
  },

  stop() {
    console.log("stop called");
    // const container = document.querySelector(".base-spinner");
    // render(null, container);
  },
};
