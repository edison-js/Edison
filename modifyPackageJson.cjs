// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const packageJsonPath = './package.json'
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

delete packageJson.devDependencies.vite
delete packageJson.devDependencies['@vitejs/plugin-react']
delete packageJson.devDependencies['@typescript-eslint/parser']
delete packageJson.devDependencies['@typescript-eslint/eslint-plugin']
delete packageJson.devDependencies['@vitest/coverage-v8']
delete packageJson.devDependencies['eslint']
delete packageJson.devDependencies['eslint-plugin-react']
delete packageJson.devDependencies['eslint-plugin-react-hooks']
delete packageJson.devDependencies['eslint-plugin-prettier']
delete packageJson.devDependencies['eslint-config-prettier']
delete packageJson.devDependencies['prettier']
delete packageJson.devDependencies['vitest']
delete packageJson.devDependencies['vite-node']
delete packageJson.devDependencies['vite-plugin-checker']
delete packageJson.devDependencies['@types/ansi-escapes']
delete packageJson.dependencies['ansi-escapes']

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
