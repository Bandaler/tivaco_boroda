// lib/wpApi.ts
export async function fetchFromWP(endpoint: string, lang: string = 'en') {
  const url = `http://tivaco.borodadigital.com/wp-json/wp/v2/${endpoint}?lang=${lang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch from WP');
  return res.json();
}

export async function getTours(lang: string) {
  return await fetchFromWP('news-list', lang);
}

export async function getPages(lang: string) {
  return await fetchFromWP('pages', lang);
}

