import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
if (!html.includes('<html lang="ko">') || !html.includes('id="generate"')) {
  throw new Error('The lottery page is missing required HTML.');
}
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
if (scripts.length === 0) throw new Error('No lottery script found.');
for (const [index, script] of scripts.entries()) {
  new Script(script[1], { filename: `index.html:script-${index + 1}` });
}
const output = new URL('../_site/', import.meta.url);
await mkdir(output, { recursive: true });
await copyFile(new URL('../index.html', import.meta.url), new URL('index.html', output));
await writeFile(new URL('.nojekyll', output), '');
console.log('Build passed: HTML and JavaScript validated; site created in _site/.');
