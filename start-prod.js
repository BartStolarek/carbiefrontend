const { spawn } = require('child_process');
require('dotenv').config();

const port = process.env.PORT || '3001';
console.log(`Starting production server on port ${port}...`);

const child = spawn('npx', ['next', 'start', '--port', port], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port }
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
}); 