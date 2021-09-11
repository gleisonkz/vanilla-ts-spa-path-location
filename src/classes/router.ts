import { AboutPage } from '../pages/about.page';
import { AnimeDetailPage } from '../pages/anime-detail.page';
import { AnimesPage } from '../pages/animes.page';
import { HomePage } from '../pages/home.page';
import { AbstractPage } from './abstract-page';

export interface ParamMap {
  [key: string]: string;
}

interface RegExpMatchRoute {
  route: Route;
  match: RegExpMatchArray;
}

interface Route {
  path: string;
  page: new (params: ParamMap) => AbstractPage;
}

export class Router {
  private static _instance: Router;
  private _$app = document.querySelector("#app");
  private readonly _routes: Route[] = [
    { path: "/", page: HomePage },
    { path: "/animes", page: AnimesPage },
    { path: "/animes/:id", page: AnimeDetailPage },
    { path: "/about", page: AboutPage },
  ];

  private constructor() {}

  public static get instance(): Router {
    const hasRouter = !!Router._instance;
    return !hasRouter ? (Router._instance = new Router()) : Router._instance;
  }

  private get $app(): Element {
    if (!this._$app) throw new Error("No app element found");
    return this._$app;
  }

  async navigate(): Promise<void> {
    let matchedRoute = this._routes
      .map((route) => {
        const pattern = this.pathToRegexPattern(route.path);
        const targetLocation = location.pathname;

        const match = targetLocation.match(pattern)!;

        return { route, match };
      })
      .find((route) => route.match);

    if (!matchedRoute) {
      matchedRoute = {
        route: this._routes[0],
        match: [location.pathname],
      };
    }

    const params = this.getParams(matchedRoute);
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

  getParams({ route, match }: RegExpMatchRoute): ParamMap {
    const paramValues = match!.slice(1);

    const iterator = route.path.matchAll(/:(\w+)/g);
    const params = Array.from(iterator);
    const keys = params.map(([_, second]) => second);
    const entries = keys.map((key, index) => [key, paramValues[index]]);
    const paramObject = Object.fromEntries(entries);

    console.log(paramObject);

    return paramObject;
  }
}
