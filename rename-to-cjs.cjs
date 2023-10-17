const { readdirSync, statSync, renameSync } = require('fs');
const { join } = require('path');

function renameJsToCjs(dirPath) {
  const files = readdirSync(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      renameJsToCjs(filePath);
    } else if (filePath.endsWith('.js')) {
      renameSync(filePath, filePath.replace('.js', '.cjs'));
    }
  }
}

// 
renameJsToCjs(join(__dirname, 'dist', 'cjs'));
