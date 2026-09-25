import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const publicDir = path.join(__dirname, 'public');
const gzPath = path.join(publicDir, 'index.html.gz');
const htmlPath = path.join(publicDir, 'index.html');

// Ensure assets are built
if (!fs.existsSync(htmlPath)) {
  console.log('public/index.html not found, executing build.js...');
  try {
    const { execSync } = await import('node:child_process');
    execSync('node build.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.error('Self-healing build failed:', err);
  }
}

// Serve static assets from public/
app.use(express.static(publicDir, {
  index: false,
  maxAge: 0
}));

// Route handler for HTML entry point
function sendIndexHtml(req, res) {
  const acceptEncoding = req.headers['accept-encoding'] || '';

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (acceptEncoding.includes('gzip') && fs.existsSync(gzPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Encoding', 'gzip');
    fs.createReadStream(gzPath).pipe(res);
  } else if (fs.existsSync(htmlPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.createReadStream(htmlPath).pipe(res);
  } else {
    res.status(503).send('Game is building. Please refresh in a moment.');
  }
}

app.get('/', sendIndexHtml);
app.get('/index.html', sendIndexHtml);

// Catch-all fallback
app.use((req, res) => {
  sendIndexHtml(req, res);
});

app.listen(PORT, HOST, () => {
  console.log(`Beat 'Em DnB server listening on http://${HOST}:${PORT}`);
});
