export default function setPageTitle(partialPageTitle = "") {
  const APP_NAME = process.env.VUE_APP_APP_NAME || "App";
  document.title = `${APP_NAME} - ${partialPageTitle}`;
}
