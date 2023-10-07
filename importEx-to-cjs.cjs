const { join, resolve } = require('path');
const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');

function updateImportStatements(directory) {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);

    if (file.endsWith('.cjs')) {
      let fileContent = readFileSync(filePath, 'utf-8');

      // Replace only local import/require paths
      fileContent = fileContent.replace(/(import .*? from ['"])\.\/(.*?['"])/g, `$1./$2.cjs`);
      fileContent = fileContent.replace(/(require\(['"])(\.|\.\.)(.*?)(['"]\))/g, `$1./$2$3.cjs\"\)`);


      writeFileSync(filePath, fileContent);
    } else if (statSync(filePath).isDirectory()) {
      updateImportStatements(filePath); // Recursively update imports in sub-directories
    }
  });
}

const cjsDirectory = resolve(__dirname, 'dist', 'cjs');
updateImportStatements(cjsDirectory);
