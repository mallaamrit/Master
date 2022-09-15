import {
  isRef,
  watch,
  onMounted,
  onBeforeUnmount,
  unref,
  h,
  render,
} from "vue";
import BaseSpinner from "../components/BaseSpinner/BaseSpinner.vue";

/**
 * Add a event listeners
 */
export function useEventListener(target, event, handler) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      value?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}

/**
 * If selected html element is not on view-port then scroll app to the element
 *
 */
export function showElementOnViewport(selector, options) {
  const elements = document.querySelector(selector);
  if (!elements) {
    throw new Error("Selector element was not found");
  }

  const selectedElement = elements[0] || elements;

  return selectedElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
    ...options,
  });
}

export function useSpinnerLoader() {
  let index = 0;

  function createContainer() {
    const el = document.querySelector(".base-spinner-container");
    if (!el) {
      const containerNode = document.createElement("div");
      containerNode.classList.add("base-spinner-container");
      return containerNode;
    }
    return el;
  }

  function startLoader() {
    const container = createContainer();

    if (container.innerHTML === "") {
      const vNode = h(BaseSpinner);
      document.body.append(container);
      render(vNode, container);
    }
    index += 1;
  }

  function stopLoader() {
    index -= 1;

    const container = createContainer();
    if (index === 0) {
      render(null, container);
    }
  }

  return { startLoader, stopLoader };
}
