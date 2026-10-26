import { mkdir, copyFile, readFile, writeFile, cp } from 'node:fs/promises';
const local = JSON.parse(await readFile('content.json', 'utf8'));
let content = local;
if (process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY) {
  const base = new URL(process.env.SUPABASE_URL);
  if (base.protocol !== 'https:' || !base.hostname.endsWith('.supabase.co')) throw new Error('Invalid Supabase URL');
  const response = await fetch(new URL('/rest/v1/se_portfolio_content?id=eq.main&is_published=eq.true&select=payload', base), {
    headers: { apikey: process.env.SUPABASE_PUBLISHABLE_KEY, 'Accept-Profile': 'defense' }, signal: AbortSignal.timeout(12000)
  });
  if (!response.ok) throw new Error(`Portfolio content fetch failed (${response.status})`);
  const rows = await response.json();
  if (!rows[0]?.payload || !Array.isArray(rows[0].payload.projects) || rows[0].payload.projects.length !== 2) throw new Error('Published portfolio content must contain the two selected projects');
  content = rows[0].payload;
  console.log('Loaded published portfolio content from Supabase');
} else {
  console.log('Local preview: using versioned content.json');
}
// Only the public two-page presentation fields are shipped to browsers.
// Detailed project records remain in the original content source.
content = { version: local.version, updatedAt: local.updatedAt, projects: local.projects.map(versioned => {
  const published = content.projects.find(item => item.id === versioned.id);
  return { id: versioned.id, title: published?.title || versioned.title, images: versioned.images || [], topologies: versioned.topologies || [] };
}) };
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
await writeFile('dist/content.json', JSON.stringify(content));
console.log('Portfolio 1.0.0 built successfully');
