// // edison.js
// const { renderToString } = require('react-dom/server');
// const path = require('path');
// const { createRequire } = require('module');

// const run = async (filePath) => {
//   const require = createRequire(import.meta.url);
//   const absPath = path.resolve(filePath);
//   const { App } = require(absPath);

//   try {
//     const content = renderToString(<App />);
//     console.log(content);
//   } catch (error) {
//     console.error('Failed to render the app:', error);
//   }
// };

// const filePath = process.argv[2];
// if (!filePath) {
//   console.error('Please provide a file path to run');
//   process.exit(1);
// }

// run(filePath);
