// rename-and-fix-imports.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { promisify } from 'util';
import glob from 'glob';

const globPromise = promisify(glob);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import文のパスを修正する関数
const fixImportPaths = async (file) => {
  let content = readFileSync(file, 'utf8');
  // 正規表現で、'./' または '../'で始まるパスのimport文を対象にし、'.js'がない場合は追加
  content = content.replace(/(from\s+['"])(\.\/|\.\.\/)([^'"]+?)['"]/g, (match, p1, p2, p3) => {
    // '.js'で終わっていないパスに'.js'を追加
    if (!p3.endsWith('.js')) {
      return `${p1}${p2}${p3}.js'`;
    }
    return match;
  });
  writeFileSync(file, content, 'utf8');
};

// 特定のディレクトリ内のすべての.jsファイルを走査し、import文のパスを修正
const fixImportsInDirectory = async (directory) => {
  const files = await globPromise(`${directory}/**/*.js`); // ディレクトリ内の全ての.jsファイルを取得
  // biome-ignore lint/complexity/noForEach: <explanation>
files.forEach(file => {
    fixImportPaths(file);
  });
};

// 実行するディレクトリを指定
fixImportsInDirectory(join(__dirname, 'dist'));
