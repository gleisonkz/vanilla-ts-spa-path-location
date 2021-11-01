import { BlockUI } from '../decorators/block-ui';
import { CacheResponse } from '../decorators/cache-response';
import { Quote } from '../models/quote';

export class AnimesService {
  private static _baseUrl = "https://animechan.vercel.app/api";

  @BlockUI()
  @CacheResponse<string[]>()
  static async getAnimes(): Promise<string[]> {
    const response = await fetch(`${AnimesService._baseUrl}/available/anime`);
    const animes = await response.json();
    return animes;
  }

  @BlockUI()
  @CacheResponse<Quote[]>(true)
  static async getAnimeQuotes(animeName: string): Promise<Quote[]> {
    if (!animeName) throw new Error("Anime name is required");

    const response = await fetch(
      `${AnimesService._baseUrl}/quotes/anime?title=${animeName}`
    );
    const quotes: Quote[] = await response.json();
    return quotes;
  }
}
