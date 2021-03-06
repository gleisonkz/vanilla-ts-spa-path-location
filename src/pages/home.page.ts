import { AbstractPage } from '../classes/abstract-page';
import { ParamMap } from '../classes/router';

export class HomePage extends AbstractPage {
  constructor(params: ParamMap) {
    super(params);
    this.setTitle("Home");
  }

  override async getHtml(): Promise<string> {
    return `
    <h1>Home</h1>
    <p>
        Teste de uma aplicação SPA utilizando apenas TS e Parcel, sem framework.
    </p>
    <p>
        <a router-link="/animes" >View recent animes</a>
    </p>

    

    <p>
      GitHub repo: 
      <a href="https://github.com/gleisonkz/vanilla-ts-spa-path-location">
      gleisonkz/vanilla-ts-spa-path-location
      </a>
    </p>
`;
  }

  override async getStyles(): Promise<HTMLStyleElement> {
    const $style = document.createElement("style");
    $style.innerHTML = `
    .home a {
         color:  var(--color-primary-light);
         display: block;
         margin-bottom: 1rem;
         transition: opacity 0.2s;
         cursor: pointer;
    }   
    
    .home a:hover {
        opacity: .9;        
   }   
    `;
    return $style;
  }
}
