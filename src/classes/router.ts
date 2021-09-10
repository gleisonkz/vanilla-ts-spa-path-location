import { AboutPage } from '../pages/about.page';
import { AnimesPage } from '../pages/animes.page';
import { HomePage } from '../pages/home.page';

const ROUTES = [
  { path: "/", page: HomePage },
  { path: "/animes", page: AnimesPage },
  // { path: "/posts/:id", page: PostView },
  { path: "/about", page: AboutPage },
];

export class Router {
  private static _instance: Router;
  private static $app = document.querySelector("#app");

  private constructor() {}

  public static get instance(): Router {
    const hasRouter = !!Router._instance;
    return !hasRouter ? (Router._instance = new Router()) : Router._instance;
  }

  private get $app(): Element {
    if (!Router.$app) throw new Error("No app element found");
    return Router.$app;
  }

  async navigate(): Promise<void> {
    let matchedRoute = ROUTES.map((route) => {
      const pattern = this.pathToRegexPattern(route.path);
      const currentPath = location.pathname;

      const match = currentPath.match(pattern);

      return { route, match };
    }).find((route) => route.match);

    if (!matchedRoute) {
      matchedRoute = {
        route: ROUTES[0],
        match: [location.pathname],
      };
    }

    const params = "";
    const Page = matchedRoute.route.page;
    const pageObj = new Page(params);
    const $page = await pageObj.getPage();
    this.updateApp($page);
  }

  updateApp($element: HTMLElement) {
    this.$app.innerHTML = "";
    const $page = $element;
    this.$app.appendChild($page);
  }

  pathToRegexPattern(path: string): string {
    return path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$";
  }
}
