export abstract class AbstractPage {
  constructor(public params: any) {}

  setTitle(title: string) {
    document.title = title;
  }

  abstract getHtml<T>(param: T | T[]): Promise<string>;
  abstract getHtml(param: any | any[]): Promise<string>;
  abstract getStyles(): Promise<HTMLStyleElement>;
  abstract getPage(): Promise<HTMLElement>;
}
