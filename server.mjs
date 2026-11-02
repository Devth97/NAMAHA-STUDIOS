// Local preview server. Pages are prerendered on each request exactly as in the production build.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8' };
const port = Number(process.env.PORT) || 4173;

const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/' || pathname.endsWith('.html')) {
      // Render in a fresh Node process so edits to any module show without restarting.
      const script = `import { renderDocument, resolvePage } from ${JSON.stringify(pathToFileURL(resolve(root, 'render.js')).href)}; import { readFileSync } from 'node:fs'; const page = resolvePage(${JSON.stringify(pathname)}); process.stdout.write(page + '\\n' + renderDocument(readFileSync(${JSON.stringify(resolve(root, 'index.html'))}, 'utf8'), page));`;
      const { stdout } = await run(process.execPath, ['--input-type=module', '-e', script], { maxBuffer: 16 * 1024 * 1024 });
      const split = stdout.indexOf('\n');
      const page = stdout.slice(0, split), html = stdout.slice(split + 1);
      res.writeHead(page === '404' && pathname !== '/404.html' ? 404 : 200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-cache' });
      res.end(html);
      return;
    }
    const file = resolve(root, '.' + pathname);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    if (!(await stat(file)).isFile()) throw new Error('not found');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch (error) {
    if (process.env.DEBUG) console.error(error);
    res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => process.stdout.write(`Namaha Studios preview: http://127.0.0.1:${port}\n`));
