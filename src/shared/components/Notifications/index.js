/* eslint-disable */
import { render, h } from "vue";
import NotificationContainer from "./NotificationContainer.vue";
import NotificationItem from "./NotificationItem.vue";
import settings from "../settings";

export function notify() {
  // create container
  const parent = createContainer();

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  itemContainer.classList.add("self-end");

  const vNode = h(NotificationItem, {
    parentNode: parent,
    selfNode: itemContainer,
  });

  parent.appendChild(itemContainer);
  render(vNode, itemContainer);
}

function createContainer() {
  const parent = document.querySelector(".notification-container");
  if (!parent) {
    const vNode = h(NotificationContainer);
    render(vNode, document.body);
    return vNode.el;
  }
  return parent;
}

export default {
  notify,
};
