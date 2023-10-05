import { spawn } from 'child_process';
import { register } from 'ts-node';

const [,, ...userArgs] = process.argv;

if (userArgs.length === 0) {
    console.error('Please specify a TypeScript file to run.');
    process.exit(1);
}

const tsFilePath = userArgs[0];

register();

const childProcess = spawn('node', ['-r', 'ts-node/register', tsFilePath], {
    stdio: 'inherit',
});

childProcess.on('exit', (code) => {
    process.exit(code);
});