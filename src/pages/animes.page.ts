import { AbstractPage } from '../classes/abstract-page';
import { AnimesService } from '../classes/animes.service';

export class AnimesPage extends AbstractPage {
  constructor(params: string) {
    super(params);
    this.setTitle("Animes");
  }

  async getPage(): Promise<HTMLElement> {
    const $page = document.createElement("div");
    $page.classList.add("anime");

    const animes = await AnimesService.getAnimes();

    const html = await this.getHtml(animes);
    const styles = await this.getStyles();
    $page.innerHTML = html;
    $page.appendChild(styles);
    return $page;
  }

  async getHtml<T>(animes: T[]): Promise<string> {
    const html = animes
      .map((title, index) => {
        const id = ++index;

        return `        
          <a class="anime-item" router-link="/animes/${title}">
            <span>${id}</span> - <span>${title}</span>
          </a>        
      `;
      })
      .join("");

    return html;
  }

  async getStyles(): Promise<HTMLStyleElement> {
    const $style = document.createElement("style");
    $style.innerHTML = `
    .anime{
      display: grid;
      row-gap: 20px;
    }
    
    .anime-item a,
    .anime-item span {
      color: var(--color-text-on-surface);
      transition: color 0.2s ease;
    }

    .anime span {
      pointer-events: none;
    }
  
    .anime-item{
      font-size: 25px;
      background-color: var(--color-surface);
      border-radius: 10px;
      color: var(--color-text-on-surface);
      padding: 10px;    
      cursor: pointer;
      transition: color 0.2s ease;
    }  
  
    .anime-item:hover,
    .anime-item:hover a,
    .anime-item:hover span {
      color: var(--color-primary);
    }
  
    .anime-item span:first-of-type {    
      font-size: 25px;
      display: inline-flex;
      justify-content: center;
      padding: 5px;
      width: 60px;
      border-radius: 9px;
      background-color: var(--color-primary);;
      color: var(--color-text-on-primary);; 
      transition: opacity 0.2s ease;
    } 
  
    .anime-item:hover a,
    .anime-item:hover span:first-of-type{  
      opacity: 0.9;
    }
    
    `;
    return $style;
  }
}
