import { readFile, mkdir, copyFile, writeFile, rm } from 'node:fs/promises';
import { Script, runInNewContext } from 'node:vm';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
if (!html.includes('<html lang="ko">') || !html.includes('id="generate"')) {
  throw new Error('The lottery page is missing required HTML.');
}
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
if (scripts.length === 0) throw new Error('No lottery script found.');
for (const [index, script] of scripts.entries()) {
  new Script(script[2], { filename: `index.html:script-${index + 1}` });
}
const servicesSource = await readFile(new URL('site-services.js', root), 'utf8');
const context = { window: {} };
runInNewContext(servicesSource, context);
const config = context.window.SITE_SERVICES;
if (!config || !/^https:\/\//.test(config.siteUrl)) throw new Error('Configure a valid HTTPS siteUrl.');
new URL(config.siteUrl);
if (config.disqusShortname && !/^[a-z0-9][a-z0-9-]*$/.test(config.disqusShortname)) {
  throw new Error('Invalid Disqus shortname.');
}
if (config.adsenseClient && !/^ca-pub-\d{16}$/.test(config.adsenseClient)) {
  throw new Error('Invalid AdSense client: expected ca-pub- followed by 16 digits.');
}
const output = new URL('_site/', root);
await mkdir(output, { recursive: true });
let adsenseHead = '';
if (config.adsenseClient) {
  adsenseHead = `<meta name="google-adsense-account" content="${config.adsenseClient}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsenseClient}" crossorigin="anonymous"></script>`;
  await writeFile(new URL('ads.txt', output), `google.com, ${config.adsenseClient.slice(3)}, DIRECT, f08c47fec0942fa0\n`);
} else {
  await rm(new URL('ads.txt', output), { force: true });
}
await writeFile(new URL('index.html', output), html.replace('<!-- ADSENSE_HEAD -->', adsenseHead));
await copyFile(new URL('site-services.js', root), new URL('site-services.js', output));
await writeFile(new URL('.nojekyll', output), '');
console.log('Build passed: HTML and JavaScript validated; site created in _site/.');
console.log(`Disqus: ${config.disqusShortname ? 'configured' : 'awaiting shortname'}. AdSense: ${config.adsenseClient ? 'configured (Google approval still required)' : 'awaiting publisher ID'}.`);
