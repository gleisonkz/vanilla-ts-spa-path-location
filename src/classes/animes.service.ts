import { Quote } from '../models/quote';

const BASE_URL = "https://animechan.vercel.app/api";

export class AnimesService {
  static async getAnimes(): Promise<string[]> {
    const cachedAnimes: string[] = JSON.parse(localStorage.getItem("animes")!) || [];

    if (cachedAnimes.length > 0) return cachedAnimes;

    const response = await fetch(`${BASE_URL}/available/anime`);
    const animes = await response.json();
    localStorage.setItem("animes", JSON.stringify(animes));
    return animes;
  }

  static async getAnimeQuotes(animeName: string): Promise<Quote[]> {
    if (!animeName) throw new Error("Anime name is required");

    const cachedQuotes: Quote[] = JSON.parse(localStorage.getItem(animeName)!) || [];

    if (cachedQuotes.length > 0) return cachedQuotes;

    const response = await fetch(`${BASE_URL}/quotes/anime?title=${animeName}`);
    const quotes: Quote[] = await response.json();

    localStorage.setItem(animeName, JSON.stringify(quotes));
    return quotes;
  }
}
