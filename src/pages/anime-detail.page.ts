import { AbstractPage } from '../classes/abstract-page';
import { AnimesService } from '../classes/animes.service';
import { Quote } from '../models/quote';

export class AnimeDetailPage extends AbstractPage {
  constructor(params: string) {
    super(params);
    this.setTitle("Anime Detail");
  }

  async getPage(): Promise<HTMLElement> {
    const $page = document.createElement("div");
    $page.classList.add("anime");

    const quotes = await AnimesService.getAnimeQuotes(this.params.id);

    const html = await this.getHtml(quotes);
    const styles = await this.getStyles();
    $page.innerHTML = html;
    $page.appendChild(styles);
    return $page;
  }

  async getHtml(quotes: Quote[]): Promise<string> {
    const html = quotes
      .map(({ quote, character }) => {
        return `        
        <div class="quote">
            <blockquote>“${quote}”</blockquote>
            <div class="character">
              <strong><span>${character}</span></strong>
            </div>
        </div>   
      `;
      })
      .join("");

    return html;
  }

  async getStyles(): Promise<HTMLStyleElement> {
    const $style = document.createElement("style");
    $style.innerHTML = `
    .anime-quotes{
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
  
    .quote {
      background-color: var(--color-surface);
      border-radius: 10px;
      max-width: 300px;
      position: relative;
      padding: 10px;
      padding-top: 20px;
      color: var(--color-text-on-surface);
      margin-bottom: 20px;
    }
  
    .quote::before {
      display: flex;
      justify-content: center;
      content: "“";
      width: 30px;
      height: 30px;
      font-size: 40px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: var(--color-text-on-primary);
      position: absolute;
      top: -18px;
      left: 22px;
    }
    
    .character{
      margin-top: 10px;
    }
    
    `;
    return $style;
  }
}
