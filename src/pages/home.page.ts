import { AbstractPage } from '../classes/abstract-page';

export class HomePage extends AbstractPage {
  constructor(params: string) {
    super(params);
    this.setTitle("Home");
  }

  async getPage(): Promise<HTMLElement> {
    const $page = document.createElement("div");
    $page.classList.add("home");
    const html = await this.getHtml();
    const styles = await this.getStyles();
    $page.innerHTML = html;
    $page.appendChild(styles);
    return $page;
  }

  async getHtml(): Promise<string> {
    return `
    <h1>Home</h1>
    <p>
        Teste de uma aplicação SPA utilizando apenas TS e Parcel, sem framework.
    </p>
    <p>
        <a href="/animes" router-link>View recent animes</a>
    </p>

    

    <p>
      GitHub repo: 
      <a href="https://github.com/gleisonkz/vanilla-ts-spa-path-location">
      gleisonkz/vanilla-ts-spa-path-location
      </a>
    </p>
`;
  }

  async getStyles(): Promise<HTMLStyleElement> {
    const $style = document.createElement("style");
    $style.innerHTML = `
    .home a {
         color:  var(--color-primary-light);
         display: block;
         margin-bottom: 1rem;
         transition: opacity 0.2s;
    }   
    
    .home a:hover {
        opacity: .9;        
   }   
    `;
    return $style;
  }
}
