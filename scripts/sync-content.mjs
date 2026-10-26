import {readFile,writeFile} from 'node:fs/promises';
const payload=JSON.parse(await readFile('content.json','utf8'));
if (!Array.isArray(payload.projects) || payload.projects.length!==2) throw new Error('Exactly two selected projects are required');
if (payload.projects.some(project => !project.overview || !Array.isArray(project.components))) throw new Error('The two-page public content.json is a summary. Edit the full record in Supabase; do not replace it with this summary.');
const sql=`update defense.se_portfolio_content set payload = '${JSON.stringify(payload).replaceAll("'","''")}'::jsonb, updated_at=now() where id='main';\n`;
const target=process.argv[2] || '/tmp/portfolio-content.sql';
await writeFile(target,sql);
console.log(`SQL generated: ${target}. Review and run in Supabase SQL Editor, then redeploy Vercel.`);
