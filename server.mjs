import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('./public/',import.meta.url));
const pages=new Set(['/', '/index.html', '/about.html', '/services.html', '/work.html', '/gallery.html', '/contact.html']);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg'};
const server=http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=pages.has(pathname)?resolve(root,'index.html'):resolve(root,'.'+pathname);
    if(!file.startsWith(root.endsWith(sep)?root:root+sep)) {res.writeHead(403);res.end('Forbidden');return;}
    if(!(await stat(file)).isFile())throw new Error('not found');
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
    res.end(await readFile(file));
  } catch {res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>process.stdout.write('Namaha Studios preview: http://127.0.0.1:4173\n'));
