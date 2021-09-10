import { AbstractPage } from '../classes/abstract-page';

export class AboutPage extends AbstractPage {
  constructor(params: string) {
    super(params);
    this.setTitle("About");
  }

  async getPage(): Promise<HTMLElement> {
    const $page = document.createElement("div");
    $page.classList.add("about");
    const html = await this.getHtml();
    const styles = await this.getStyles();
    $page.innerHTML = html;
    $page.appendChild(styles);
    return $page;
  }

  async getHtml(): Promise<string> {
    return `
    <address>
    <div>
        <h1 align="center">Meus contatos:</h1>
        <p>
        
        <a title="Instagram" target="_blank" href="https://www.instagram.com/gleison_kz/">
            <img class="instagram" alt="Instagram Logo"  >
        </a>
        
        <a title="Linkedin" target="_blank" href="https://www.linkedin.com/in/gleison-ribeiro-a65257119/">
            <img class="linkedin" alt="Linkedin Logo" width="40px" height="40px"  >
        </a>
        
        <a title="Youtube" target="_blank" href="https://www.youtube.com/channel/UCxZ1pK5ExBbS6VS0x5YMGfA?view_as=subscriber">
            <img class="youtube" alt="Youtube Logo">
        </a>
        
        <a title="Medium" target="_blank" href="https://gleisonsubzerokz.medium.com/">
            <img class="medium" alt="Medium Logo">
        </a>
        
        </p>
    </div>
    <div>
        <h1 align="center">Código Fonte</h1>
        <p>          
          <a title="Github" target="_blank" href="https://github.com/gleisonkz/vanilla-js-spa">
              <img class="github" alt="Github Logo" >
          </a>          
        </p>
    </div>
    </address>  
`;
  }

  async getStyles(): Promise<HTMLStyleElement> {
    const $style = document.createElement("style");
    $style.innerHTML = `
          .about {
              display: flex;            
          }
  
          address {
              display: flex;
              column-gap: 20px;         
          }
    
  
          h1 {
          padding: 20px;
          color: var(--color-text-on-surface);
          max-width: 420px;
          font-size: 25px;
          font-style: normal;
          }
  
          p {
              display: flex;
              column-gap: 10px;
              align-items: center;
              max-width: 558px;
              padding: 20px;
              font-size: 20px;
              color: var(--color-text-on-surface);
              line-height: 33px;
              letter-spacing: 3px;
              background-color: var(--color-text-on-surface);
              border-radius: 10px;
              min-height: 95px;
          }
      `;

    return $style;
  }
}
