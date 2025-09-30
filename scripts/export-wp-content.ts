import fs from 'fs';
import path from 'path';

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, any>; // все ACF-поля
};

const customPostTypes = ['courses-list', 'news-list', 'services-list', 'portfolio-list', 'events-list', 'team-list']; // добавь все свои CPT
const standardPostTypes = ['posts', 'pages'];
const allPostTypes = [...standardPostTypes, ...customPostTypes];

async function fetchWP(endpoint: string): Promise<WPPost[]> {
  const res = await fetch(`http://tivaco.borodadigital.com/wp-json/wp/v2/${endpoint}?per_page=100`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  return res.json();
}

async function exportContent() {
  const result: Record<string, any> = {};

  try {
    for (const type of allPostTypes) {
      const posts = await fetchWP(type);
      result[type] = Object.fromEntries(
        posts.map(p => [
          p.slug,
          {
            title: p.title.rendered,
            content: p.content.rendered,
            acf: p.acf || {},
          },
        ])
      );
    }

    // Создаём папку data, если её нет
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Записываем JSON
    fs.writeFileSync(path.join(dataDir, 'wp-content.json'), JSON.stringify(result, null, 2));
    console.log('✅ Content exported to data/wp-content.json');
  } catch (err) {
    console.error(err);
  }
}

exportContent();
