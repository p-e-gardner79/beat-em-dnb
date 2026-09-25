import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promisHtmlPath = path.join(__dirname, 'ta', 'outputs', 'promis-lab', 'Promis.html');

console.log('Building combat lab bundle from source...');
execSync('node work/build-combat.cjs', {
  cwd: path.join(__dirname, 'ta'),
  stdio: 'inherit'
});

console.log('Reading Promis.html...');
let html = fs.readFileSync(promisHtmlPath, 'utf8');

// Sync title and SEO meta tags with metadata.json
const titleReplacement = `<title>Beat 'Em DnB — 1995 Jungle Record Shop Arcade Combat</title>
<meta name="description" content="DJ Promis / Beat 'Em DnB — 1995 jungle record-shop arcade combat lab and endless fighting game.">
<meta property="og:title" content="Beat 'Em DnB — 1995 Jungle Record Shop Arcade Combat">
<meta property="og:description" content="DJ Promis / Beat 'Em DnB — 1995 jungle record-shop arcade combat lab and endless fighting game.">`;

html = html.replace('<title>PROMIS — Motion lab</title>', titleReplacement);

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const publicIndexPath = path.join(publicDir, 'index.html');
const rootIndexPath = path.join(__dirname, 'index.html');

console.log('Writing public/index.html and index.html...');
fs.writeFileSync(publicIndexPath, html);
fs.writeFileSync(rootIndexPath, html);

console.log('Creating pre-compressed public/index.html.gz for fast delivery...');
const gzipped = zlib.gzipSync(Buffer.from(html, 'utf8'), { level: 1 });
fs.writeFileSync(path.join(publicDir, 'index.html.gz'), gzipped);

console.log('Build completed successfully.');
