export abstract class AbstractPage {
  title: string;
  constructor(public params: any) {}

  setTitle(title: string) {
    document.title = title;
    this.title = this.toKebabCase(title);
  }

  private toKebabCase(target: string): string {
    return target.toLowerCase().replace(/\s/g, "-");
  }

  abstract getHtml(): Promise<string>;
  abstract getStyles(): Promise<HTMLStyleElement>;

  async getPage(): Promise<HTMLElement> {
    const $page = document.createElement("div");
    $page.classList.add(this.title);

    const html = await this.getHtml();
    const styles = await this.getStyles();

    $page.innerHTML = html;
    $page.appendChild(styles);
    return $page;
  }
}
