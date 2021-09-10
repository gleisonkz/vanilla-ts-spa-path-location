export abstract class AbstractPage {
  constructor(public params: any) {}

  setTitle(title: string) {
    document.title = title;
  }

  abstract getHtml(): Promise<string>;
}
