const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || '3001';
console.log(`Starting production server on port ${port}...`);

// Use the direct path to next binary to avoid npx issues
const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');

const child = spawn(nextBin, ['start', '--port', port], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port },
  cwd: __dirname
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  console.error('Make sure you have run "yarn install" and "yarn build"');
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  child.kill('SIGINT');
});
