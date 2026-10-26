import {readFile,writeFile} from 'node:fs/promises';
const payload=JSON.parse(await readFile('content.json','utf8'));
if (!Array.isArray(payload.projects) || payload.projects.length!==2) throw new Error('Exactly two selected projects are required');
const sql=`update public.se_portfolio_content set payload = '${JSON.stringify(payload).replaceAll("'","''")}'::jsonb, updated_at=now() where id='main';\n`;
const target=process.argv[2] || '/tmp/portfolio-content.sql';
await writeFile(target,sql);
console.log(`SQL generated: ${target}. Review and run in Supabase SQL Editor, then redeploy Vercel.`);
