// scripts/translate-wp-content-batch.ts
import fs from 'fs';
import path from 'path';
import * as googleTranslateApi from '@vitalets/google-translate-api';

// Так получаем правильный callable объект
const translate = (googleTranslateApi as any).default ?? googleTranslateApi;

const INPUT_FILE = path.resolve('./data/wp-content.json');
const OUTPUT_FILE = path.resolve('./data/wp-content-ms.json');
const BATCH_SIZE = 10;

// перевод текста
async function translateText(text: string) {
  try {
    const res = await translate(text, { to: 'ms' });
    return res.text;
  } catch (err) {
    console.error('⚠ Translation error:', err);
    return text;
  }
}

// рекурсивный перевод объекта
async function translateObject(obj: any): Promise<any> {
  if (typeof obj === 'string') return translateText(obj);
  if (Array.isArray(obj)) return Promise.all(obj.map(item => translateObject(item)));
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    const translatedEntries = await Promise.all(
      entries.map(async ([key, value]) => [key, await translateObject(value)])
    );
    return Object.fromEntries(translatedEntries);
  }
  return obj;
}

// перевод партии постов
async function translatePostBatch(batch: [string, any][]) {
  const results: [string, any][] = await Promise.all(
    batch.map(async ([slug, post]) => {
      const translated = await translateObject(post);
      return [slug, translated] as [string, any];
    })
  );
  return Object.fromEntries(results);
}

async function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Input file not found: ${INPUT_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
  const data = JSON.parse(rawData);

  const translatedData: Record<string, any> = {};

  for (const postType of Object.keys(data)) {
    const posts = data[postType];
    const slugs = Object.keys(posts);
    translatedData[postType] = {};

    for (let i = 0; i < slugs.length; i += BATCH_SIZE) {
      const batchSlugs = slugs.slice(i, i + BATCH_SIZE);
      const batch = batchSlugs.map(slug => [slug, posts[slug]] as [string, any]);
      const translatedBatch = await translatePostBatch(batch);

      Object.assign(translatedData[postType], translatedBatch);
      console.log(`✅ ${postType}: translated ${i + batchSlugs.length}/${slugs.length}`);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(translatedData, null, 2), 'utf-8');
  console.log(`🎉 All content translated and saved to ${OUTPUT_FILE}`);
}

main();
