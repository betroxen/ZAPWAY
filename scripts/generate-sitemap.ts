import { writeFileSync } from 'fs';
import { globby } from 'globby';

async function generate() {
  const pages = await globby(['app/**/page.tsx', '!app/api']);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `<url><loc>https://zapway.fi${p.replace('app', '').replace('/page.tsx', '')}</loc></url>`).join('')}
</urlset>`;
  writeFileSync('public/sitemap.xml', sitemap);
}

generate();