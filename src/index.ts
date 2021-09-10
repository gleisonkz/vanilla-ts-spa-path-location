import { HomePage } from './pages/home.page';

const $app = document.querySelector("#app");

const ROUTES = [
  { path: "/", page: HomePage },
  // { path: "/posts", page: Posts },
  // { path: "/posts/:id", page: PostView },
  // { path: "/settings", page: Settings },
];

const pathToRegexPattern = (path: string) =>
  path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$";

const navigateTo = (path: string) => {
  history.pushState(null, "", path);
  router();
};

const updateApp = ($element: HTMLElement) => {
  if (!$app) throw new Error("No app element found");

  $app.innerHTML = "";
  const $page = $element;
  $app?.appendChild($page);
};

const router = async () => {
  // Test each route for a potential match.
  let targetRoute = ROUTES.map((route) => {
    const pattern = pathToRegexPattern(route.path);
    const currentPath = location.pathname;
    const match = currentPath.match(pattern);

    return { route, match };
  }).find((route) => route.match);

  if (!targetRoute) {
    targetRoute = {
      route: ROUTES[0],
      match: [location.pathname],
    };
  }

  const params = "";
  const Page = targetRoute.route.page;
  const pageObj = new Page(params);
  const $page = await pageObj.getPage();
  updateApp($page);
};

const setAnchorListener = (event: Event) => {
  event.preventDefault();
  const element = event.target;
  const isAnchorElement = element instanceof HTMLAnchorElement;

  if (!isAnchorElement) return;

  const hasDataLink = element.matches("[router-link]");
  if (hasDataLink) navigateTo(element.href);
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", setAnchorListener);
  router();
});
