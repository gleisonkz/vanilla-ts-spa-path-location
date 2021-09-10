const BASE_URL = "https://animechan.vercel.app/api";

async function getAnimes() {
  const cachedAnimes = JSON.parse(localStorage.getItem("animes")) || [];

  if (cachedAnimes.length > 0) return cachedAnimes;

  const response = await fetch(`${BASE_URL}/available/anime`);
  const animes = await response.json();
  localStorage.setItem("animes", JSON.stringify(animes));
  return animes;
}

async function getAnimeQuotes(animeName) {
  if (!animeName) throw new Error("Anime name is required");

  const cachedQuotes = JSON.parse(localStorage.getItem(animeName)) || [];

  if (cachedQuotes.length > 0) return cachedQuotes;

  const response = await fetch(`${BASE_URL}/quotes/anime?title=${animeName}`);
  const quotes = await response.json();

  localStorage.setItem(animeName, JSON.stringify(quotes));
  return quotes;
}

export { getAnimes, getAnimeQuotes };
