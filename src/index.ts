import { Router } from './classes/router';

const navigateTo = (path: string) => {
  history.pushState(null, "", path);
  Router.instance.navigate();
};

const setAnchorListener = (event: Event) => {
  event.preventDefault();
  const element = event.target as HTMLElement;
  const hasDataLink = element.matches("[router-link]");

  if (!hasDataLink) return;

  const path = element.getAttribute("router-link");
  if (!path) throw new Error("No path found");

  navigateTo(path);
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", setAnchorListener);
  Router.instance.navigate();
});
