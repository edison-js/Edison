// rename-to-esm.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, renameSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 
const renameJsToMjs = (dir) => {
  const items = readdirSync(dir);
  for (const item of items) {
    const currentPath = join(dir, item);
    if (item.endsWith('.js')) {
      renameSync(currentPath, currentPath.replace('.js', '.mjs'));
    }
  }
};

// 
renameJsToMjs(join(__dirname, 'dist', 'esm'));