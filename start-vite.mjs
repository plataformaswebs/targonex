import { createServer } from './node_modules/vite/dist/node/index.js';
import react from './node_modules/@vitejs/plugin-react/dist/index.mjs';
import { appendFileSync } from 'node:fs';

const log = (msg) => appendFileSync('vite-run.log', `${msg}\n`);

log('BOOT');

const server = await createServer({
  root: process.cwd(),
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
  },
});

await server.listen();

log(`READY ${JSON.stringify(server.resolvedUrls)}`);

setInterval(() => {}, 1 << 30);
